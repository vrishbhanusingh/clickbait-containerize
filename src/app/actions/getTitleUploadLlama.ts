'use server';
import { type CoreMessage, streamText,generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf, getContextAds, getContextWeb } from '~/lib/context';
import { db } from '~/server/db';
import { papers, chats, messages as _messages, generatedTitles, generatedTitles2 } from '~/server/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { validateQueryWeb } from './webRelevantOrNot';
import { fetchFromNgrokAPI } from './fetchllama3Title';
export const maxDuration = 60;
export const dynamic = 'force-dynamic';
// export const runtime = "edge"

// const OPENAI_API_KEY = process.env.OPENAI_API_SECRET_KEY!;
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_SECRET_KEY,
});
// Allow streaming responses up to 30 seconds
async function fetchWebContext(getWebContextPrompt, fileKey) {
  const {context:contextWeb } = await getContextWeb(getWebContextPrompt, fileKey);
  const formattedContextWeb = contextWeb.map((item) => {
    return `web page name :${item.title}\nweb page content:${item.content}\n`;
  })
  const finalWebContext = formattedContextWeb.join('\n')
  const links = contextWeb.map((item) => {
    return item.url;
  })
  const webpagenames = contextWeb.map((item) => {
      return item.title;
    })
  return {finalWebContext, links, webpagenames};
}

export const generateTitle = async (paperId) =>{
    
    try {
  
    const _papers = await db.select().from(papers).where(eq(papers.id, paperId));

    if (_papers.length !== 1) {
      console.log('paper not found');
      throw new Error('Paper not found');
    }



    const fileKey = _papers[0].fileKey;

    const abstract = _papers[0].abstract;
    

    await db.insert(generatedTitles2).values({
      paperId: paperId,
      generatedTitle : text,
      abstract: abstract,
      linksUsed: links,
      pageNames: webpagenames
    }
      );
    console.log('Title saved to db')
    



    return 'None';

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

