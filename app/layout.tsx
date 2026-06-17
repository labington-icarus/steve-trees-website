import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Steve's Tree Removal | Fredericksburg VA",
  description:
    "Tree trimming, tree removal, stump grinding, and hardscaping in Fredericksburg, VA. Call Steve's Trees for a free estimate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5E6C8] text-[#111111] pb-20 sm:pb-0">
        {children}
      </body>
    </html>
  );
}
