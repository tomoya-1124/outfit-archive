"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { initialOutfits, Outfit } from "@/lib/dummy-data";

export default function NewOutfitPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const savedOutfits = localStorage.getItem("outfits");
    const currentOutfits: Outfit[] = savedOutfits
      ? JSON.parse(savedOutfits)
      : initialOutfits;

    const newOutfit: Outfit = {
      id: crypto.randomUUID(),
      title,
      date,
      brand,
      imageUrl:
        imageUrl ||
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
      memo,
      createdAt: new Date().toISOString(),
    };

    const updatedOutfits = [newOutfit, ...currentOutfits];

    localStorage.setItem("outfits", JSON.stringify(updatedOutfits));

    router.push("/outfits");
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">NEW RECORD</p>
          <h1 className="text-4xl font-bold tracking-tight">新規コーデ登録</h1>
          <p className="text-white/60">
            まずはシンプルな形で記録できればOK。
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6"
        >
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm text-white/70">
              タイトル
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Black City Uniform"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="text-sm text-white/70">
              日付
            </label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="text-sm text-white/70">
              ブランド
            </label>
            <input
              id="brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="soerte"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="imageUrl" className="text-sm text-white/70">
              画像URL
            </label>
            <input
              id="imageUrl"
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="memo" className="text-sm text-white/70">
              メモ
            </label>
            <textarea
              id="memo"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="その日の気分や合わせ方メモ"
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 focus:border-white/30"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85"
          >
            登録する
          </button>
        </form>
      </section>
    </main>
  );
}