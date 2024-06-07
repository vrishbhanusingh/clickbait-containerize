import { db } from "~/server/db";
import { messages } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const config = {
    runtime: 'edge',
  };

  export const POST = async(req: Request) => {
    const {chatid} = await req.json()
    // console.log(messages.chatId, chatid)
    const _messages = await db.select().from(messages).where(eq(messages.chatId, chatid))
    // console.log(_messages)
    return NextResponse.json(_messages)
    
  }