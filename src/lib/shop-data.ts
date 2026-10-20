// Aufkleber-Katalog vom bisherigen Online-Shop (Preise in CHF pro Stück).
import items from "@/data/shop-items.json";

const images = import.meta.glob<string>("/src/assets/images/shop/*.webp", { eager: true, import: "default" });
const img = (file: string): string => images[`/src/assets/images/shop/${file}`] ?? "";

export type ShopImage = { src: string; width: number; height: number };
export type Motif = ShopImage & { id: string; name: string; price: number };
type RawItem = { name: string; price: number; file: string; w: number; h: number };
const raw = items as Record<string, RawItem[]>;

const motifs = (key: string): Motif[] =>
  (raw[key] ?? []).map((i, index) => ({ id: `${key}:${index + 1}`, name: i.name, price: i.price, src: img(i.file), width: i.w, height: i.h }));

/** "30.–" oder "30.– bis 40.–" aus allen Motiven einer Kategorie. */
export function priceRange(list: Motif[]): string {
  const prices = list.map((m) => m.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `${min}.–` : `${min}.– bis ${max}.–`;
}

const cat = (name: string, key: string, note: string) => ({ name, note, motifs: motifs(key) });

/** Looks up a motif by id ("kategorie:nummer") with its catalogue price – the only trusted price source. */
export function findMotif(id: string): { id: string; name: string; price: number; category: string } | null {
  const [key, n] = id.split(":");
  const item = raw[key ?? ""]?.[Number(n) - 1];
  if (!item || !/^\d+$/.test(n ?? "")) return null;
  const category = SHOP.flatMap((g) => g.items).find((i) => i.motifs[0]?.id.startsWith(`${key}:`))?.name ?? key!;
  return { id, name: item.name, price: item.price, category };
}

export const SHOP = [
  {
    group: "Fahrzeuge",
    subtitle: "Fahrzeug-Silhouetten als Aufkleber",
    items: [
      cat("Autos", "fahrzeuge_autos", "Porsche, AC Cobra, Jaguar E-Type, Corvette und viele mehr"),
      cat("Motorräder", "fahrzeuge_motorraeder", "Bikes, Chopper, Motocross, Trike"),
      cat("Flugzeuge", "fahrzeuge_flugzeuge", "Helikopter, Jumbo, Concorde"),
      cat("Lastwagen", "fahrzeuge_lastwagen", "Verschiedene Lastwagen-Motive"),
      cat("Schiffe", "fahrzeuge_schiffe", "Boote"),
      cat("Formel 1", "fahrzeuge_formel1", "Ferrari, Mercedes, Tyrrell"),
      cat("Go-Karts", "fahrzeuge_gokarts", "Kart-Motive"),
    ],
  },
  {
    group: "Tiere",
    subtitle: "Tiermotive für Auto, Anhänger oder Wand",
    items: [
      cat("Hunde", "tiere_hund", "Verschiedene Hunde-Motive"),
      cat("Pferde", "tiere_pferd", "Verschiedene Pferde-Motive"),
      cat("Diverse Tiere", "tiere_diverse", "Wolf, Tiger, Delfin, Adler, Skorpion"),
    ],
  },
  {
    group: "Dekor",
    subtitle: "Comics, Tribals, Logos und mehr",
    items: [
      cat("Comic", "decor_comic", "Tazmania, Spiderman, Caveman"),
      cat("Tribals", "decor_tribals", "Tribals, Sterne, Pfeile"),
      cat("Car-Logos", "decor_carlogos", "Alfa Romeo, Audi, BMW und viele mehr"),
      cat("Dragons", "decor_dragons", "Drachen – ideal für Heckscheibe oder Karosserie"),
      cat("Diverse", "decor_diverse", "Augen, Spinne, Yin Yang, Elvis"),
    ],
  },
  {
    group: "Schriften",
    subtitle: "Schriftzüge und Verkaufsschilder",
    items: [cat("Schriftzüge & Schilder", "schriften_diverse", "Vtec, No Fear, Racing, Preisschilder, Allrad, Diesel, Klima")],
  },
];

export const DIGITALDRUCK: ShopImage[] = [1, 2, 3, 4].map((n) => ({ src: img(`digitaldruck-${n}.webp`), width: 93, height: 93 }));
export const FOLIENFARBEN: ShopImage = { src: img("folienfarben.webp"), width: 300, height: 173 };
export const CHROME_SURCHARGE = "30.–";
export const SHIPPING = { post: "15.–", cod: "18.–" };
