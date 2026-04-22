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
    return outfits.filter((outfit) =>
      outfit.brand.toLowerCase().includes(brandQuery.toLowerCase()),
    );
  }, [outfits, brandQuery]);

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

        {!loading && (
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-sm">
              <input
                type="text"
                value={brandQuery}
                onChange={(e) => setBrandQuery(e.target.value)}
                placeholder="ブランド名で検索"
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-white/30"
              />
            </div>

            <p className="text-sm text-white/45">
              {filteredOutfits.length}件表示
            </p>
          </div>
        )}

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
