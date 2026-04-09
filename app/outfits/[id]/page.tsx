"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { initialOutfits, Outfit } from "@/lib/dummy-data";

export default function OutfitDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [outfit, setOutfit] = useState<Outfit | null>(null);

  useEffect(() => {
    const savedOutfits = localStorage.getItem("outfits");

    if (savedOutfits) {
      const parsedOutfits: Outfit[] = JSON.parse(savedOutfits);
      const foundOutfit = parsedOutfits.find((item) => item.id === id);
      setOutfit(foundOutfit || null);
    } else {
      const foundOutfit = initialOutfits.find((item) => item.id === id);
      setOutfit(foundOutfit || null);
    }
  }, [id]);

  if (!outfit) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto max-w-6xl px-6 py-16">
          <Link
            href="/outfits"
            className="text-sm text-white/50 hover:text-white"
          >
            ← 一覧へ戻る
          </Link>
          <p className="mt-8 text-white/70">コーデが見つかりませんでした。</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Link
          href="/outfits"
          className="text-sm text-white/50 hover:text-white"
        >
          ← 一覧へ戻る
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={outfit.imageUrl}
              alt={outfit.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm tracking-[0.2em] text-white/40">
                {outfit.date}
              </p>
              <h1 className="mt-3 text-4xl font-bold">{outfit.title}</h1>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/45">ブランド</p>
                <p className="mt-2 text-lg font-medium">{outfit.brand}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-white/45">作成日時</p>
                <p className="mt-2 text-lg font-medium">{outfit.createdAt}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">メモ</p>
              <p className="mt-3 leading-7 text-white/75">{outfit.memo}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
