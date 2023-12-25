import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ScrollContext } from "@/context/AppProvider";
import MenuComponent from "@/components/MenuComponent/MenuComponent";
import RollTop from "@/components/RollTop";
import ChatRoll from "@/components/ChatRoll";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ScrollContext>
          <MenuComponent />
          {children}
          <ChatRoll />
          <RollTop />
        </ScrollContext>
      </body>
    </html>
  );
}
