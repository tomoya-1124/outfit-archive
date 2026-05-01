import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OUTFIT ARCHIVE v3",
  description: "Portfolio-oriented outfit archive app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-neutral-950 text-white">
        <header className="border-b border-white/10 bg-neutral-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm tracking-[0.2em] text-white/80">
              OUTFIT ARCHIVE v3
            </Link>
            <nav className="flex items-center gap-4 text-sm text-white/70">
              <Link href="/outfits" className="hover:text-white">
                Outfits
              </Link>
              <Link href="/outfits/new" className="hover:text-white">
                New
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
