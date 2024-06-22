
// import { SignInButton } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";
// import Link from "next/link";
// import { Button } from "~/components/ui/button";
// import { LogIn } from "lucide-react";
// import FileUpload from "~/components/fileUpload";
// import GoToDashButton from "~/components/ui/GoToDashButton";
// import Image from 'next/image';
// // import {Uploader} from "~/components/fileUpload";

// export default async function HomePage() {
//   const {  userId  } = await auth();
//   const isAuth = !!userId;
// ;
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center"
//       style={{
//         backgroundImage: "url('/images/—Pngtree—dark green cyan paper cut_1225583.jpg')",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//     >
//       <div className="flex flex-col items-center justify-center gap-6">
//       <Link
//           href="/"
//           className="flex items-center gap-2 text-lg font-semibold md:text-base"
//           prefetch={false}
//         >
//           <span className="w-8 h-8 border bg-black bg-accent rounded-full" >
//           <span><Image
//           src="/images/IMG_20240614_133357-removebg-preview.png"
//           width={70}  // replace with your desired width
//           height={70} // replace with your desired height
//           layout="fixed"
//           /></span>
//           </span>
//           <span className="text-white text-3xl"><h1>PaperHub</h1></span>
//         </Link>
//         <h1 className="text-center text-4xl font-bold text-white">
//           We help you write better papers, faster and easier
//         </h1>
//         <p className="text-md max-w-lg text-center text-white">
//           Get started below
//         </p>
//         <div className="flex w-full max-w-xs justify-center">
//           {isAuth ? (
//             <GoToDashButton />
//           ) : (
//             <Link href="/sign-in">
//               <div className="relative z-10">
//                 <Button>Get started</Button>
//               </div>
//             </Link>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import Image from 'next/image';
import GoToDashButton from "~/components/ui/GoToDashButton";

export default async function HomePage() {
  const { userId } = await auth();
  const isAuth = !!userId;

  return (
    <div className="relative min-h-screen overflow-hidden bg-cover bg-center bg-fixed bg-hero-pattern">
      {/* Content */}
      <div className="relative z-10 min-h-screen bg-black bg-opacity-50 overflow-auto text-white">
        {/* Hero Section with Services */}
        <div className="min-h-screen flex flex-col justify-center items-center text-center animate-fadeIn">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base mb-6"
            prefetch={false}
          >
            <span className="w-8 h-8 border bg-black bg-accent rounded-full">
              <Image
                src="/images/IMG_20240614_133357-removebg-preview.png"
                width={70}
                height={70}
                layout="fixed"
                alt="PaperHub Logo"
              />
            </span>
            <span className="text-3xl">
              <h1>PaperHub</h1>
            </span>
          </Link>
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Academic Writing Experience with PaperHub
          </h1>
          <p className="text-md max-w-lg mx-auto mb-6">
            Unlock your potential with our suite of services designed to help you write better papers, faster and easier.
          </p>
          <div className="flex w-full max-w-xs justify-center mb-6">
            {isAuth ? (
              <GoToDashButton />
            ) : (
              <Link href="/sign-in">
                <div className="relative z-10">
                  <Button>Get Started</Button>
                </div>
              </Link>
            )}
          </div>
          {/* Services Overview in Hero Section */}
          <div className=" pt-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Clickbait', description: 'Capture attention with AI generated Titles that make your papers stand out.', benefit: 'Increase reader engagement and interest.' },
              { name: 'Clickbait+', description: 'Use Advanced techniques for generating titles including AI web search, retrieval augmented generation and NASA/ADS context.', benefit: '' },
              { name: 'PaperTalk', description: 'Real-time multi-lingual voice assistant with web access allowing further research for your drafts.', benefit: 'Improve your paper instantly with our voice research assistant allowing you to research in any language.' },
              { name: 'SciRag', description: 'Semantic search on NASA/ADS', benefit: 'Search NASA/ADS using natural language without having to stick to database structure' }
            ].map(service => (
              <div key={service.name} className=" p-6 bg-gray-50 rounded shadow text-black">
                <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                <p>{service.description}</p>
                <p className="mt-2 text-gray-900">{service.benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Detailed Section */}
        <div id="services" className="py-20 animate-fadeIn">
          <h2 className="text-3xl font-bold text-center mb-10">Services</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8">
            {[
              { name: 'Clickbait', description: 'Capture attention with AI generated title for you reserach papers using our custom llama3 model', benefit: 'Finetuned on the NASA/ADS dataset to generate titles that will maximise reads and citations for your paper', image: '/images/clickbait.jpeg' },
              { name: 'Clickbait+', description: 'Using more advanced techniques like retrieval augmented generation, AI web search, this is a step up from clickbait model', benefit: 'Using information from the internet, your whole paper and the NASA/ADS database, we give our LLM all the context it needs to generate titles that maximize the reads and citations for your research paper.', image: '/images/clickbaitplus.jpeg' },
              { name: 'PaperTalk', description: '"Talk" to your AI research assistant in any language, who has real time knowledge of your field of study.', benefit: 'Using voice transription, language translation, real-time web access and speech synthesis, you are able to talk to our AI research assistant in any language, for any field.', image: '/images/papertalk.jpeg' },
              { name: 'SciRag', description: 'Research and reference management tool letting you query NASA/ADS database in natural language.', benefit: 'Using vector stores and similarity search, you are able to query NASA/ADS in natural language.', image: '/images/scirag.jpeg' }
            ].map(service => (
              <div key={service.name} className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 p-4">
                  <Image src={service.image} width={500} height={300} alt={`${service.name} screenshot`} className="rounded shadow-md"/>
                </div>
                <div className="md:w-1/2 p-4">
                  <h3 className="text-2xl font-bold mb-4">{service.name}</h3>
                  <p>{service.description}</p>
                  <p className="mt-2 text-gray-100">{service.benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-20 bg-teal-900 text-center animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Join us and transform your academic writing experience with PaperHub. Sign up today and see the difference!
          </p>
          <Link href="/sign-up">
            <Button className="mt-6 bg-teal-800 text-white">Sign Up Now</Button>
          </Link>
        </div>

        {/* Footer Section */}
        <div className="py-10 bg-black text-white text-center animate-fadeIn">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-2">About PaperHub</h3>
              <p>
                PaperHub is dedicated to helping students and professionals improve their writing skills and achieve their academic and professional goals.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Contact Us</h3>
              <p>Email: support@paperhub.com</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Follow Us</h3>
              <div className="flex justify-center gap-4">
                <Link href="#"><Image src="/images/facebook-icon.png" width={30} height={30} alt="Facebook" /></Link>
                <Link href="#"><Image src="/images/twitter-icon.png" width={30} height={30} alt="Twitter" /></Link>
                <Link href="#"><Image src="/images/linkedin-icon.png" width={30} height={30} alt="LinkedIn" /></Link>
              </div>
            </div>
          </div>
          <p className="mt-6">&copy; {new Date().getFullYear()} PaperHub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}




