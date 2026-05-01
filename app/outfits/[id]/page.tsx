"use client";

import { useParams, useRouter } from "next/navigation";
import OutfitDetail from "@/components/outfits/OutfitDetail";
import Container from "@/components/ui/Container";
import EmptyState from "@/components/ui/EmptyState";
import { outfitService } from "@/lib/services/outfit-service";

export default function OutfitDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const outfit = outfitService.findById(params.id);

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
          <OutfitDetail
            outfit={outfit}
            onDelete={() => {
              outfitService.remove(outfit.id);
              router.push("/outfits");
            }}
          />
        )}
      </Container>
    </main>
  );
}
