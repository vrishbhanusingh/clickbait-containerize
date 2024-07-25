"use server";

import cheerio from "cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document as DocumentInterface } from "langchain/document";
import { OpenAIEmbeddings } from "@langchain/openai";
import { CustomEmbeddings } from "~/lib/customEmbeddings";
interface SearchResult {
  favicon: string;
  link: string;
  title: string;
}

interface ContentResult extends SearchResult {
  html: string;
}

// let embeddings = new OpenAIEmbeddings({
//   apiKey: process.env.OPENAI_API_SECRET_KEY,
//   modelName: "text-embedding-ada-002",
// });

const embeddings = new CustomEmbeddings(process.env.EMBEDDING_API_URL || "https://f0d4-103-15-228-94.ngrok-free.app/encode");

export async function getVideos(
  message: string,
): Promise<{ imageUrl: string; link: string }[] | null> {
  const url = "https://google.serper.dev/videos";
  const data = JSON.stringify({
    q: message,
  });
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      "X-API-KEY": process.env.SERPER_API_KEY!,
      "Content-Type": "application/json",
    },
    body: data,
  };
  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok. Status: ${response.status}`,
      );
    }
    const responseData = await response.json();
    const validLinks = await Promise.all(
      responseData.videos.map(async (video: any) => {
        const imageUrl = video.imageUrl;
        if (typeof imageUrl === "string") {
          try {
            const imageResponse = await fetch(imageUrl, { method: "HEAD" });
            if (imageResponse.ok) {
              const contentType = imageResponse.headers.get("content-type");
              if (contentType && contentType.startsWith("image/")) {
                return { imageUrl, link: video.link };
              }
            }
          } catch (error) {
            console.error(`Error fetching image link ${imageUrl}:`, error);
          }
        }
        return null;
      }),
    );
    const filteredLinks = validLinks.filter(
      (link): link is { imageUrl: string; link: string } => link !== null,
    );
    return filteredLinks.slice(0, 9);
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
}

// 5. Fetch contents of top 10 search results
export async function get10BlueLinksContents(
  sources: SearchResult[],
): Promise<ContentResult[]> {
  async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 800,
  ): Promise<Response> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      if (error) {
        console.log(`Skipping ${url}!`);
      }
      throw error;
    }
  }
  function extractMainContent(html: string): string {
    try {
      const $ = cheerio.load(html);
      $("script, style, head, nav, footer, iframe, img").remove();
      return $("body").text().replace(/\s+/g, " ").trim();
    } catch (error) {
      console.error("Error extracting main content:", error);
      throw error;
    }
  }
  const promises = sources.map(
    async (source): Promise<ContentResult | null> => {
      try {
        const response = await fetchWithTimeout(source.link, {}, 800);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${source.link}. Status: ${response.status}`,
          );
        }
        // const buffer = await response.buffer();
        // const html = buffer.toString('utf-8');
        const html = await response.text();
        const mainContent = extractMainContent(html);
        return { ...source, html: mainContent };
      } catch (error) {
        // console.error(`Error processing ${source.link}:`, error);
        return null;
      }
    },
  );
  try {
    const results = await Promise.all(promises);
    return results.filter((source): source is ContentResult => source !== null);
  } catch (error) {
    console.error("Error fetching and processing blue links contents:", error);
    throw error;
  }
}

export async function processAndVectorizeContent(
  contents: ContentResult[],
  query: string,
  textChunkSize = 1500,
  textChunkOverlap = 200,
  numberOfSimilarityResults = 4,
): Promise<DocumentInterface[]> {
  const allResults: DocumentInterface[] = [];
  try {
    for (let i = 0; i < contents.length; i++) {
      const content = contents[i];
      if (content && content.html.length > 0) {
        try {
          const splitText = await new RecursiveCharacterTextSplitter({
            chunkSize: textChunkSize,
            chunkOverlap: textChunkOverlap,
          }).splitText(content.html);
          const vectorStore = await MemoryVectorStore.fromTexts(
            splitText,
            { title: content.title, link: content.link },
            embeddings,
          );
          // console.log(vectorStore)
          const contentResults = await vectorStore.similaritySearch(
            query,
            numberOfSimilarityResults,
          );
          allResults.push(...contentResults);
        } catch (error) {
          console.error(`Error processing content for ${content.link}:`, error);
        }
      }
    }
    console.log(allResults)
    return allResults;
  } catch (error) {
    console.error("Error processing and vectorizing content:", error);
    throw error;
  }
}