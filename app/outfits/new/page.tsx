"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewOutfitPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [brand, setBrand] = useState("");
  const [memo, setMemo] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("投稿するにはログインが必要です。");
      setUploading(false);
      router.push("/login");
      return;
    }

    let imageUrl = "";

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("outfit-images")
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error("画像アップロードエラー:", uploadError);
        alert("画像アップロードに失敗しました。");
        setUploading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("outfit-images")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("outfits").insert([
      {
        title,
        date,
        brand,
        image_url: imageUrl || null,
        memo,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error("登録エラー:", error);
      alert("登録に失敗しました。");
      setUploading(false);
      return;
    }

    setUploading(false);
    router.push("/outfits");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="mb-10 space-y-3">
          <p className="text-sm tracking-[0.3em] text-white/40">NEW RECORD</p>
          <h1 className="text-4xl font-bold tracking-tight">新規コーデ登録</h1>
          <p className="text-white/60">
            画像を直接アップロードして記録できます。
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
            <label htmlFor="imageFile" className="text-sm text-white/70">
              画像ファイル
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white file:mr-4 file:rounded-full file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
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

          <button
            type="submit"
            disabled={uploading}
            className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-85 disabled:opacity-50"
          >
            {uploading ? "アップロード中..." : "登録する"}
          </button>
        </form>
      </section>
    </main>
  );
}
