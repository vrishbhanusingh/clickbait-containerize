import { db } from "~/server/db";
import { messages } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// export const config = {
//     runtime: 'edge',
//   };

  export const runtime = "edge"
  export const POST = async(req: Request) => {
    const { paperId } = await req.json();
    const _messages = await db.select().from(messages).where(eq(messages.paperId, paperId))
    return NextResponse.json(_messages)
    
  }