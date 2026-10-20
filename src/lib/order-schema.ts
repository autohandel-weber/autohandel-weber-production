import { z } from "zod";
import { findMotif } from "./shop-data";

/** Versandkosten per Post in CHF (aus dem bisherigen Shop). */
export const SHIPPING_CHF = 15;
/** Zuschlag pro Stück für Chrom- oder Goldfolie in CHF. */
export const CHROME_CHF = 30;
export const PAYMENT_METHODS = { twint: "TWINT", einzahlungsschein: "Einzahlungsschein (Rechnung)" } as const;

export const cartLineSchema = z.object({
  id: z.string().max(60),
  qty: z.number().int().min(1).max(50),
  chrome: z.boolean(),
});
export type CartLine = z.infer<typeof cartLineSchema>;

const text = (max: number) => z.string().trim().max(max);
export const orderSchema = z.object({
  name: text(100).min(1, "Bitte geben Sie Ihren Namen an."),
  email: text(255).email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: text(40).regex(/^[+\d\s()./-]*$/, "Bitte prüfen Sie Ihre Telefonnummer."),
  street: text(200).min(1, "Bitte geben Sie Strasse und Hausnummer an."),
  zipCity: text(120).min(4, "Bitte geben Sie PLZ und Ort an."),
  payment: z.enum(["twint", "einzahlungsschein"], { message: "Bitte wählen Sie eine Zahlungsart." }),
  note: text(2000),
  website: z.literal(""),
  lines: z.array(cartLineSchema).min(1, "Ihr Warenkorb ist leer.").max(100),
});

/** Prices every line from the catalogue; unknown motifs are rejected. */
export function priceCart(lines: CartLine[]) {
  const items = [];
  for (const line of lines) {
    const motif = findMotif(line.id);
    if (!motif) return null;
    const unit = motif.price + (line.chrome ? CHROME_CHF : 0);
    items.push({ ...motif, qty: line.qty, chrome: line.chrome, unit, sum: unit * line.qty });
  }
  const subtotal = items.reduce((s, i) => s + i.sum, 0);
  const shipping = items.length ? SHIPPING_CHF : 0;
  return { items, subtotal, shipping, total: subtotal + shipping };
}
