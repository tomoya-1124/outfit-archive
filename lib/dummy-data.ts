export type Outfit = {
  id: string;
  title: string;
  date: string;
  brand: string;
  imageUrl: string;
  memo: string;
  createdAt: string;
};

export const initialOutfits: Outfit[] = [
  {
    id: "1",
    title: "Black City Uniform",
    date: "2026-04-08",
    brand: "soerte",
    imageUrl:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    memo: "黒ベースでまとめた通勤コーデ。静かなモード寄り。",
    createdAt: "2026-04-08T09:00:00",
  },
  {
    id: "2",
    title: "Grey Light Mood",
    date: "2026-04-07",
    brand: "COS",
    imageUrl:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80",
    memo: "ライトグレー中心。少し力の抜けたきれいめ。",
    createdAt: "2026-04-07T09:00:00",
  },
  {
    id: "3",
    title: "Office Minimal Black",
    date: "2026-04-06",
    brand: "UNIQLO C",
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80",
    memo: "仕事向けにシンプルにまとめた黒コーデ。",
    createdAt: "2026-04-06T09:00:00",
  },
];