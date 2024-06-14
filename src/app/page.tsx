// import { SignInButton } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Button } from "~/components/ui/button";
// import {LogIn} from 'lucide-react'
// import FileUpload from "~/components/fileUpload";
// import GoToDashButton from "~/components/ui/GoToDashButton";



// // import {Uploader} from "~/components/fileUpload";

// export default async function HomePage() {
//   const {userId} = await auth();
//   const isAuth = !!userId
//   return (
//   //   <main className="">
//   //     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16"> */}
//   // <div className="absolute w-full max-w-lg">
//   // <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16" style={{
//   //   backgroundImage: "url('/images/—Pngtree—dark green cyan paper cut_1225583.jpg')",
//   //   backgroundSize: 'cover',
//   //   backgroundPosition: 'center'
//   // }}
//   // >
//   <div className=" mt-24 flex translate-y-1/2 flex-col items-center justify-center gap-6" style={{
//     backgroundImage: "url('/images/—Pngtree—dark green cyan paper cut_1225583.jpg')",
//     backgroundSize: 'cover',
//     backgroundPosition: 'center'
//   }}
//   >
//   <h1 className="text-center text-4xl font-bold">
//     Generate Read-Optimized Titles
//   </h1>
//   <p className="text-md max-w-lg text-center">
//     Upload your PDF or paste your abstract to generate a read-optimized
//     title.
//   </p>
//   <div className="flex w-full max-w-xs justify-center">
//     {isAuth ? (
//       <GoToDashButton />
//     ) : (
//       <Link href="/sign-in">
//         <div className="relative z-10">
//           <Button>Get started</Button>
//         </div>
//       </Link>
//     )}
//   </div>
// </div>
// );
// }

// // import React from 'react';

// // export default function PagePlaceholder({ pageName }: { pageName: string }) {
// //   return (
// //     <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
// //       <span className="font-bold text-3xl">{pageName}</span>
// //       <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
// //       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
// //       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
// //       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
// //       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
// //       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
// //     </div>
// //   );
// // }
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { LogIn } from "lucide-react";
import FileUpload from "~/components/fileUpload";
import GoToDashButton from "~/components/ui/GoToDashButton";

// import {Uploader} from "~/components/fileUpload";

export default async function HomePage() {
  const {  userId  } = await auth();
  const isAuth = !!userId;
;
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/—Pngtree—dark green cyan paper cut_1225583.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-center text-4xl font-bold text-white">
          Generate Read-Optimized Titles
        </h1>
        <p className="text-md max-w-lg text-center text-white">
          Upload your PDF or paste your abstract to generate a read-optimized title.
        </p>
        <div className="flex w-full max-w-xs justify-center">
          {isAuth ? (
            <GoToDashButton />
          ) : (
            <Link href="/sign-in">
              <div className="relative z-10">
                <Button>Get started</Button>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}