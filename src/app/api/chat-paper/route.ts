

import { type CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf, getContextWeb, getContextAds } from '~/lib/context';
import { db } from '~/server/db';
import { papers, messages as _messages } from '~/server/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { validateQueryWeb } from '~/app/actions/webRelevantOrNot';
import { validateNeedWebSearch } from '~/app/actions/NeedWebSearch';

export const runtime = "edge"
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
async function fetchWebContext(content, fileKey) {
  const { context: contextWeb } = await getContextWeb(content, fileKey);
  const formattedContextWeb = contextWeb.map((item) => {
    return `web page name: ${item.title}\nweb page content: ${item.content}\n`;
  });
  const finalWebContext = formattedContextWeb.join('\n');

  const links = contextWeb.map((item) => item.url);
  const webpagenames = contextWeb.map((item) => item.title);

  return { finalWebContext, links, webpagenames };
}

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, paperId } = await req.json();

    const _papers = await db.select().from(papers).where(eq(papers.id, paperId));

    if (_papers.length !== 1) {
      console.log('Paper not found');
      return NextResponse.json({ error: 'Paper not found' }, { status: 404 });
    }

    const fileKey = _papers[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const pdfContext = await getContextPdf(lastMessage.content, fileKey);
    const WebSearchNeeded = await validateNeedWebSearch(lastMessage.content, pdfContext);
    console.log(WebSearchNeeded);

    let finalWebContext = '';
    let links = [];
    let webpagenames = [];
    let webRelevant = false;

    if (WebSearchNeeded) {
      ({ finalWebContext, links, webpagenames } = await fetchWebContext(lastMessage.content, fileKey));
      webRelevant = await validateQueryWeb(lastMessage.content, finalWebContext);

      if (!webRelevant) {
        ({ finalWebContext, links, webpagenames } = await fetchWebContext(lastMessage.content, fileKey));
        webRelevant = await validateQueryWeb(lastMessage.content, finalWebContext);
      }
    }

    console.log(webRelevant);
    console.log(finalWebContext);

    const systemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI is an expert in the field of academics and is well known for his ability to answer complex questions related to science and technology.
      AI has access to the internet and can access information from any website.
      AI can access this information in the WEB CONTEXT BLOCK that is provided in a conversation.
      AI has access to real-time information or the ability to browse the internet to provide updates.
      START PDF CONTEXT BLOCK
      ${pdfContext}
      END OF PDF CONTEXT BLOCK

      START WEB CONTEXT BLOCK
      ${finalWebContext}
      END OF WEB CONTEXT BLOCK
      
      AI assistant will take into account PDF CONTEXT BLOCK, WEB CONTEXT BLOCK that is provided in a conversation.
      If the WEB CONTEXT BLOCK is empty, AI assistant will say, "I am not able to retrieve information for this question."
      AI assitant if asked a question requiring real time information that needs access to the internet, it will use real time information from the WEB CONTEXT BLOCK.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.
      AI assistant will not make the response too long or too short. The maximimum words in the response is 150 words.`;

    await db.insert(_messages).values({
      paperId: paperId,
      content: lastMessage.content,
      role: 'user',
    });

    console.log(systemPrompt);
    const result = await streamText({
      model: openai('gpt-4o'),
      system: systemPrompt,
      messages: messages as CoreMessage[],
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        await db.insert(_messages).values({
          paperId: paperId,
          content: text,
          role: 'system',
        });
      },
    });

    return result.toAIStreamResponse();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


