'use server';

import { generateObject } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { z } from 'zod';
const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_SECRET_KEY,
  });
export async function validateNeedWebSearch(message:string, pdfcontext:string) {
  const schema = z.object({
    WebSearchNeeded: z.boolean().describe('Whether the the message needs web search results.'),
    reason: z.string().describe('Reason for the relevance decision.')
  });

  
  let WebSearchNeeded = false;
    try {
        const { object: result } = await generateObject({
            model: openai('gpt-3.5-turbo'),
          system: 'You determine whether the message in the MESSAGE BLOCK needs web search results. You are given the PDF CONTEXT BLOCK which has relavant information from the PDF of a research paper. Please determine whether the message can be answered with just the information in the PDF CONTEXT BLCOK or if it needs a web search for more information. The answer should be yes if it needs web search results and no if it does not need a web search. For questions related to the paper in the PDF it is beneficial if you get more information from the web.',
          prompt: `START OF PDF CONTEXT BLOCK\n
          ${pdfcontext}
          END OF PDF CONTEXT BLOCK\n\n
          START OF MESSAGE BLOCK\n
          ${message}
          END OF MESSAGE BLOCK\n\n
          Please determine whether a web search is needed to answer the question in the MESSAGE BLOCK.`
          ,
          schema,});
       
    
        WebSearchNeeded = result.WebSearchNeeded;

        // if (!isRelevant) {
        //   retries += 1;
        //   input = await fetchQuery();
        // }
        return WebSearchNeeded;
        
    } catch (error) {
        console.log(error);
    }
    }

  
