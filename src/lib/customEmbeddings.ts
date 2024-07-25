// import { Embeddings } from "@langchain/core/embeddings";
// import axios from 'axios';

// export class CustomEmbeddings extends Embeddings {
//     private apiUrl: string;
  
//     constructor(apiUrl: string) {
//       super();
//       this.apiUrl = apiUrl;
//     }
  
//     async embedDocuments(documents: string[]): Promise<number[][]> {
//       try {
//         console.log('Sending request to API:', this.apiUrl);
//         console.log('Request payload:', { input_string: documents });
//         const response = await axios.post(this.apiUrl, { input_string: documents });
//         console.log('API response:', response.data);
//         if (!response.data || !response.data.result) {
//           throw new Error('Invalid API response: missing result');
//         }
//         return response.data.result;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           console.error("Axios error:", error.message);
//           console.error("Response data:", error.response?.data);
//           console.error("Response status:", error.response?.status);
//         } else {
//           console.error("Error calling Jina embeddings API for documents:", error);
//         }
//         throw error;
//       }
//     }
  
//     async embedQuery(text: string): Promise<number[]> {
//       try {
//         console.log('Sending request to API:', this.apiUrl);
//         console.log('Request payload:', { input_string: text });
//         const response = await axios.post(this.apiUrl, { input_string: text });
//         console.log('API response:', response.data);
//         if (!response.data || !response.data.result) {
//           throw new Error('Invalid API response: missing result');
//         }
//         return response.data.result;
//       } catch (error) {
//         if (axios.isAxiosError(error)) {
//           console.error("Axios error:", error.message);
//           console.error("Response data:", error.response?.data);
//           console.error("Response status:", error.response?.status);
//         } else {
//           console.error("Error calling Jina embeddings API for query:", error);
//         }
//         throw error;
//       }
//     }
// }

import { Embeddings } from "@langchain/core/embeddings";
import axios from 'axios';

export class CustomEmbeddings extends Embeddings {
  private apiUrl: string;
  private cache: Map<string, number[]>;
  private batchSize: number;

  constructor(apiUrl: string, batchSize: number = 100) {
    super();
    this.apiUrl = apiUrl;
    this.cache = new Map();
    this.batchSize = batchSize;
  }

  private async batchEmbed(texts: string[]): Promise<number[][]> {
    try {
      console.log('Sending batch request to API:', this.apiUrl);
      console.log('Batch request payload:', { input_string: texts.length });
      
      const response = await axios.post(this.apiUrl, { input_string: texts });
      
    //   console.log('API response:', response.data);
        console.log('API response recieved.');
      
      if (!response.data || !response.data.result) {
        throw new Error('Invalid API response: missing result');
      }
      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      } else {
        console.error("Error calling Jina embeddings API:", error);
      }
      throw error;
    }
  }

  async embedDocuments(documents: string[]): Promise<number[][]> {
    console.log(`Processing ${documents.length} documents`);
    
    const uncachedDocs = documents.filter(doc => !this.cache.has(doc));
    console.log(`${uncachedDocs.length} documents not in cache`);
    
    const batches = [];
    for (let i = 0; i < uncachedDocs.length; i += this.batchSize) {
      batches.push(uncachedDocs.slice(i, i + this.batchSize));
    }
    console.log(`Created ${batches.length} batches`);

    const batchResults = await Promise.all(batches.map(batch => this.batchEmbed(batch)));
    const newEmbeddings = batchResults.flat();

    // Update cache
    uncachedDocs.forEach((doc, index) => {
      this.cache.set(doc, newEmbeddings[index]);
    });
    console.log(`Updated cache with ${uncachedDocs.length} new embeddings`);

    // Return all embeddings, including cached ones
    return documents.map(doc => this.cache.get(doc)!);
  }

  async embedQuery(text: string): Promise<number[]> {
    console.log('Processing query:', text);
    
    if (this.cache.has(text)) {
      console.log('Query found in cache');
      return this.cache.get(text)!;
    }

    console.log('Query not in cache, sending request to API');
    const [embedding] = await this.batchEmbed([text]);
    this.cache.set(text, embedding);
    console.log('Cached query embedding');
    
    return embedding;
  }
}