
import React from 'react';
import {redirect} from "next/navigation"
import {auth} from "@clerk/nextjs/server"
import { db } from '~/server/db';
import { chats, papers } from '~/server/db/schema';
import { eq } from "drizzle-orm";
import ChatSideBar from '~/components/ChatSideBar';
import PDFViewer from '~/components/ui/PDFViewer';
import ChatComponent from '~/components/ChatComponent';
import GenratedTitle from '~/components/titleGen';
import ChatComponentPaper from '~/components/ChatComponentPaper';
// import { useParams } from 'next/navigation';
// type Props = {
//     params: {
//         chatid:string
//         projectId:string
//     }
// }
const ChatPagePaper = async ( props ) => {
    const projectId = props.params.projectId
    const userId = props.params.userId

    if (!userId) {
        return redirect("/sign-in");
      }
    const isAuth = !!userId

    const _papers = await db.select().from(papers).where(eq(papers.userId, userId))

    // if (!_chats) {
    //   return redirect('/')
    // }
    // if (!_chats.find(chat => chat.id === parseInt(chatId))){
    //   return redirect('/')
    // }
    const currentPaper = _papers.find((paper) => paper.id === parseInt(projectId));
    const isPro = true;
    console.log(parseInt(projectId))

  return (<div className="flex max-h-screen bg-gray-50 min-h-screen scrollbar-hide">

    {/* <div className="flex max-h-screen overflow-scroll"> */}
    <div className="flex w-full max-h-screen overflow-scroll scrollbar-hide">
    <div className="flex w-full max-h-screen overflow-scroll scrollbar-hide">
    {/* //sidebar */}
    {/* <div className="flex-[1] max-w-xs h-screen rounded-3xl scrollbar-hide"><ChatSideBar chats={_chats} chatId={parseInt(chatid)} isPro={isPro} /></div> */}
    
    <div className="max-h-screen p-4 oveflow-scroll flex-[5] scrollbar-hide rounded-xl">
    {/* <GenratedTitle chatid = {parseInt(chatid)}/> */}
    <PDFViewer pdf_url={currentPaper?.pdfUrl ?? " "} />
    
    </div>
    <div className="flex-[3] border-l-4 border-l-slate-200 scrollbar-hide"><ChatComponentPaper paperId = {parseInt(projectId)}/></div>
    
    </div>
    </div>


    <div className="absolute w-full max-w-lg">
    
    
    </div>
    
  </div>
// </div>)
)}
export default ChatPagePaper;