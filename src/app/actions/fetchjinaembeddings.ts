'use server'
import axios from 'axios';
import { getMatchesFromEmbeddingsAds } from '~/lib/context';
import { Pinecone } from "@pinecone-database/pinecone";

export const fetchJinaEmbedding = async (adsQuery:string) => {
  // const url = "https://5101-34-81-101-253.ngrok-free.app/encode";
  // const url = "http://localhost:8000/encode";
  // const url = "http://host.docker.internal:8000/encode";

  // const url = "http://fastapi-embeddings:8000/encode";
  const url = process.env.EMBEDDING_API_URL;
  const data = { "input_string": adsQuery };
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await axios.post(url, data, { headers });
  
  // console.log(response.data.result)
      const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
      });
    
      const pineconeIndex = await client.index('ads-database-chandra');
      const queryResult = await pineconeIndex.query({
        topK: 5,
        vector: response.data.result,
        includeMetadata: true,
      });



    return queryResult.matches || [];
     
  }

//   const matches = await getMatchesFromEmbeddingsAds(response.data.result, 'ads-database-chandra');

//   return matches;
// };

  