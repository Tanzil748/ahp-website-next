export const PAGE_SIZE = 12;

export const DISPLAY_BRANDS = [
  "Fragrance World",
  "French Avenue",
  "Lattafa",
  "Maison",
];

export const normalizeGender = (g: string | undefined): string => {
  if (!g) return "";
  const t = g.trim();
  return t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();
};

export const normalizeBrand = (brand: string): string => {
  const b = brand.toLowerCase().trim();
  if (b.includes("lattafa") || b.includes("maison alhambra")) return "Lattafa";
  if (b.includes("french avenue")) return "French Avenue";
  if (b.includes("fragrance world")) return "Fragrance World";
  if (b.includes("maison")) return "Maison";
  return brand;
};

export type Product = {
  _id: string;
  itemName: string;
  brand: string;
  gender: string;
  sku: string;
  salesDescription: string;
  stockOnHand: number;
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  imageUrl?: string | null;
};

export const parseNotes = (p: Product): string[] =>
  [
    ...new Set(
      [p.topNotes, p.middleNotes, p.baseNotes]
        .join(",")
        .split(",")
        .map((n) => n.trim())
        .filter(Boolean),
    ),
  ].slice(0, 4);
