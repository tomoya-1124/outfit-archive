"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import OutfitCard from "@/components/outfits/OutfitCard";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { listOutfits } from "@/features/outfits/usecases/list-outfits";
import { OutfitVisibility, Season } from "@/types/outfit";

export default function OutfitsPage() {
  const [query, setQuery] = useState("");
  const [season, setSeason] = useState<Season | "ALL">("ALL");
  const [visibility, setVisibility] = useState<OutfitVisibility | "ALL">("ALL");
  const params = useSearchParams();

  const outfits = useMemo(
    () => listOutfits({ query, season, visibility }),
    [query, season, visibility],
  );

  const message = params.get("message");

  return (
    <main className="min-h-screen bg-neutral-950 py-12 text-white">
      <Container>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-bold">コーデ一覧</h1>
          <Link href="/outfits/new" className="rounded-full bg-white px-4 py-2 text-sm text-black">
            新規登録
          </Link>
        </div>

        <div className="mb-6 grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-3">
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
