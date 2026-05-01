"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import { Outfit, OutfitInput, Season } from "@/types/outfit";

const seasons: Season[] = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];

export default function OutfitForm({
  initial,
  onSubmit,
}: {
  initial?: Outfit;
  onSubmit: (input: OutfitInput) => void;
}) {
  const [form, setForm] = useState<OutfitInput>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    brand: initial?.brand ?? "",
    season: initial?.season ?? "SPRING",
    tags: initial?.tags ?? [],
    visibility: initial?.visibility ?? "PRIVATE",
    imageUrl: initial?.imageUrl ?? "",
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="w-full rounded border bg-white/5 p-3"
          placeholder="タイトル"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          className="w-full rounded border bg-white/5 p-3"
          placeholder="ブランド"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          required
        />
      </div>

      <textarea
        className="w-full rounded border bg-white/5 p-3"
        placeholder="説明"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      <input
        className="w-full rounded border bg-white/5 p-3"
        placeholder="画像URL"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
        required
      />

      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="w-full rounded border bg-neutral-900 p-3"
          value={form.season}
          onChange={(e) => setForm({ ...form, season: e.target.value as Season })}
        >
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </select>

        <select
          className="w-full rounded border bg-neutral-900 p-3"
          value={form.visibility}
          onChange={(e) => setForm({ ...form, visibility: e.target.value as "PUBLIC" | "PRIVATE" })}
        >
          <option value="PRIVATE">PRIVATE</option>
          <option value="PUBLIC">PUBLIC</option>
        </select>
      </div>

      <input
        className="w-full rounded border bg-white/5 p-3"
        placeholder="タグ（カンマ区切り）"
        value={form.tags.join(",")}
        onChange={(e) =>
          setForm({
            ...form,
            tags: e.target.value
              .split(",")
              .map((v) => v.trim())
              .filter(Boolean),
          })
        }
      />

      <Button type="submit">保存</Button>
    </form>
  );
}
