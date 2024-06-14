'use server';

import { getMatchesFromEmbeddingsAds } from "~/lib/context";
import { fetchJinaEmbedding } from "./fetchjinaemebdding";

export async function getScieRagMatches(adsQuery) {
   try{
    const result = await fetchJinaEmbedding(adsQuery);
    const matches = await getMatchesFromEmbeddingsAds(result, 'ads-database-chandra');
    console.log(matches) 

      return matches;
    } catch (error) {
      console.error('Error making API request:', error);
      throw error;
    }
  };