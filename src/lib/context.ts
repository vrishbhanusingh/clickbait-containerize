import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings, getEmbeddingsAds } from "./embeddings";
import { getPineconeClient } from "./pinecone";
import { refineWebQuerySources, refineWebQueryVideos } from "~/app/actions/refineWebQuery";
import { serperSearch } from "~/app/tools/searchProviders";
import {
  get10BlueLinksContents,
  getVideos,
  processAndVectorizeContent,
} from "~/app/action";

export async function getMatchesFromEmbeddings(
    embeddings: number[],
    fileKey: string,
    index: string,
  ) {
    try {
      const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
      });
      const pineconeIndex = await client.index(index);
      const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
      const queryResult = await namespace.query({
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
      });
      return queryResult.matches || [];
    } catch (error) {
      console.log("error querying embeddings", error);
      throw error;
    }
  }

  export async function getMatchesFromEmbeddingsAds(
    embeddings: number[],
    index: string,
  ) {
    try {
      const client = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!,
      });
    
      const pineconeIndex = await client.index(index);
      const queryResult = await pineconeIndex.query({
        topK: 5,
        vector: embeddings,
        includeMetadata: true,
      });

      return queryResult.matches || [];
    } catch (error) {
      console.log("error querying embeddings", error);
      throw error;
    }
  }



  export async function getContextPdf(query: string, fileKey: string) {
    const queryEmbeddings = await getEmbeddings(query);
    const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey, 'clickbait-vs');
  
    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.7
    );
  
    type Metadata = {
      text: string;
      pageNumber: number;
    };
  
    let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
    // 5 vectors 
    return docs.join("\n").substring(0, 3000);
  }

  export async function getContextWeb(query: string, fileKey: string) {
    const refinedWebQueryResult = await refineWebQuerySources(query);
    const refinedWebQueryVideo = await refineWebQueryVideos(query);
    const sources = await serperSearch(refinedWebQueryResult);

    const videos = await getVideos(refinedWebQueryVideo);
    const html = await get10BlueLinksContents(sources);

    const vectorResults = await processAndVectorizeContent(html, refinedWebQueryResult);
    const formattedResults = vectorResults.map((result) => {
      return {'content': result.pageContent, 'title': result.metadata.title, 'url': result.metadata.link}

    })

    // 5 vectors 
    return { videos: videos, context: formattedResults };
  }

  
  export async function getContextAds(query: string) {
    const queryEmbeddings = await getEmbeddingsAds(query);
    const matches = await getMatchesFromEmbeddingsAds(queryEmbeddings,'ads-database-4');
    // console.log(matches)
    const qualifyingDocs = matches.filter(
      (match) => match.score && match.score > 0.4
    );
  
    type Metadata = {
      title: string;
      abstract: string;
      PDF_link_url: string;
      bibcode: string;
      citation_count: number;
      cite_read_boost: number;
      clickbait: number;
      id: string;
      keyword: string;
      read_count: number;
    };
  
    let docs = qualifyingDocs.map((match) => {
    const matchData =  (match.metadata as Metadata)
    const contextString = `Title: \n ${matchData.title} \n Abstract: ${matchData.abstract}\n citation count: ${matchData.citation_count} \n read count: ${matchData.read_count}`
    return contextString
    });
    // 5 vectors 
    return docs.join("\n").substring(0, 3000);
  }