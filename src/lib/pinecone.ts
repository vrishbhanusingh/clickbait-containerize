import { Pinecone, PineconeRecord } from '@pinecone-database/pinecone';
import { downloadfromS3 } from './s3-server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
    Document,
    RecursiveCharacterTextSplitter,
  } from "@pinecone-database/doc-splitter";
import { getEmbeddings } from './embeddings';
import md5 from 'md5'
import { metadata } from '~/app/layout';
import { convertToAscii } from './utils';


let pinecone: Pinecone | null = null;


export const getPineconeClient = async () => {
if (!pinecone){
    pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY!
    });
    
        }  return pinecone     
    }

type PDFPage = {
    pageContent: string;
    metadata: {
        loc: {pageNumber: number}
    }
}

export async function loadS3IntoPinecone(fileKey: string) {
    // obtain pdf
    console.log('downloading s3 into file system')
    const file_name = await downloadfromS3(fileKey);

    if (!file_name){
        throw new Error("could not download")
    }
    const loader = new PDFLoader(file_name);
    const pages = (await loader.load()) as PDFPage[];

    const documents = await Promise.all(pages.map(prepareDocument));
    const vectors = await Promise.all(documents.flat().map(embedDocument))


    const client = await getPineconeClient()

    const pineconeIndex = client.Index('clickbait-vs')

    

    const namespace = pineconeIndex.namespace(convertToAscii(fileKey))

    console.log("inserting vectors into pinecone")
    await namespace.upsert(vectors);
    return pages;

}

async function embedDocument(doc:Document) {
    try {
        const embeddings = await getEmbeddings(doc.pageContent)
        const hash = md5(doc.pageContent)

        return {
            id: hash,
            values: embeddings,
            metadata: {
                text: doc.metadata.text,
                pageNumber: doc.metadata.pageNumber
            }
        } as PineconeRecord
    } catch (error) {
        
    }
}
export const truncateStringByBytes = (str: string, bytes: number) => {
    const enc = new TextEncoder();
    return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
  };
  

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  // split the docs
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
        pageContent,
        metadata: {
          pageNumber: metadata.loc.pageNumber,
          text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}