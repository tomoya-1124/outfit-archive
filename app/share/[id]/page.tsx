import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const fallbackImage =
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await supabase
    .from("outfits")
    .select("*")
    .eq("share_id", id)
    .eq("is_public", true)
    .maybeSingle();

  if (!data) {
    return {
      title: "共有コーデが見つかりません",
      description: "この共有コーデは見つかりませんでした。",
    };
  }

  const title = `${data.title} | OUTFIT ARCHIVE`;
  const description =
    data.memo || `${data.brand} のコーデを OUTFIT ARCHIVE で共有中。`;
  const image = data.image_url || fallbackImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("outfits")
    .select("*")
    .eq("share_id", id)
    .eq("is_public", true)
    .maybeSingle();

  if (error) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl space-y-4">
          <p className="text-red-400">取得エラー</p>
          <pre className="whitespace-pre-wrap text-sm text-white/70">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black px-6 py-16 text-white">
        <div className="mx-auto max-w-2xl space-y-4">
          <p className="text-white/60">
            この共有コーデは見つかりませんでした。
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <img
            src={
              data.image_url ||
              "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80"
            }
            alt={data.title}
            className="w-full object-cover"
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm tracking-[0.2em] text-white/40">{data.date}</p>
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-white/70">{data.brand}</p>
          <p className="leading-7 text-white/75">{data.memo}</p>
        </div>
      </div>
    </main>
  );
}
