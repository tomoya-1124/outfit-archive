import Link from "next/link";
import Container from "@/components/ui/Container";

export default function OutfitNotFound() {
  return (
    <main className="min-h-screen bg-neutral-950 py-16 text-white">
      <Container>
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
          <h1 className="text-2xl font-semibold">コーデが見つかりません</h1>
          <p className="mt-2 text-white/60">
            削除された可能性があります。一覧から再度選択してください。
          </p>
          <Link
            href="/outfits"
            className="mt-6 inline-block rounded-full bg-white px-4 py-2 text-sm text-black"
          >
            一覧へ戻る
          </Link>
        </div>
      </Container>
    </main>
  );
}
