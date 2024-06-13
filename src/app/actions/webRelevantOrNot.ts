'use server';

import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_SECRET_KEY,
  });
export async function validateQueryWeb(originalQuery: string, formattedContextWeb: string) {
  const schema = z.object({
    relevance: z.boolean().describe('Whether the web results are relevant or not.'),
    reason: z.string().describe('Reason for the relevance decision.')
  });

  
  let isRelevant = false;
    try {
        const { object: result } = await generateObject({
            model: openai('gpt-3.5-turbo'),
          system: 'You determine the relevance of web search results in the WEB SEARCH RESULTS BLOCK given the abstract, title and the pdf information given in the ORIGINAL QUERY BLOCK',
          prompt: `START OF ORIGINAL QUERY BLOCK\n
          ${originalQuery}
          END OF ORIGINAL QUERY BLOCK\n\n
          START OF WEB CONTEXT BLOCK\n
          ${formattedContextWeb}END OF WEB CONTEXT BLOCK\n\n
          Please determine whether the web search results are relevant or not.`
          ,
          schema,});
       
    
        isRelevant = result.relevance;
        console.log(isRelevant);
        console.log(result.reason);
        // if (!isRelevant) {
        //   retries += 1;
        //   input = await fetchQuery();
        // }
        return isRelevant;
        
    } catch (error) {
        console.log(error);
    }
    }

  
