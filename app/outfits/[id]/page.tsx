"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import OutfitDetail from "@/components/outfits/OutfitDetail";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { deleteOutfit } from "@/features/outfits/usecases/delete-outfit";
import { getOutfit } from "@/features/outfits/usecases/get-outfit";

export default function OutfitDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const searchParams = useSearchParams();
  const outfit = getOutfit(params.id);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <Container>
        {!outfit ? (
          <EmptyState
            title="コーデが見つかりません"
            description="削除された可能性があります。"
            actionLabel="一覧へ戻る"
            actionHref="/outfits"
          />
        ) : (
          <OutfitDetail outfit={outfit} onDelete={() => setOpenConfirm(true)} />
        )}

        {outfit && openConfirm ? (
          <ConfirmDialog
            title="このコーデを削除しますか？"
            description="この操作は取り消せません。"
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => {
              deleteOutfit(outfit.id);
              router.push("/outfits?message=deleted");
            }}
          />
        ) : null}
        {searchParams.get("message") === "created" ? (
          <Toast message="コーデを登録しました" />
        ) : null}
        {searchParams.get("message") === "updated" ? (
          <Toast message="コーデを更新しました" />
        ) : null}
      </Container>
    </main>
  );
}
