import type { Metadata } from "next";
import Roobert from "next/font/local";
import "./globals.css";

const roobert = Roobert({
  variable: "--font-roobert",
  src: "../../public/fonts/RoobertTRIALVF-BF67243fd545701.ttf",
});

export const metadata: Metadata = {
  title: "Skinstric.AI",
  description: "High performance skin detection and analysis using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roobert.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
