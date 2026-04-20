import type { Metadata } from "next";
import Link from "next/link";
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
      title: "共有コーデが見つかりません | OUTFIT ARCHIVE",
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
      <main className="min-h-screen bg-neutral-950 text-white">
        <header className="border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="text-xs tracking-[0.3em] text-white/80 sm:text-sm"
            >
              OUTFIT ARCHIVE
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm tracking-[0.3em] text-white/40">SHARE PAGE</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            読み込みに失敗しました
          </h1>
          <p className="mt-4 leading-7 text-white/65">
            共有コーデの取得中に問題が発生しました。
          </p>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-neutral-950 text-white">
        <header className="border-b border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
            <Link
              href="/"
              className="text-xs tracking-[0.3em] text-white/80 sm:text-sm"
            >
              OUTFIT ARCHIVE
            </Link>
          </div>
        </header>

        <section className="mx-auto max-w-2xl px-6 py-16 text-center">
          <p className="text-sm tracking-[0.3em] text-white/40">SHARE PAGE</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            この共有コーデは見つかりませんでした
          </h1>
          <p className="mt-4 leading-7 text-white/65">
            非公開に変更されたか、URLが正しくない可能性があります。
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-xs tracking-[0.3em] text-white/80 sm:text-sm"
          >
            OUTFIT ARCHIVE
          </Link>

          <p className="text-xs tracking-[0.2em] text-white/40">SHARED LOOK</p>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src={data.image_url || fallbackImage}
              alt={data.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm tracking-[0.2em] text-white/40">
                {data.date}
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {data.title}
              </h1>
              <p className="text-base text-white/70">{data.brand}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">メモ</p>
              <p className="mt-3 leading-7 text-white/75">
                {data.memo || "メモはありません。"}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">About</p>
              <p className="mt-3 leading-7 text-white/65">
                このページは OUTFIT ARCHIVE で共有されたコーデです。
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
