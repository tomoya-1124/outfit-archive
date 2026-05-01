import { OutfitRepository } from "@/features/outfits/repositories/outfit-repository";
import { createOutfitRepository } from "@/lib/services/repository-factory";

const repository: OutfitRepository = createOutfitRepository();

export const outfitService = repository;
