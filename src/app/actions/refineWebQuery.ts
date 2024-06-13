'use server';

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';


// export const runtime = "edge"
// Set up OpenAI configuration
export async function refineWebQuerySources(query:string) {
  try {
    const openai = createOpenAI({
        apiKey: process.env.OPENAI_API_SECRET_KEY,
      });
    const refinePrompt = `You are a highly skilled assistant specialized in refining web search queries to obtain the best and most relevant results. Your primary goal is to take an initial search query and enhance it by making it more specific, removing ambiguities, and focusing on high-quality, trustworthy sources.\n
    Please adhere to the following guidelines when refining the query:\n
    Focus on scientific evidence.\n
    Avoid opinions and anecdotal evidence.\n
    Prioritize sources from trusted health websites and academic journals.\n
    Ensure the query is clear and specific\n
    Ensure that query is not too long\n
    Ensure that the query is between :QUERYSTART: and :QUERYEND:\n`
    
    

    

    const prompt = `I need you to refine the following web search query to get the best and most relevant information. 

    Here is the original query: ${query}.
    
    Refined Query:`
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      system: refinePrompt,
      prompt: prompt,
    });

    const response = text.replace('Refined Query: ', '');
    const responseF = response.replace(':QUERYSTART:\n', '').replace('\n:QUERYEND:', '');
    return responseF;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function refineWebQueryVideos(query:string) {
    try {
      const openai = createOpenAI({
          apiKey: process.env.OPENAI_API_SECRET_KEY,
        });
      const refinePrompt = `You are a highly skilled assistant specialized in refining web search queries to obtain the best and most relevant results. Your primary goal is to take an initial search query and enhance it by making it more specific, removing ambiguities, and focusing on high-quality, trustworthy sources.\n
      Please adhere to the following guidelines when refining the query:\n
      Focus on scientific evidence.\n
      Avoid opinions and anecdotal evidence.\n
      Prioritize sources from trusted health websites and academic journals.\n
      Ensure the query is clear and specific.`
      
      
  
      
  
      const prompt = `I need you to refine the following web search query to get the best and most relevant videos. 
  
      Here is the original query: ${query}.
      
      Refined Query:`
      const { text } = await generateText({
        model: openai('gpt-3.5-turbo'),
        system: refinePrompt,
        prompt: prompt,
      });
  
      return text;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
