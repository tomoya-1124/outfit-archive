import { LocalOutfitRepository } from "@/features/outfits/repositories/local-outfit-repository";
import { OutfitRepository } from "@/features/outfits/repositories/outfit-repository";

const repository: OutfitRepository = new LocalOutfitRepository();

export const outfitService = repository;
