import { describe, expect, it } from "vitest";
import { priceFrom, SHOP, SHIPPING } from "./shop-data";
const find = (n: string) => SHOP.flatMap((g) => g.items).find((i) => i.name === n)!;
describe("shop catalogue", () => {
  it("contains all 227 motifs of the old shop", () => expect(SHOP.flatMap((g) => g.items).reduce((s, i) => s + i.motifs.length, 0)).toBe(227));
  it("car stickers start at CHF 80", () => expect(priceFrom(find("Autos").motifs)).toBe(80));
  it("dragons start at CHF 30", () => expect(priceFrom(find("Dragons").motifs)).toBe(30));
  it("shipping is 15 by post and 18 cash on delivery", () => expect(SHIPPING).toEqual({ post: "15.–", cod: "18.–" }));
});
