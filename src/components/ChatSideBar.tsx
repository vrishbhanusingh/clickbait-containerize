"use client";
import { DrizzleChat } from "~/server/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
    const [loading, setLoading] = React.useState(false);

    return (
        <div className="w-full min-h-screen overflow-scroll soff p-4 text-gray-400 bg-gray-200 scrollbar-hide">
        <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <div className="flex max-h-screen overflow-scroll rounded-3xl pb-20 flex-col gap-2 mt-4 scrollbar-hide">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-600 flex items-center", {
                "bg-yellow-600 text-gray-900": chat.id === chatId,
                "hover:text-gray-900": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis scrollbar-hide">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
        </div>
    )
}
export default ChatSideBar;