"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Outfit } from "@/lib/dummy-data";
import PublicOutfitCard from "@/components/PublicOutfitCard";

export default function PublicPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [brandQuery, setBrandQuery] = useState("");

  useEffect(() => {
    const fetchOutfits = async () => {
      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("公開一覧取得エラー:", error);
      } else {
        setOutfits(data || []);
      }

      setLoading(false);
    };

    fetchOutfits();
  }, []);

  const filteredOutfits = useMemo(() => {
    const query = brandQuery.toLowerCase();

    return outfits.filter((outfit) => {
      return (
        outfit.brand.toLowerCase().includes(query) ||
        (outfit.tags ?? "").toLowerCase().includes(query)
      );
    });
  }, [outfits, brandQuery]);

  const featuredOutfit = filteredOutfits[0];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xs tracking-[0.3em] text-white/80 sm:text-sm">
            OUTFIT ARCHIVE
          </Link>

          <p className="text-xs tracking-[0.2em] text-white/40">PUBLIC LOOKS</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm tracking-[0.3em] text-white/40">DISCOVER</p>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">公開コーデ一覧</h1>
              <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
                公開設定されたコーデだけを一覧で見ることができます。
                ブランド名で検索しながら、気になるスタイルを探せます。
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/"
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white hover:text-black"
              >
                Homeへ戻る
              </Link>

              <Link
                href="/outfits"
                className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
              >
                自分のアーカイブへ
              </Link>
            </div>

            {!loading && (
              <div className="space-y-3 pt-2">
                <div className="w-full sm:max-w-md">
                  <input
                    type="text"
                    value={brandQuery}
                    onChange={(e) => setBrandQuery(e.target.value)}
                    placeholder="ブランド名で検索"
                    className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
                  />
                </div>

                <p className="text-sm text-white/45">{filteredOutfits.length}件表示</p>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              <div className="aspect-[4/5] w-full overflow-hidden bg-black">
                <img
                  src={
                    featuredOutfit?.image_url ||
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
                  }
                  alt={featuredOutfit?.title || "featured outfit"}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-3 p-6">
                <p className="text-sm tracking-[0.2em] text-white/40">FEATURED LOOK</p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  {loading ? "読み込み中..." : featuredOutfit?.title || "No Public Outfit"}
                </h2>
                <p className="text-white/70">{loading ? "..." : featuredOutfit?.brand || "-"}</p>

                {featuredOutfit && (
                  <Link
                    href={`/share/${featuredOutfit.share_id}`}
                    className="inline-block pt-2 text-sm text-white/60 transition hover:text-white"
                  >
                    共有ページを見る →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 mt-14 flex items-end justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-white/40">LOOKS</p>
            <h2 className="mt-2 text-2xl font-semibold">公開中のコーデ</h2>
          </div>
        </div>

        {loading ? (
          <p className="text-white/60">読み込み中...</p>
        ) : filteredOutfits.length === 0 ? (
          <p className="text-white/60">
            {brandQuery
              ? "該当するブランドの公開コーデがありません。"
              : "公開されているコーデはまだありません。"}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOutfits.map((outfit) => (
              <PublicOutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
