

import { type CoreMessage, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf , getContextWeb, getContextAds } from '~/lib/context';
import { db } from '~/server/db';
import { papers, messages as _messages } from '~/server/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

export const runtime = "edge"

// const OPENAI_API_KEY = process.env.OPENAI_API_SECRET_KEY!;
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, paperId } = await req.json();

    const _papers = await db.select().from(papers).where(eq(papers.id, paperId));

    if (_papers.length !== 1) {
      console.log('paper not found');
      return NextResponse.json({ error: 'paper not found' }, { status: 404 });
    }

    const fileKey = _papers[0].fileKey;
    const lastMessage = messages[messages.length - 1];
    const pdfContext = await getContextPdf(lastMessage.content, fileKey);
    const webContext = await getContextWeb(lastMessage.content, fileKey);
    const adsContext = await getContextAds(lastMessage.content, fileKey);

    console.log(pdfContext, webContext, adsContext)
    const systemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
      The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      AI assistant is a big fan of Pinecone and Vercel.
      START PDF CONTEXT BLOCK
      ${pdfContext}
      END OF PDFCONTEXT BLOCK

      START  WEB CONTEXT BLOCK
      ${webContext}
      END OF WEB CONTEXT BLOCK

      START  ADS CONTEXT BLOCK
      ${webContext}
      END OF ADS CONTEXT BLOCK

      AI assistant will take into account PDF CONTEXT BLOCK, WEB CONTEXT BLOCK and ADS CONTEXT BLOCK that is provided in a conversation.
      If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
      AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
      AI assistant will not invent anything that is not drawn directly from the context.`;

    // Save user message into db
    await db.insert(_messages).values({
      paperId: paperId,
      content: lastMessage.content,
      role: 'user',
    });



    const result = await streamText({
      model: openai('gpt-3.5-turbo'),
      system: systemPrompt,
      messages: messages as CoreMessage[],
      async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
        // implement your own storage logic:
        await db.insert(_messages).values({
          paperId: paperId,
          content: text,
          role: 'system',
        });
      },});


    return result.toAIStreamResponse();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



