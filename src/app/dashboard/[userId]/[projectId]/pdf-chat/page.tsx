import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import { chats, papers } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import ChatSideBar from "~/components/ChatSideBar";
import PDFViewer from "~/components/ui/PDFViewer";
import ChatComponent from "~/components/ChatComponent";
import GenratedTitle from "~/components/titleGen";
import ChatComponentPaper from "~/components/ChatComponentPaper";
import PDFViewerNew from "~/components/ui/PdfViewerNew";
import ChatComponentPaperVoice from "~/components/ChatComponentPaperVoice";
// import { useParams } from 'next/navigation';
// type Props = {
//     params: {
//         chatid:string
//         projectId:string
//     }
// }
const ChatPagePaper = async (props) => {
  const projectId = props.params.projectId;
  const userId = props.params.userId;

  if (!userId) {
    return redirect("/sign-in");
  }
  const isAuth = !!userId;

  const _papers = await db
    .select()
    .from(papers)
    .where(eq(papers.userId, userId));

  // if (!_chats) {
  //   return redirect('/')
  // }
  // if (!_chats.find(chat => chat.id === parseInt(chatId))){
  //   return redirect('/')
  // }
  const currentPaper = _papers.find(
    (paper) => paper.id === parseInt(projectId),
  );
  const isPro = true;

  return (
    <div>
      <div className="mx-auto mt-10 min-h-[35rem] flex justify-center items-center h-full ">
        <div className="pr-10">
          <PDFViewer pdf_url={currentPaper?.pdfUrl ?? " "} />
        </div>
      </div>
        <ChatComponentPaperVoice paperId={parseInt(projectId)} />
    </div>

    // </div>)
  );
};
export default ChatPagePaper;
