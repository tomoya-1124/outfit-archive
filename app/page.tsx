"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OutfitCard from "@/components/OutfitCard";
import { Outfit } from "@/lib/dummy-data";
import { supabase } from "@/lib/supabase";

export default function HomePage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfits = async () => {
      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("トップページ取得エラー:", error);
      } else {
        setOutfits(data || []);
      }

      setLoading(false);
    };

    fetchOutfits();
  }, []);

  const recentOutfits = outfits.slice(0, 2);
  const latestOutfit = outfits[0];

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-14 max-w-3xl space-y-6">
          <p className="text-sm tracking-[0.3em] text-white/40">
            PERSONAL FASHION LOG
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            OUTFIT ARCHIVE
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            日々のコーデを静かに蓄積していく、自分用のアーカイブ。
            見せるためというより、残すための服ログ。
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/outfits"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white hover:text-black"
            >
              コーデ一覧を見る
            </Link>
            <Link
              href="/outfits/new"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85"
            >
              新しく記録する
            </Link>
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/45">総コーデ数</p>
            <p className="mt-2 text-3xl font-semibold">
              {loading ? "..." : outfits.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/45">最新ブランド</p>
            <p className="mt-2 text-3xl font-semibold">
              {loading ? "..." : latestOutfit?.brand || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-white/45">最新投稿日</p>
            <p className="mt-2 text-3xl font-semibold">
              {loading ? "..." : latestOutfit?.date || "-"}
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm tracking-[0.2em] text-white/40">RECENT</p>
            <h2 className="mt-2 text-2xl font-semibold">最近の記録</h2>
          </div>
          <Link
            href="/outfits"
            className="text-sm text-white/60 hover:text-white"
          >
            すべて見る →
          </Link>
        </div>

        {loading ? (
          <p className="text-white/60">読み込み中...</p>
        ) : recentOutfits.length === 0 ? (
          <p className="text-white/60">まだコーデがありません。</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
