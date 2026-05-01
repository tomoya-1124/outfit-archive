export type Season = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";
export type OutfitVisibility = "PUBLIC" | "PRIVATE";

export type Outfit = {
  id: string;
  title: string;
  description: string;
  brand: string;
  season: Season;
  tags: string[];
  visibility: OutfitVisibility;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type OutfitInput = Omit<Outfit, "id" | "createdAt" | "updatedAt">;

export type OutfitFilter = {
  query?: string;
  brand?: string;
  season?: Season | "ALL";
  visibility?: OutfitVisibility | "ALL";
  tag?: string;
};
