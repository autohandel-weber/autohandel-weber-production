import { describe, expect, it } from "vitest";
import { priceRange, SHOP, SHIPPING } from "./shop-data";
const find = (n: string) => SHOP.flatMap((g) => g.items).find((i) => i.name === n)!;
describe("shop catalogue", () => {
  it("contains all 227 motifs of the old shop", () => expect(SHOP.flatMap((g) => g.items).reduce((s, i) => s + i.motifs.length, 0)).toBe(227));
  it("car stickers cost 80", () => expect(priceRange(find("Autos").motifs)).toBe("80.–"));
  it("dragons cost 30 to 40", () => expect(priceRange(find("Dragons").motifs)).toBe("30.– bis 40.–"));
  it("shipping is 15 by post and 18 cash on delivery", () => expect(SHIPPING).toEqual({ post: "15.–", cod: "18.–" }));
});
