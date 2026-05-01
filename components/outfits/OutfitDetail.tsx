import Link from "next/link";
import { Outfit } from "@/types/outfit";
import Button from "@/components/ui/Button";

export default function OutfitDetail({
  outfit,
  canEdit,
  canDelete,
  onDelete,
}: {
  outfit: Outfit;
  canEdit: boolean;
  canDelete: boolean;
  onDelete: () => void;
}) {
  return (
    <section className="mx-auto max-w-3xl space-y-5">
      <img
        src={outfit.imageUrl}
        alt={outfit.title}
        className="h-96 w-full rounded-2xl object-cover"
      />
      <h1 className="text-3xl font-bold">{outfit.title}</h1>
      <p className="text-white/70">{outfit.description || "説明は未入力です。"}</p>
      <p>
        {outfit.brand} / {outfit.season} / {outfit.visibility}
      </p>
      <p className="text-sm text-white/60">
        tags: {outfit.tags.length > 0 ? outfit.tags.join(", ") : "なし"}
      </p>
      <div className="flex gap-3">
        {canEdit ? (
          <Link
            href={`/outfits/${outfit.id}/edit`}
            className="rounded-full border border-white/20 px-4 py-2 text-sm"
          >
            編集
          </Link>
        ) : null}
        {canDelete ? (
          <Button variant="danger" onClick={onDelete}>
            削除
          </Button>
        ) : null}
      </div>
    </section>
  );
}
