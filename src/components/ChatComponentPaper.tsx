'use client'
import React from 'react';
import { useChat } from "ai/react"
import { Input } from './ui/input';
import { Button } from "./ui/button";
import {Send} from 'lucide-react';
import MessageList from './MessageList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Message } from 'ai';
type Props = { paperId: number };

const ChatComponentPaper = ({ paperId }: Props) => {
    const {data} = useQuery({
        queryKey: ["paper", paperId],
        queryFn: async () => {
            console.log('Sending paperId:', paperId);
            const response = await axios.post<Message[]>('/api/get-messages-paper', {paperId})
            return response.data
        }
    })
    // console.log(data)
    const {input, handleInputChange, handleSubmit, messages, isLoading} = useChat({
        api: "/api/chat-paper",
        body: {
            paperId
        },
        initialMessages: data ?? []
    }
    );

    
    
    React.useEffect(() => {
        const messageContainer = document.getElementById("message-container");
        if (messageContainer) {
          messageContainer.scrollTo({
            top: messageContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, [messages]);
    return  (
        <div
          className="relative max-h-full overflow-scroll scrollbar-hide"
          id="message-container"
        >
          {/* header */}
          <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
            <h3 className="text-xl font-bold">Chat</h3>
          </div>
    
          {/* message list */}
          <div>
          <div className='flex flex-row'>
          <MessageList messages={messages} isLoading={isLoading} />
          </div>
            <div className='grow sticky bottom-0 inset-x-0 px-2 py-4'>
          <form
            onSubmit={handleSubmit}
            className="sticky bottom-0 inset-x-0 mt-100 bg-gray-50"
          >
            
            <div className="flex">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask any question..."
                className="w-full"
              />
              <Button className="bg-yellow-600 ml-2">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
          </div>
          </div>
        </div>
      );
}



export default ChatComponentPaper;