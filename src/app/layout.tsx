import "~/styles/globals.css";
import '@mantine/core/styles.css';
import { GeistSans } from "geist/font/sans";
import { ClerkProvider,SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import Providers from "~/components/provider";
import { Toaster } from "react-hot-toast";


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

    <head><ColorSchemeScript/></head>
      
      
      
      <body>
      <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
      </header>
      
        
        {children}
        <Toaster />
        </body>
        {/* <Toaster /> */}
    </html>
    </Providers>
    </ClerkProvider>
  );
}
