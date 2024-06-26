'use server';
import { type CoreMessage, streamText,generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf, getContextAds, getContextWeb } from '~/lib/context';
import { db } from '~/server/db';
import { papers,generatedTitles3 } from '~/server/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { validateQueryWeb } from './webRelevantOrNot';
import { fetchFromNgrokAPI } from './fetchllama3Title';







export const generateTitleUpdateLlama = async (paperId) =>{
    
    try {
  
    const _papers = await db.select().from(papers).where(eq(papers.id, paperId));

    if (_papers.length !== 1) {
      console.log('paper not found');
      throw new Error('Paper not found');
    }



    const fileKey = _papers[0].fileKey;

    const abstract = _papers[0].abstract;

    const textllama = await fetchFromNgrokAPI('', abstract);

    console.log(textllama.result);

    // console.log(text, links);

    await db.update(generatedTitles3).set({
      generatedTitleLlama : textllama.result,

    }).where(eq(generatedTitles3.paperId, paperId));

    console.log('Title updated in db')
    



    return 'None';

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

