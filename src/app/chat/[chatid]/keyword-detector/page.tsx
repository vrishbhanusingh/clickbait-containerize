import React from 'react';
import {redirect} from "next/navigation"
import {auth} from "@clerk/nextjs/server"
import { db } from '~/server/db';
import { chats } from '~/server/db/schema';
import { eq } from "drizzle-orm";
import ChatSideBar from '~/components/ChatSideBar';
import PDFViewer from '~/components/ui/PDFViewer';
import ChatComponent from '~/components/ChatComponent';
import GenratedTitle from '~/components/titleGen';
type Props = {
    params: {
        chatid:string
    }
}
const ChatPage = async ({ params: { chatid } }: Props) => {
    const {userId} = await auth();
    // if (!userId) {
    //     return redirect("/sign-in");
    //   }
    const isAuth = !!userId

    const _chats = await db.select().from(chats).where(eq(chats.userId, userId))

    // if (!_chats) {
    //   return redirect('/')
    // }
    // if (!_chats.find(chat => chat.id === parseInt(chatId))){
    //   return redirect('/')
    // }
    const currentChat = _chats.find((chat) => chat.id === parseInt(chatid));
    const isPro = true;


  return (<div className="flex max-h-screen bg-gray-50 min-h-screen scrollbar-hide">
    <h1>this is keyword detector</h1>
    {/* <div className="flex max-h-screen overflow-scroll"> */}
    <div className="flex w-full max-h-screen overflow-scroll scrollbar-hide">
    <div className="flex w-full max-h-screen overflow-scroll scrollbar-hide">
    {/* //sidebar */}
    <div className="flex-[1] max-w-xs h-screen rounded-3xl scrollbar-hide"><ChatSideBar chats={_chats} chatId={parseInt(chatid)} isPro={isPro} /></div>
    
    <div className="max-h-screen p-4 oveflow-scroll flex-[5] scrollbar-hide rounded-xl">
    <GenratedTitle chatid = {parseInt(chatid)}/>
    <PDFViewer pdf_url={currentChat?.pdfUrl ?? " "} />
    
    </div>
    <div className="flex-[3] border-l-4 border-l-slate-200 scrollbar-hide"><ChatComponent chatid = {parseInt(chatid)}/></div>
    
    </div>
    </div>


    <div className="absolute w-full max-w-lg">
    <div className="absolute top-0 -left-3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    
    </div>
    
  </div>
// </div>)
)}
export default ChatPage;