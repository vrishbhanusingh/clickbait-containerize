// // import {Configuration, OpenAIApi ,ChatCompletionRequestMessage} from 'openai-edge';
// // import {Message, OpenAIStream, StreamingTextResponse,} from 'ai';
// // import {  } from 'ai';
// // g
// // import { getContext } from '~/lib/context';
// // import { db } from '~/server/db';
// // import { chats, messages as _messages, generatedTitles } from '~/server/db/schema';
// // import { NextResponse } from 'next/server';

// // import { eq } from 'drizzle-orm';

// // export const config = {
// //     runtime: 'edge',
// //   };

// // // export const runtime = "edge";

// // const OAconfig = new Configuration({
// //     apiKey: process.env.OPENAI_API_SECRET_KEY,
// // })

// // const openai = new OpenAIApi(OAconfig)

// // export async function POST(req: Request) {
// //     try {
// //         const {messages, chatid} = await req.json()
// //         const _chats = await db.select().from(chats).where(eq(chats.id, chatid));
// //         if (_chats.length != 1) {
// //             console.log('chat not found')
// //             return NextResponse.json({ error: "chat not found" }, { status: 404 });
// //         }

// //         const fileKey = _chats[0].fileKey
// //         const abstract = _chats[0].abstract


// //         const { text } = await generateText({
// //           model: yourModel,
// //           system:
// //             'You are a professional writer. You write simple, clear, and concise content.',
// //           prompt: `summarize the following article in 3-5 sentences:\n${article}`,
// //         });
// //         // const lastMessage = messages[messages.length - 1];
// //         const context = await getContext(lastMessage.content, fileKey)
        
// //         const prompt = {
// //             role: "system",
// //             content: `AI assistant is a brand new, powerful, human-like artificial intelligence.
// //             The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
// //             AI is a well-behaved and well-mannered individual.
// //             AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
// //             AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
// //             AI is a seasoned reseracher who has worked on many papers.
// //             AI is particularly well versed in creating engaging, eye catching and informative titles that get maximum reads and citaions. 
// //             START PDF BLOCK
// //             ${context}
// //             END OF PDF BLOCK

// //             START ABSTRACT BLOCK
// //             ${abstract}
// //             END OF ABSTRACT BLOCK

// //             AI assistant will take into account any PDF BLOCK and ABSTRACT BLOCK that is provided in a conversation.
// //             AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
// //             AI assistant will create a title that is eye-catching, engaging and informative with a goal of getting maximum reads and citations.
// //             AI will put the title between ::TITLESTART:: and ::TITLEEND::
// //             `,
// //           };


// //     const response = await openai.createChatCompletion({
// //       model: "gpt-3.5-turbo",
// //       messages: [
// //         prompt,
// //         // ...messages.filter((message: Message) => message.role === "user"),l̥l̥l̥l̥
// //       ],
// //       stream: true,
// //     });

// //         const stream = OpenAIStream(response,
// //             {
// //             onCompletion: async (completion) => {
// //               // save ai message into db
// //               await db.insert(generatedTitles).values({
// //                 chatId: chatid,
// //                 generatedTitle : completion,
// //                 abstract: abstract,

// //               });
// //             },
// //           }
// //         );
// //         return new StreamingTextResponse(stream)
// //     } catch (error) {
// //         console.log(error)
// //         return NextResponse.json({ error: error}, { status: 404 });
        
// //     }
// // }

// import { type CoreMessage, streamText,generateText } from 'ai';
// import { createOpenAI } from '@ai-sdk/openai';
// import { db } from '~/server/db';
// import { chats, messages as _messages, generatedTitles } from '~/server/db/schema';
// import { NextResponse } from 'next/server';
// import { eq } from 'drizzle-orm';

// export const runtime = "edge"

// // const OPENAI_API_KEY = process.env.OPENAI_API_SECRET_KEY!;
// const openai = createOpenAI({
//   apiKey: process.env.OPENAI_API_SECRET_KEY,
// });
// // Allow streaming responses up to 30 seconds


// export async function POST(req: Request) {
//   try {
//     const { messages, chatid } = await req.json();
//     const _chats = await db.select().from(chats).where(eq(chats.id, chatid));

//     if (_chats.length !== 1) {
//       console.log('chat not found');
//       return NextResponse.json({ error: 'chat not found' }, { status: 404 });
//     }

//     const fileKey = _chats[0].fileKey;
//     const abstract = _chats[0].abstract;
//     const getContextPrompt ='From the PDF, extract all the nessasry information needed to create an engaging, eye catching and informative title.'; ;
//     const context = await getContext(getContextPrompt, fileKey);

    
      

//       const systemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
//             The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
//             AI is a well-behaved and well-mannered individual.
//             AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
//             AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
//             AI is a seasoned reseracher who has worked on many papers.
//             AI is particularly well versed in creating engaging, eye catching and informative titles that get maximum reads and citaions. 
//             START PDF BLOCK
//             ${context}
//             END OF PDF BLOCK

//             START ABSTRACT BLOCK
//             ${abstract}
//             END OF ABSTRACT BLOCK

//             AI assistant will take into account any PDF BLOCK and ABSTRACT BLOCK that is provided in a conversation.
//             AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
//             AI assistant will create a title that is eye-catching, engaging and informative with a goal of getting maximum reads and citations.
//             AI will put the title between ::TITLESTART:: and ::TITLEEND::
//             `;

//     const prompt = 'Generate the Title given the CONTEXT BLOCK and the ABSTRACT BLOCK'

//     // Save user message into db
//     // console.log(prompt);
//     const { text } = await generateText({
//       model: openai('gpt-3.5-turbo'),
//       system: systemPrompt,
//       prompt: prompt,
//     });
//     // console.log(text);
//     await db.insert(generatedTitles).values({
//       chatId: chatid,
//       generatedTitle : text,
//       abstract: abstract,
//     });
    



//     return NextResponse.json({ text });
//     // return result.toAIStreamResponse();
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

