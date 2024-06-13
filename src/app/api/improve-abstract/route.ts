import { type CoreMessage, streamText,generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf, getContextAds, getContextWeb } from '~/lib/context';
import { db } from '~/server/db';
import { papers, chats, messages as _messages, generatedTitles } from '~/server/db/schema';
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
    // const { messages, chatid } = await req.json();
    const { messages, paperId } = await req.json();
    // const _chats = await db.select().from(chats).where(eq(chats.id, chatid));
    const _papers = await db.select().from(papers).where(eq(papers.id, paperId));

    // if (_chats.length !== 1) {
    //   console.log('chat not found');
    //   return NextResponse.json({ error: 'chat not found' }, { status: 404 });
    // }
    if (_papers.length !== 1) {
        console.log('chat not found');
        return NextResponse.json({ error: 'chat not found' }, { status: 404 });
      }

    // const fileKey = _chats[0].fileKey;
    const fileKey = _papers[0].fileKey;
    // const abstract = _chats[0].abstract;
    const abstract = _papers[0].abstract;
    const getContextPrompt ='From the PDF, extract all the nessasry information needed to rewrite the abstract in a concise way that is easy to understand.'; ;
    // const getConTextPromptAds = 'From the abstract, extract all the nessasry information needed to create an engaging, eye catching and informative title.'
    const contextPdf = await getContextPdf(getContextPrompt, fileKey);
    const contextAds = await getContextAds(abstract);
    const contextWeb = await getContextWeb(getContextPrompt, fileKey);
    // console.log(contextPdf, contextAds, contextWeb)

    
      

      const systemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
            The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
            AI is a well-behaved and well-mannered individual.
            AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
            AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
            AI is a seasoned researcher who has worked on many world famous papers.
            AI is particularly well versed in creating engaging, eye catching and informative abstracts for papers that get maximum reads and citaions. 
            START PDF BLOCK
            ${contextPdf}
            END OF PDF BLOCK

            START ABSTRACT BLOCK
            ${abstract}
            END OF ABSTRACT BLOCK

            START EXAMPLE BLOCK
            ${contextAds}
            END OF EXAMPLE BLOCK

            The EXAMPLE BLOCK has examples of papers that have high read counts and high citation counts. 
            AI assistant will take into account any PDF BLOCK , ABSTRACT BLOCK and EXAMPLE BLOCK that is provided in a conversation.
            AI assistant will rewrite the abstract for the paper that is provided in the PDF BLOCK and has the abstract to it in the ABSTRACT BLOCK taking inspiration from the EXAMPLE BLOCK. 
            AI assistant will rewrite the abstract for the paper in a way that improves the existing content of the abstract. The new abstract should be informative and easy to understand with a goal of getting maximum reads and citations.
            AI will not copy the abstract if it is provided in the PDF BLOCK.
            AI will not copy the  abstract from the EXAMPLE BLOCK, instead it will only take inspiration from the EXAMPLE BLOCK.
            AI will put the abstract between ::ABSTRACTSTART:: and ::ABSTRACTEND::
            `;

    const prompt = `Abstract: \n ${abstract} \n
    
    Rewrite the abstract in a way that imp oves the existing content of the abstract. The new abstract should be informative and easy to understand with a goal of getting maximum reads and citations.`

    // Save user message into db

    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      system: systemPrompt,
      prompt: prompt,
    });
    // console.log(text);
    // await db.insert(generatedTitles).values({
    //   paperId: paperId,
    //   generatedTitle : text,
    //   abstract: abstract,
    // });
    



    return NextResponse.json({ text });
    // return result.toAIStreamResponse();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

