import { describe, expect, it } from "vitest";
import { priceCart } from "./order-schema";

describe("cart pricing", () => {
  it("adds CHF 15 shipping by post", () => expect(priceCart([{ id: "fahrzeuge_autos:1", qty: 1, chrome: false }])?.total).toBe(95));
  it("adds CHF 30 per piece for chrome or gold foil", () => expect(priceCart([{ id: "tiere_hund:1", qty: 2, chrome: true }])?.subtotal).toBe(120));
  it("rejects unknown motifs", () => expect(priceCart([{ id: "fake:1", qty: 1, chrome: false }])).toBeNull());
});
