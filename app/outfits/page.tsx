"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import OutfitCard from "@/components/outfits/OutfitCard";
import { outfitService } from "@/lib/services/outfit-service";

export default function OutfitsPage() {
  const [query, setQuery] = useState("");
  const outfits = useMemo(() => outfitService.list({ query }), [query]);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">コーデ一覧</h1>
          <Link href="/outfits/new" className="rounded-full bg-white px-4 py-2 text-sm text-black">
            新規登録
          </Link>
        </div>
        <input
          className="mb-6 w-full rounded border border-white/10 bg-white/5 p-3"
          placeholder="検索（タイトル・説明・タグ）"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      </section>
    </main>
  );
}
