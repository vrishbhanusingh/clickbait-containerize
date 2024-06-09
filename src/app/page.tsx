import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {LogIn} from 'lucide-react'
import FileUpload from "~/components/fileUpload";
import GoToDashButton from "~/components/ui/GoToDashButton";



// import {Uploader} from "~/components/fileUpload";

export default async function HomePage() {
  const {userId} = await auth();
  const isAuth = !!userId
  return (
  //   <main className="">
  //     <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16"> */}
  // <div className="absolute w-full max-w-lg">
  <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
    <div className="absolute w-full max-w-lg">
    <div className="absolute top-0 -left-3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          
<div className="flex flex-col items-center justify-center h-screen space-y-6 px-6">
  <h1 className="text-4xl font-bold text-center">
    Generate Read-Optimized Titles
  </h1>
  <p className="text-md text-center max-w-lg">
    Upload your PDF or paste your abstract to generate a read-optimized title.
  </p>
  <div className="flex justify-center w-full max-w-xs">
    {isAuth ? (
      <GoToDashButton />
    ) : (
      <Link href="/sign-in">
        <Button>Sign in</Button>
      </Link>
    )}
  </div>
</div>
</div>
</div>

  );
}

// import React from 'react';

// export default function PagePlaceholder({ pageName }: { pageName: string }) {
//   return (
//     <div className="flex flex-1 py-4 h-screen sm:h-fit flex-col space-y-2 px-4">
//       <span className="font-bold text-3xl">{pageName}</span>
//       <div className="border-dashed border border-zinc-500 w-full h-12 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//       <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg"></div>
//     </div>
//   );
// }
