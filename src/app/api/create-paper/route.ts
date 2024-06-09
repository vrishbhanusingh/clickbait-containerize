import { NextResponse } from 'next/server';
import { loadS3IntoPinecone } from '~/lib/pinecone';
import { getS3Url } from '~/lib/s3';
import { db } from '~/server/db';
import { chats , papers} from '~/server/db/schema';
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const {userId} = await auth();
    if (!userId) {
        // Handle unauthenticated user
        console.error('User is not authenticated');
        return NextResponse.json(
            { error: 'User is not authenticated' },
            { status: 401 }
        );
    }
    try {
        const body = await req.json();
        const { file_key, file_name , abstract } = body;

        // Your processing logic here
        console.log('Received data:', { file_key, file_name, abstract });
        const pages = await loadS3IntoPinecone(file_key)
        const paper_id = await db.insert(papers).values({
            fileKey: file_key,
            pdfName: file_name,
            pdfUrl: getS3Url(file_key),
            abstract: abstract,
            userId,
        })
        .returning({
            insertedId: papers.id,
        });
        return NextResponse.json(
            {
              paper_id: paper_id[0].insertedId,
            },
            { status: 200 }
          );
    } catch (error) {
        console.error('Error in POST /api/create-chat:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}