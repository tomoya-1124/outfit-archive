"use client";

import { useEffect, useMemo, useState } from "react";
import OutfitCard from "@/components/OutfitCard";
import { Outfit } from "@/lib/dummy-data";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [brandQuery, setBrandQuery] = useState("");

  useEffect(() => {
    const fetchOutfits = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsLoggedIn(false);
        setOutfits([]);
        setLoading(false);
        return;
      }

      setIsLoggedIn(true);

      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("一覧取得エラー:", error);
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
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">ARCHIVE</p>
          <h1 className="text-4xl font-bold tracking-tight">Outfits</h1>
          <p className="text-white/60">記録したコーデを一覧で確認できます。</p>
        </div>

        {!loading && isLoggedIn && (
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
        ) : !isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-white/60">一覧を見るにはログインが必要です。</p>
            <Link
              href="/login"
              className="inline-block rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85"
            >
              ログインへ
            </Link>
          </div>
        ) : filteredOutfits.length === 0 ? (
          <p className="text-white/60">
            {brandQuery
              ? "該当するブランドのコーデがありません。"
              : "まだコーデがありません。"}
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredOutfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
