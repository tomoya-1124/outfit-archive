"use client";

import { useParams, useRouter } from "next/navigation";
import OutfitForm from "@/components/outfits/OutfitForm";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { canEditOutfit } from "@/features/outfits/policies/outfit-policy";
import { getOutfit } from "@/features/outfits/usecases/get-outfit";
import { getCurrentUser } from "@/lib/auth/current-user";
import { updateOutfit } from "@/features/outfits/usecases/update-outfit";

export default function EditOutfitPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const outfit = getOutfit(params.id);
  const user = getCurrentUser();
  const canEdit = outfit ? canEditOutfit(user, outfit) : false;

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-12 text-white">
      <Container>
        {!outfit || !canEdit ? (
          <EmptyState
            title="編集対象が見つかりません"
            description="対象コーデが存在しないため、編集できません。"
            actionLabel="一覧へ戻る"
            actionHref="/outfits"
          />
        ) : (
          <section className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-3xl font-bold">編集</h1>
            <OutfitForm
              initial={outfit}
              onSubmit={(input) => {
                updateOutfit(outfit.id, input);
                router.push(`/outfits/${outfit.id}?message=updated`);
              }}
            />
          </section>
        )}
      </Container>
    </main>
  );
}
