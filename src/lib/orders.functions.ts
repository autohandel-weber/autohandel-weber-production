import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { orderSchema, priceCart } from "./order-schema";

type Result = { ok: true; orderNumber: string; total: number; payment: "twint" | "einzahlungsschein" } | { ok: false; message: string };

export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => input)
  .handler(async ({ data }): Promise<Result> => {
    const request = getRequest();
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== new URL(request.url).host) return { ok: false, message: "Bitte bestellen Sie direkt über diese Webseite." };
    const parsed = orderSchema.safeParse(data);
    if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Angaben." };
    const v = parsed.data;
    const priced = priceCart(v.lines);
    if (!priced) return { ok: false, message: "Ein Artikel ist nicht mehr verfügbar. Bitte prüfen Sie Ihren Warenkorb." };
    const d = new Date();
    const orderNumber = `W${d.getFullYear() % 100}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("shop_orders").insert({
      order_number: orderNumber, name: v.name, email: v.email, phone: v.phone, street: v.street, zip_city: v.zipCity,
      payment_method: v.payment, note: v.note, items: priced.items, subtotal: priced.subtotal, shipping: priced.shipping, total: priced.total,
    });
    if (error) return { ok: false, message: "Ihre Bestellung konnte nicht gespeichert werden. Bitte versuchen Sie es erneut oder rufen Sie uns an." };
    return { ok: true, orderNumber, total: priced.total, payment: v.payment };
  });
