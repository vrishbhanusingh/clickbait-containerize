"use client";
import React, { useRef, useState } from "react";
import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Mic, Send, StopCircle, Volume2 } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { generateTTS, transcribeAudio } from "~/server/audio";
import { speechToText } from "~/lib/speechToText";

type Props = { paperId: number };

const ChatComponentPaperVoice = ({ paperId }: Props) => {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const voicePromptRef = useRef(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const { data } = useQuery({
    queryKey: ["paper", paperId],
    queryFn: async () => {
      console.log("Sending paperId:", paperId);
      const response = await axios.post<Message[]>("/api/get-messages-paper", {
        paperId,
      });
      return response.data;
    },
  });

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    append,
  } = useChat({
    api: "/api/chat-paper",
    body: {
      paperId,
    },
    initialMessages: data ?? [],
    async onFinish(message) {
      console.log("message :>> ", message);
      console.log("voicePromptRef :>> ", voicePromptRef);
      const lastMessage = messages[messages.length - 2];

      console.log(
        "lastMessage :>> ",
        messages.filter((msg) => msg.role === "user"),
      );
      if (voicePromptRef.current) {
        setAudioLoading(true);
        console.log(message.content)
        const speechData = await generateTTS(message.content);
        console.log("speechData :>> ", speechData);
        const speech = new Audio(speechData);
        setAudioLoading(false);
        setAudioPlaying(true);
        speech.play();

        speech.onended = () => setAudioPlaying(false);

        voicePromptRef.current = false;
      }
    },
  });

  React.useEffect(() => {
    console.log("messages :>> ", messages);
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
    setRecording(!recording);
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const options = { mimeType: "audio/webm" };
      mediaRecorderRef.current = new MediaRecorder(stream, options);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event: BlobEvent) => {
          chunksRef.current.push(event.data);
        },
      );
      mediaRecorderRef.current.start();
    });
  };

  const stopRecording = async () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });

        speechToText(audioBlob, async (data: string) => {
          console.log("data :>> ", data);
          voicePromptRef.current = true;
          const transcription = await transcribeAudio(data);
          if (transcription.status) {
            console.log("transcription :>> ", transcription);
            append({
              role: "user",
              content: transcription.message,
            });
          } else {
            alert("Unable to hear!");
          }
        });

        chunksRef.current = [];
      });
    }
  };

  return (
    <div className="fixed h-[550px] bottom-4 right-4 w-80 bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-teal-800 text-white p-3">
        <h3 className="text-lg font-bold">Chat</h3>
      </div>

      {/* Message List */}
      <div className="flex-1 p-2 overflow-y-auto">
        <MessageList messages={messages} isLoading={isLoading} />
      </div>

      {/* Recording & Sending Controls */}
      <div className="p-2 flex justify-center items-center">
        {isLoading || audioLoading ? (
          <div className="h-fit rounded-full border border-gray-300 bg-gray-100 p-4 shadow-lg">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : audioPlaying ? (
          <div className="h-fit rounded-full border border-gray-300 bg-gray-100 p-4 shadow-lg">
            <Volume2 size={24} />
          </div>
        ) : (
          <Button
            onMouseDown={handleRecording}
            onMouseUp={handleRecording}
            onTouchStart={handleRecording}
            onTouchEnd={handleRecording}
            className="h-fit rounded-full bg-red-600 p-4 shadow-lg"
          >
            {recording ? <StopCircle size={24} /> : <Mic size={24} />}
          </Button>
        )}
      </div>

      {/* Text Input */}
      <div className="p-2 bg-gray-50 border-t">
        <form onSubmit={handleSubmit} className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" className="ml-2 bg-teal-800" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponentPaperVoice;
