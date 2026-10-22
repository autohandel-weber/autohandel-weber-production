import { describe, expect, it } from "vitest";
import { cartLineSchema, priceCart } from "./order-schema";

describe("cart pricing", () => {
  it("adds CHF 15 shipping by post", () => expect(priceCart([{ id: "fahrzeuge_autos:1", qty: 1, chrome: false, size: "20 cm", color: "Rot" }])?.total).toBe(95));
  it("adds CHF 30 per piece for chrome or gold foil", () => expect(priceCart([{ id: "tiere_hund:1", qty: 2, chrome: true, size: "20 cm", color: "Rot" }])?.subtotal).toBe(120));
  it("rejects unknown motifs", () => expect(priceCart([{ id: "fake:1", qty: 1, chrome: false, size: "20 cm", color: "Rot" }])).toBeNull());
  it("requires a size", () => expect(cartLineSchema.safeParse({ id: "tiere_hund:1", qty: 1, chrome: false, size: " ", color: "Rot" }).success).toBe(false));
  it("requires a colour", () => expect(cartLineSchema.safeParse({ id: "tiere_hund:1", qty: 1, chrome: false, size: "20 cm", color: "" }).success).toBe(false));
});
