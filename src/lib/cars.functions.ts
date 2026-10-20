import { createServerFn } from "@tanstack/react-start";
import { parseHciHtml, type Car } from "./parse-hci";
import fallback from "@/data/cars.json";

const HCI_URL = "https://www.autoscout24.ch/de/hci/v2/4250/search";
let cache: { at: number; cars: Car[] } | null = null;

// Liest die aktuellen Inserate live von AutoScout24 (Händler 4250), 10 Min. Cache.
export const getCars = createServerFn({ method: "GET" }).handler(async () => {
  if (cache && Date.now() - cache.at < 10 * 60 * 1000) return { cars: cache.cars, live: true };
  try {
    const res = await fetch(HCI_URL, { headers: { "User-Agent": "Mozilla/5.0 (WeberWebsite)" } });
    if (!res.ok) throw new Error(`AutoScout24 ${res.status}`);
    const cars = parseHciHtml(await res.text());
    if (!cars.length) throw new Error("Keine Inserate gefunden");
    cache = { at: Date.now(), cars };
    return { cars, live: true };
  } catch (e) {
    console.error("AutoScout24 sync failed", e);
    return { cars: (cache?.cars ?? fallback) as Car[], live: false };
  }
});
