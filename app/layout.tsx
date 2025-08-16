import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "In-A-Minute",
  description: "AI-powered meeting summarizer and email assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Optionally support PNG favicon */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
