'use server';
import { type CoreMessage, streamText,generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { getContextPdf, getContextAds, getContextWeb } from '~/lib/context';
import { db } from '~/server/db';
import { papers, chats, messages as _messages, generatedTitles3 } from '~/server/db/schema';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';



export const getTitle = async (paperId) => {
    "use server"
    try {
        const _papers = await db.select().from(papers).where(eq(papers.id, paperId));
        const _generatedTitles = await db.select().from(generatedTitles3).where(eq(generatedTitles3.paperId, paperId));
        console.log(_generatedTitles);

        if (_generatedTitles.length !== 1) {
            console.log('paper not found');
            throw new Error('Paper not found');
          }
        const titleLlama = _generatedTitles[0]?.generatedTitleLlama;
        const title = _generatedTitles[0]?.generatedTitleGPT;
        const linksUsed = _generatedTitles[0]?.linksUsed;
        const page_names = _generatedTitles[0]?.pageNames;
        const abstract = _papers[0]?.abstract;

        return {'title': title, 'linksUsed': linksUsed, 'pageNames': page_names, 'abstract': abstract, "titleLlama": titleLlama};

    } catch (error) {
        console.error(error);
        throw new Error(error.message);
        
    }}
    