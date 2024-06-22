// import { cn } from "~/lib/utils";
// import { Message } from "ai/react";
// import { Loader2 } from "lucide-react";
// import React from "react";

// type Props = {
//   isLoading: boolean;
//   messages: Message[];
// };

// const MessageList = ({ messages, isLoading }: Props) => {
//   if (isLoading) {
//     return (
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//         <Loader2 className="w-6 h-6 animate-spin" />
//       </div>
//     );
//   }
//   if (!messages) return <></>;
//   return (
//     <div className="flex flex-col gap-2 px-4">
//       {messages.map((message) => {
//         return (
//           <div
//             key={message.id}
//             className={cn("flex", {
//               "justify-end pl-10": message.role === "user",
//               "justify-start pr-10": message.role === "assistant",
//             })}
//           >
//             <div
//               className={cn(
//                 "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
//                 {
//                   "bg-teal-800 text-white": message.role === "user",
//                 }
//               )}
//             >
//               <p>{message.content}</p>
//             </div>
//           </div>
//         );
//       })}
      
//     </div>
//   );
// };

// export default MessageList;

// import { cn } from "~/lib/utils";
// import { Message } from "ai/react";
// import { Loader2 } from "lucide-react";
// import React from "react";

// type Props = {
//   isLoading: boolean;
//   messages: Message[];
// };

// const MessageList = ({ messages, isLoading }: Props) => {
//   return (
//     <div className="flex flex-col gap-2 px-4 relative">
//       {messages.map((message) => {
//         return (
//           <div
//             key={message.id}
//             className={cn("flex", {
//               "justify-end pl-10": message.role === "user",
//               "justify-start pr-10": message.role === "assistant",
//             })}
//           >
//             <div
//               className={cn(
//                 "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
//                 {
//                   "bg-teal-800 text-white": message.role === "user",
//                 }
//               )}
//             >
//               <p>{message.content}</p>
//             </div>
//           </div>
//         );
//       })}
//       {isLoading && (
//         <div className="flex justify-center mt-2">
//           <Loader2 className="w-6 h-6 animate-spin" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageList;
import { cn } from "~/lib/utils";
import { Message } from "ai/react";
import { Loader2 } from "lucide-react";
import React from "react";

type Props = {
  isLoading: boolean;
  messages: Message[];
};

const MessageList = ({ messages, isLoading }: Props) => {
  // console.log("Messages :>> ", messages);

  // if (isLoading) {
  //   return (
  //     <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
  //       <Loader2 className="h-6 w-6 animate-spin" />
  //     </div>
  //   );
  // }

  if (!messages) return <></>;

  return (
    <div className="flex w-full flex-col gap-2 px-4 ">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn("flex", {
            "justify-end pl-10": message.role === "user",
            "justify-start pr-10": message.role === "assistant",
          })}
        >
          <div
            className={cn(
              "rounded-lg px-3 py-1 text-sm shadow-md ring-1 ring-gray-900/10",
              {
                "bg-teal-900 text-white": message.role === "user",
              },
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      {/* {isLoading && (
        <div className="flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )} */}
    </div>
  );
};

export default MessageList;
