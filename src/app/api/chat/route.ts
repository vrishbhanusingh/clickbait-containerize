// import {Configuration, OpenAIApi ,ChatCompletionRequestMessage} from 'openai-edge';
// import {Message, OpenAIStream, StreamingTextResponse,} from 'ai'

// import { getContext } from '~/lib/context';
// import { db } from '~/server/db';
// import { chats, messages as _messages } from '~/server/db/schema';
// import { NextResponse } from 'next/server';

// import { eq } from 'drizzle-orm';

// export const config = {
//     runtime: 'edge',
//   };

// // export const runtime = "edge";

// const OAconfig = new Configuration({
//     apiKey: process.env.OPENAI_API_SECRET_KEY,
// })

// const openai = new OpenAIApi(OAconfig)

// export async function POST(req: Request) {
//     try {
//         const {messages, chatid} = await req.json()
//         const _chats = await db.select().from(chats).where(eq(chats.id, chatid));
//         if (_chats.length != 1) {
//             console.log('chat not found')
//             return NextResponse.json({ error: "chat not found" }, { status: 404 });
//         }

//         const fileKey = _chats[0].fileKey
//         // const abstract = _chats[0].abstract

//         const lastMessage = messages[messages.length - 1];
//         const context = await getContext(lastMessage.content, fileKey)

//         const prompt = {
//             role: "system",
//             content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
//             The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
//             AI is a well-behaved and well-mannered individual.
//             AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
//             AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
//             AI assistant is a big fan of Pinecone and Vercel.
//             START CONTEXT BLOCK
//             ${context}
//             END OF CONTEXT BLOCK
//             AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
//             If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
//             AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
//             AI assistant will not invent anything that is not drawn directly from the context.
//             `,
//           };


//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [
//         prompt,
//         ...messages.filter((message: Message) => message.role === "user"),
//       ],
//       stream: true,
//     });

//         const stream = OpenAIStream(response,
//             {
//             onStart: async () => {
//               // save user message into db
//               await db.insert(_messages).values({
//                 chatId: chatid,
//                 content: lastMessage.content,
//                 role: "user",
//               });
//             },
//             onCompletion: async (completion) => {
//               // save ai message into db
//               await db.insert(_messages).values({
//                 chatId: chatid,
//                 content: completion,
//                 role: "system",
//               });
//             },
//           }
//         );
//         return new StreamingTextResponse(stream)
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({ error: error}, { status: 404 });
        
//     }
// }


// import { type CoreMessage, streamText } from 'ai';
// import { createOpenAI } from '@ai-sdk/openai';
// import { getContext } from '~/lib/context';
// import { db } from '~/server/db';
// import { chats, messages as _messages } from '~/server/db/schema';
// import { NextResponse } from 'next/server';
// import { eq } from 'drizzle-orm';

// // export const config = {
// //   runtime: 'edge',
// // };
// export const runtime = "edge"

// // const OPENAI_API_KEY = process.env.OPENAI_API_SECRET_KEY!;
// const openai = createOpenAI({
//   apiKey: process.env.OPENAI_API_SECRET_KEY,
// });
// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   try {
//     const { messages, chatid } = await req.json();

//     const _chats = await db.select().from(chats).where(eq(chats.id, chatid));

//     if (_chats.length !== 1) {
//       console.log('chat not found');
//       return NextResponse.json({ error: 'chat not found' }, { status: 404 });
//     }

//     const fileKey = _chats[0].fileKey;
//     const lastMessage = messages[messages.length - 1];
//     const context = await getContext(lastMessage.content, fileKey);
    
//     const systemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
//       The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
//       AI is a well-behaved and well-mannered individual.
//       AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
//       AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
//       AI assistant is a big fan of Pinecone and Vercel.
//       START CONTEXT BLOCK
//       ${context}
//       END OF CONTEXT BLOCK

//       START  WEB CONTEXT BLOCK
//       ${context}
//       END OF WEB CONTEXT BLOCK

//       AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
//       If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
//       AI assistant will not apologize for previous responses, but instead will indicate new information was gained.
//       AI assistant will not invent anything that is not drawn directly from the context.`;

//     // Save user message into db
//     await db.insert(_messages).values({
//       chatId: chatid,
//       content: lastMessage.content,
//       role: 'user',
//     });



//     const result = await streamText({
//       model: openai('gpt-3.5-turbo'),
//       system: systemPrompt,
//       messages: messages as CoreMessage[],
//       async onFinish({ text, toolCalls, toolResults, usage, finishReason }) {
//         // implement your own storage logic:
//         await db.insert(_messages).values({
//           chatId: chatid,
//           content: text,
//           role: 'system',
//         });
//       },});

//     // Save AI message into db


//     return result.toAIStreamResponse();
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

