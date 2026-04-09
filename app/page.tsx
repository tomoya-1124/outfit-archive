"use client";

import { useEffect, useState } from "react";
import OutfitCard from "@/components/OutfitCard";
import { initialOutfits, Outfit } from "@/lib/dummy-data";

export default function OutfitsPage() {
  const [outfits, setOutfits] = useState<Outfit[]>([]);

  useEffect(() => {
    const savedOutfits = localStorage.getItem("outfits");

    if (savedOutfits) {
      setOutfits(JSON.parse(savedOutfits));
    } else {
      setOutfits(initialOutfits);
      localStorage.setItem("outfits", JSON.stringify(initialOutfits));
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">ARCHIVE</p>
          <h1 className="text-4xl font-bold tracking-tight">Outfits</h1>
          <p className="text-white/60">
            記録したコーデを一覧で確認できます。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {outfits.map((outfit) => (
            <OutfitCard key={outfit.id} outfit={outfit} />
          ))}
        </div>
      </section>
    </main>
  );
}