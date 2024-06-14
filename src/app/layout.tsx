// import "~/styles/globals.css";
// import '@mantine/core/styles.css';
// import { GeistSans } from "geist/font/sans";
// import { ClerkProvider,SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// import Providers from "~/components/provider";
// import { Toaster } from "react-hot-toast";
// import Header from './header';
// import SideNav from "~/components/ui/sideNav";



// export const metadata = {
//   title: "Clickbait",
//   icons: [{ rel: "icon", url: "/favicon.ico" }],
// };


// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <ClerkProvider>
//       <Providers>
//     <html lang="en" className={`${GeistSans.variable}`}>

 
      
      
      
//       <body>

      
//       <Header />
//         <div className="flex">

//           <div className="w-full">
//           <div className="sm:h-[calc(99vh-60px)] ">
//           {/* <div className="w-full flex justify-center mx-auto   overflow-auto h-[calc(100vh - 120px)] overflow-y-auto relative">
//           <div className="w-full md:max-w-6xl"> */}
//           {children}
//           {/* </div>
//           </div> */}
//           </div>
//           </div>
//           </div>
//         <Toaster />
//         </body>
//         {/* <Toaster /> */}
//     </html>
//     </Providers>
//     </ClerkProvider>
//   );
// }

import "~/styles/globals.css";
import '@mantine/core/styles.css';
import { GeistSans } from "geist/font/sans";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Providers from "~/components/provider";
import { Toaster } from "react-hot-toast";
import Header from './header';

export const metadata = {
  title: "Clickbait",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="">
            <Header />
                {children}
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
