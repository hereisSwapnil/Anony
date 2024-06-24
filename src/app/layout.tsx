import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

// Initialize Inter font with required configurations
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Anony - Anonymous Messaging App",
  description: "An anonymous messaging app.",
};

// Define props for RootLayout component
interface RootLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

// RootLayout function component
const RootLayout: React.FC<RootLayoutProps> = ({ children, session }) => {
  return (
    <html lang="en">
      {/* <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head> */}
      <body className={inter.className}>
        <Toaster />
        {/* Provide session data to SessionProvider */}
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
