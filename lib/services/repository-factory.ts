import { ApiOutfitRepository } from "@/features/outfits/repositories/api-outfit-repository";
import { LocalOutfitRepository } from "@/features/outfits/repositories/local-outfit-repository";
import { OutfitRepository } from "@/features/outfits/repositories/outfit-repository";
import { ApiClient } from "@/lib/api/client";

export const createOutfitRepository = (): OutfitRepository => {
  const dataSource = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "local";

  if (dataSource === "api") {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";
    return new ApiOutfitRepository(new ApiClient(baseUrl));
  }

  return new LocalOutfitRepository();
};
