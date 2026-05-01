import { Outfit } from "@/types/outfit";

export const mockOutfits: Outfit[] = [
  {
    id: "1",
    title: "Monotone city walk",
    description: "Black coat + white tee + wide slacks",
    brand: "UNIQLO",
    season: "AUTUMN",
    tags: ["monotone", "casual"],
    visibility: "PUBLIC",
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-20T09:00:00.000Z",
    updatedAt: "2026-04-20T09:00:00.000Z",
  },
  {
    id: "2",
    title: "Weekend denim",
    description: "Denim jacket with neutral sneakers",
    brand: "GU",
    season: "SPRING",
    tags: ["denim", "weekend"],
    visibility: "PRIVATE",
    imageUrl:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    createdAt: "2026-04-18T09:00:00.000Z",
    updatedAt: "2026-04-18T09:00:00.000Z",
  },
];
