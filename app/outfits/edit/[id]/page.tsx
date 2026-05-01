"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Outfit } from "@/lib/dummy-data";
import { supabase } from "@/lib/supabase";

export default function EditOutfitPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [brand, setBrand] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [memo, setMemo] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOutfit = async () => {
      const { data, error } = await supabase.from("outfits").select("*").eq("id", id).single();

      if (error || !data) {
        alert("対象のコーデが見つかりませんでした。");
        router.push("/outfits");
        return;
      }

      const outfit: Outfit = data;
      setTitle(outfit.title);
      setDate(outfit.date);
      setBrand(outfit.brand);
      setImageUrl(outfit.image_url || "");
      setMemo(outfit.memo || "");
      setTags(outfit.tags || "");
      setLoading(false);
    };

    fetchOutfit();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from("outfits")
      .update({
        title,
        date,
        brand,
        image_url: imageUrl,
        memo,
        tags,
      })
      .eq("id", id);

    if (error) {
      console.error("更新エラー:", error);
      alert("更新に失敗しました。");
      return;
    }

    router.push(`/outfits/${id}`);
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <section className="mx-auto max-w-3xl px-6 py-16">
          <p>読み込み中...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">EDIT RECORD</p>
          <h1 className="text-4xl font-bold tracking-tight">コーデ編集</h1>
          <p className="text-white/60">登録済みの内容を更新します。</p>
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
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
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
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="tags" className="text-sm text-white/70">
              タグ
            </label>
            <input
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="street, black, summer"
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-white/30"
            />
            <p className="text-xs text-white/40">カンマ区切りで入力（例: street, black, summer）</p>
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
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
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
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-white/30"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85"
            >
              更新する
            </button>
            <button
              type="button"
              onClick={() => router.push(`/outfits/${id}`)}
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/10"
            >
              キャンセル
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
