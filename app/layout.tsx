import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "OUTFIT ARCHIVE",
  description: "Personal outfit logging app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-neutral-950 text-white">
        <Header />
        {children}
      </body>
    </html>
  );
}
