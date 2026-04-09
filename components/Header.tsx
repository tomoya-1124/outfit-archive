import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-sm tracking-[0.3em] text-white/80">
          OUTFIT ARCHIVE
        </Link>

        <nav className="flex gap-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/outfits" className="hover:text-white">
            Outfits
          </Link>
          <Link href="/outfits/new" className="hover:text-white">
            New
          </Link>
        </nav>
      </div>
    </header>
  );
}