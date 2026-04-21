import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import PublicOutfitCard from "@/components/PublicOutfitCard";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function PublicPage() {
  const { data, error } = await supabase
    .from("outfits")
    .select("*")
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  const outfits = data || [];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xs tracking-[0.3em] text-white/80 sm:text-sm"
          >
            OUTFIT ARCHIVE
          </Link>

          <p className="text-xs tracking-[0.2em] text-white/40">PUBLIC LOOKS</p>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">DISCOVER</p>
          <h1 className="text-4xl font-bold tracking-tight">公開コーデ一覧</h1>
          <p className="text-white/65">
            公開設定されたコーデだけを一覧で見ることができます。
          </p>
        </div>

        {error ? (
          <p className="text-white/60">公開コーデの取得に失敗しました。</p>
        ) : outfits.length === 0 ? (
          <p className="text-white/60">
            公開されているコーデはまだありません。
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {outfits.map((outfit) => (
              <PublicOutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
