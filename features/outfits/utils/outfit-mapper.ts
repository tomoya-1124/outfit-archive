import { OutfitResponseDto } from "@/types/outfit-dto";
import { Outfit } from "@/types/outfit";

export const toOutfit = (dto: OutfitResponseDto): Outfit => ({
  id: dto.id,
  title: dto.title,
  description: dto.description,
  brand: dto.brand,
  season: dto.season,
  tags: dto.tags,
  visibility: dto.visibility,
  imageUrl: dto.image_url,
  createdAt: dto.created_at,
  updatedAt: dto.updated_at,
});

export const toOutfitDto = (outfit: Outfit): OutfitResponseDto => ({
  id: outfit.id,
  title: outfit.title,
  description: outfit.description,
  brand: outfit.brand,
  season: outfit.season,
  tags: outfit.tags,
  visibility: outfit.visibility,
  image_url: outfit.imageUrl,
  created_at: outfit.createdAt,
  updated_at: outfit.updatedAt,
});
