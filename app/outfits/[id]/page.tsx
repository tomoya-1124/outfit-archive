"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Outfit } from "@/lib/dummy-data";
import { supabase } from "@/lib/supabase";

export default function OutfitDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [outfit, setOutfit] = useState<Outfit | null>(null);

  useEffect(() => {
    const fetchOutfit = async () => {
      const { data, error } = await supabase
        .from("outfits")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("詳細取得エラー:", error);
        setOutfit(null);
      } else {
        setOutfit(data);
      }
    };

    fetchOutfit();
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

  const shareUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/share/${outfit.share_id}`;

  const handleDelete = async () => {
    const confirmed = window.confirm("このコーデを削除しますか？");
    if (!confirmed) return;

    const { error } = await supabase.from("outfits").delete().eq("id", id);

    if (error) {
      console.error("削除エラー:", error);
      alert("削除に失敗しました。");
      return;
    }

    router.push("/outfits");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-center justify-between">
          <Link
            href="/outfits"
            className="text-sm text-white/50 hover:text-white"
          >
            ← 一覧へ戻る
          </Link>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={async () => {
                const { error } = await supabase
                  .from("outfits")
                  .update({ is_public: !outfit.is_public })
                  .eq("id", outfit.id);

                if (error) {
                  console.error("公開設定更新エラー:", error);
                  alert("公開設定の更新に失敗しました。");
                  return;
                }

                setOutfit({ ...outfit, is_public: !outfit.is_public });
              }}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              {outfit.is_public ? "非公開にする" : "公開にする"}
            </button>

            {outfit.is_public && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  alert("共有URLをコピーしました。");
                }}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
              >
                共有URLコピー
              </button>
            )}

            <button
              onClick={() => router.push(`/outfits/edit/${id}`)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/10"
            >
              編集する
            </button>

            <button
              onClick={handleDelete}
              className="rounded-full border border-red-400/30 px-4 py-2 text-sm text-red-300 transition hover:bg-red-400/10"
            >
              削除する
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={
                outfit.image_url ||
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
              }
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
                <p className="mt-2 text-lg font-medium">
                  {new Date(outfit.created_at).toLocaleDateString("ja-JP")}
                </p>
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
