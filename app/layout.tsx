import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Steve's Trees | Tree Removal & Hardscaping in Fredericksburg, VA",
  description:
    "Professional tree trimming, removal, stump grinding, and hardscaping in Fredericksburg, VA and surrounding areas. Call (540) 642-6612 for a free estimate.",
  keywords: [
    "tree removal",
    "tree trimming",
    "stump grinding",
    "hardscaping",
    "Fredericksburg VA",
    "Spotsylvania",
    "Stafford",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
