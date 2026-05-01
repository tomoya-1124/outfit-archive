import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 py-20 text-white">
      <Container className="space-y-6">
        <p className="text-sm tracking-[0.3em] text-white/50">OUTFIT ARCHIVE V3</p>
        <h1 className="text-4xl font-bold">Portfolio-ready Outfit Management</h1>
        <p className="text-white/70">
          Next.js + TypeScript + Tailwind で作る、実務志向のコーデ管理アプリ。
        </p>
        <Link href="/outfits" className="inline-block rounded-full bg-white px-5 py-3 text-black">
          コーデ一覧へ
        </Link>
      </Container>
    </main>
  );
}
