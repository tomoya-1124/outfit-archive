"use client";

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import OutfitDetail from "@/components/outfits/OutfitDetail";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Container from "@/components/ui/Container";
import ErrorState from "@/components/ui/ErrorState";
import EmptyState from "@/components/ui/EmptyState";
import Toast from "@/components/ui/Toast";
import { canDeleteOutfit, canViewOutfit } from "@/features/outfits/policies/outfit-policy";
import { deleteOutfit } from "@/features/outfits/usecases/delete-outfit";
import { getOutfit } from "@/features/outfits/usecases/get-outfit";
import { getCurrentUser } from "@/lib/auth/current-user";
import { toErrorMessage } from "@/lib/api/errors";

export default function OutfitDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const outfit = getOutfit(params.id);
  const user = getCurrentUser();
  const canView = outfit ? canViewOutfit(user, outfit) : false;
  const canDelete = outfit ? canDeleteOutfit(user, outfit) : false;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <Container>
        {!outfit || !canView ? (
          <EmptyState
            title="コーデが見つかりません"
            description="削除された可能性があります。"
            actionLabel="一覧へ戻る"
            actionHref="/outfits"
          />
        ) : (
          <OutfitDetail
            outfit={outfit}
            canEdit={canDelete}
            canDelete={canDelete}
            onDelete={() => setOpenConfirm(true)}
          />
        )}

        {outfit && canDelete && openConfirm ? (
          <ConfirmDialog
            title="このコーデを削除しますか？"
            description="この操作は取り消せません。"
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => {
              try {
                deleteOutfit(outfit.id);
                router.push("/outfits?message=deleted");
              } catch (e) {
                setError(toErrorMessage(e));
                setOpenConfirm(false);
              }
            }}
          />
        ) : null}
        {error ? <ErrorState message={error} /> : null}
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
