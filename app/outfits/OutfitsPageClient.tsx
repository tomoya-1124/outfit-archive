"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import OutfitCard from "@/components/outfits/OutfitCard";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { listOutfits } from "@/features/outfits/usecases/list-outfits";
import { OutfitVisibility, Season } from "@/types/outfit";

const readSeason = (value: string | null): Season | "ALL" => {
  if (value === "SPRING" || value === "SUMMER" || value === "AUTUMN" || value === "WINTER") {
    return value;
  }
  return "ALL";
};

const readVisibility = (value: string | null): OutfitVisibility | "ALL" => {
  if (value === "PUBLIC" || value === "PRIVATE") return value;
  return "ALL";
};

type OutfitsPageClientProps = {
  initialQuery: string;
  initialSeason: string;
  initialVisibility: string;
  initialMessage?: string;
};

export default function OutfitsPageClient({
  initialQuery,
  initialSeason,
  initialVisibility,
  initialMessage,
}: OutfitsPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery);
  const [season, setSeason] = useState<Season | "ALL">(readSeason(initialSeason));
  const [visibility, setVisibility] = useState<OutfitVisibility | "ALL">(
    readVisibility(initialVisibility),
  );

  useEffect(() => {
    const next = new URLSearchParams();

    if (query) next.set("q", query);
    else next.delete("q");

    if (season !== "ALL") next.set("season", season);
    else next.delete("season");

    if (visibility !== "ALL") next.set("visibility", visibility);
    else next.delete("visibility");

    const queryString = next.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, [query, season, visibility, router, pathname]);

  const outfits = useMemo(
    () => listOutfits({ query, season, visibility }),
    [query, season, visibility],
  );

  const message = initialMessage;
  const publicCount = outfits.filter((outfit) => outfit.visibility === "PUBLIC").length;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#334155_0,_#111827_34%,_#0a0a0a_70%)] py-12 text-white">
      <Container>
        <section className="mb-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/20 backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
                Outfit archive
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">コーデ一覧</h1>
              <p className="mt-4 text-sm leading-7 text-white/65 md:text-base">
                今日の気分に合わせて、季節・公開状態・キーワードから保存済みコーデを探せます。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:min-w-72">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-white/45">表示中</p>
                <p className="mt-1 text-3xl font-bold">{outfits.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-white/45">PUBLIC</p>
                <p className="mt-1 text-3xl font-bold">{publicCount}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/outfits/new"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white/85"
            >
              新規登録
            </Link>
            <a
              href="#outfit-grid"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10"
            >
              一覧を見る
            </a>
          </div>
        </section>

        <div className="mb-6 grid gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-xl shadow-black/10 backdrop-blur md:grid-cols-3">
          <input
            className="w-full rounded border border-white/10 bg-neutral-900 p-3"
            placeholder="検索（タイトル・説明・タグ）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            className="rounded border border-white/10 bg-neutral-900 p-3"
            value={season}
            onChange={(e) => setSeason(e.target.value as Season | "ALL")}
          >
            <option value="ALL">Season: ALL</option>
            <option value="SPRING">SPRING</option>
            <option value="SUMMER">SUMMER</option>
            <option value="AUTUMN">AUTUMN</option>
            <option value="WINTER">WINTER</option>
          </select>
          <select
            className="rounded border border-white/10 bg-neutral-900 p-3"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as OutfitVisibility | "ALL")}
          >
            <option value="ALL">Visibility: ALL</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
        </div>

        {outfits.length === 0 ? (
          <EmptyState
            title="コーデが見つかりません"
            description="検索条件を変えるか、新しいコーデを登録してください。"
            actionLabel="新規登録"
            actionHref="/outfits/new"
          />
        ) : (
          <div id="outfit-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {outfits.map((outfit) => (
              <OutfitCard key={outfit.id} outfit={outfit} />
            ))}
          </div>
        )}

        {message === "deleted" ? <Toast message="コーデを削除しました" /> : null}
      </Container>
    </main>
  );
}
