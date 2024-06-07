import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {LogIn} from 'lucide-react'
import FileUpload from "~/components/fileUpload";



// import {Uploader} from "~/components/fileUpload";

export default async function HomePage() {
  const {userId} = await auth();
  const isAuth = !!userId
  return (
    <main className="">
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
  <div className="absolute w-full max-w-lg">
    <div className="absolute top-0 -left-3 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-6000"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-5xl font-semibold whitespace-nowrap" >
          Generate read optimized titles
        </h1>
        <p>Upload your pdf or past your abstract to generate a reads optimized title</p>
        <div className="flex mt-4 whitespace-nowrap">
          {isAuth ? <div><Button>go to chats</Button>
          <FileUpload/>
          </div>: <div><Link href="/sign-in">
          <Button>Sign in <LogIn className="w-4 h-4 ml-2"></LogIn></Button></Link>
          </div>
          }
          
          {}
        </div>

      </div>
    </div>
  </div>
</div>
    </main>
  );
}
