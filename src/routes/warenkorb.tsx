import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, LoaderCircle, Minus, Phone, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { ReliableImage } from "@/components/reliable-image";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/images/logo-weber.webp";
import { useCart } from "@/lib/cart";
import { CHROME_CHF, orderSchema, PAYMENT_METHODS, priceCart } from "@/lib/order-schema";
import { SHOP } from "@/lib/shop-data";
import { submitOrder } from "@/lib/orders.functions";

const TEL = "079 422 55 41";
const TEL_HREF = "tel:+41794225541";
const input = "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary";
const IMAGES = new Map(SHOP.flatMap((g) => g.items.flatMap((i) => i.motifs)).map((m) => [m.id, m]));

export const Route = createFileRoute("/warenkorb")({
  head: () => ({
    meta: [
      { title: "Warenkorb – Weber Aufkleber-Shop" },
      { name: "description", content: "Ihr Warenkorb im Aufkleber-Shop von Weber Beschriftungen. Bezahlung per TWINT oder Einzahlungsschein." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:title", content: "Warenkorb – Weber Aufkleber-Shop" },
      { property: "og:description", content: "Aufkleber bestellen und per TWINT oder Einzahlungsschein bezahlen." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Warenkorb,
});

type Done = { orderNumber: string; total: number; payment: "twint" | "einzahlungsschein" };

function Warenkorb() {
  const cart = useCart();
  const send = useServerFn(submitOrder);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const priced = priceCart(cart.lines);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const f = new FormData(event.currentTarget);
    const read = (n: string) => String(f.get(n) ?? "");
    const order = { name: read("name"), email: read("email"), phone: read("phone"), street: read("street"), zipCity: read("zipCity"), payment: read("payment"), note: read("note"), website: read("website"), lines: cart.lines };
    const parsed = orderSchema.safeParse(order);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Angaben."); return; }
    setPending(true); setError(null);
    try {
      const result = await send({ data: parsed.data });
      if (result.ok) { setDone(result); cart.clear(); window.scrollTo({ top: 0 }); }
      else setError(result.message);
    } catch { setError("Die Verbindung wurde unterbrochen. Bitte versuchen Sie es erneut."); }
    finally { setPending(false); }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="shrink-0" aria-label="Zur Startseite">
            <ReliableImage src={logoSrc} width={1200} height={640} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-sm"><Link to="/shop"><ArrowLeft /> <span className="hidden sm:inline">Weiter einkaufen</span></Link></Button>
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">{TEL}</span>
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        {done ? <Confirmation done={done} /> : <>
          <p className="mb-2 kicker text-primary">Aufkleber-Shop</p>
          <h1 className="heading-section mb-10">Warenkorb</h1>
          {!priced || priced.items.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-10 text-center">
              <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-4 body-text text-muted-foreground">Ihr Warenkorb ist leer.</p>
              <Button asChild className="mt-6 h-12 rounded-sm px-6"><Link to="/shop">Zum Aufkleber-Shop</Link></Button>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
              <section aria-label="Artikel">
                <ul className="grid gap-4">
                  {priced.items.map((item, index) => {
                    const im = IMAGES.get(item.id);
                    const number = item.id.split(":")[1];
                    return (
                      <li key={`${item.id}-${index}`} className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-lg border border-border bg-card p-4 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
                        <div className="flex aspect-square items-center justify-center">
                          {im && <ReliableImage src={im.src} width={im.width} height={im.height} alt={item.name} className="max-h-full max-w-full object-contain" />}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold">{item.name} <span className="text-muted-foreground">#{number}</span></p>
                          <p className="text-sm text-muted-foreground">{item.category} · CHF {item.unit}.– / Stk.</p>
                          <label className="mt-2 flex items-center gap-2 text-sm">
                            <input type="checkbox" checked={item.chrome} onChange={(e) => cart.update(index, { chrome: e.target.checked })} className="h-4 w-4 accent-primary" />
                            Chrom- oder Goldfolie (+ CHF {CHROME_CHF}.–)
                          </label>
                          <div className="mt-3 flex items-center gap-2">
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" aria-label="Weniger" disabled={item.qty <= 1} onClick={() => cart.update(index, { qty: item.qty - 1 })}><Minus /></Button>
                            <span className="w-8 text-center font-semibold" aria-label="Anzahl">{item.qty}</span>
                            <Button type="button" variant="outline" size="icon" className="h-8 w-8" aria-label="Mehr" disabled={item.qty >= 50} onClick={() => cart.update(index, { qty: item.qty + 1 })}><Plus /></Button>
                            <Button type="button" variant="ghost" size="icon" className="ml-1 h-8 w-8" aria-label={`${item.name} entfernen`} onClick={() => cart.remove(index)}><Trash2 /></Button>
                          </div>
                        </div>
                        <p className="col-span-2 text-right font-display text-2xl text-primary sm:col-span-1">CHF {item.sum}.–</p>
                      </li>
                    );
                  })}
                </ul>
                <dl className="mt-6 grid gap-2 rounded-lg border border-border bg-card p-6 body-text">
                  <div className="flex justify-between"><dt className="text-muted-foreground">Zwischensumme</dt><dd>CHF {priced.subtotal}.–</dd></div>
                  <div className="flex justify-between"><dt className="text-muted-foreground">Versand per Post</dt><dd>CHF {priced.shipping}.–</dd></div>
                  <div className="flex justify-between border-t border-border pt-2 font-display text-3xl text-primary"><dt>Total</dt><dd>CHF {priced.total}.–</dd></div>
                </dl>
              </section>

              <section aria-label="Bestellung abschliessen">
                <h2 className="heading-sub mb-6">Bestellung abschliessen</h2>
                <form onSubmit={submit} className="grid gap-4">
                  <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
                  <label className="grid gap-1.5 text-sm font-medium">Name *<input name="name" autoComplete="name" required maxLength={100} className={input} /></label>
                  <label className="grid gap-1.5 text-sm font-medium">E-Mail *<input name="email" type="email" autoComplete="email" required maxLength={255} className={input} /></label>
                  <label className="grid gap-1.5 text-sm font-medium">Telefon<input name="phone" type="tel" autoComplete="tel" maxLength={40} className={input} /></label>
                  <label className="grid gap-1.5 text-sm font-medium">Strasse und Nr. *<input name="street" autoComplete="street-address" required maxLength={200} className={input} /></label>
                  <label className="grid gap-1.5 text-sm font-medium">PLZ und Ort *<input name="zipCity" autoComplete="postal-code" required maxLength={120} className={input} /></label>
                  <fieldset className="grid gap-2">
                    <legend className="mb-1.5 text-sm font-medium">Zahlungsart *</legend>
                    {Object.entries(PAYMENT_METHODS).map(([value, label], i) => (
                      <label key={value} className="flex cursor-pointer items-center gap-3 rounded-sm border border-input px-4 py-3 has-[:checked]:border-primary">
                        <input type="radio" name="payment" value={value} defaultChecked={i === 0} className="h-4 w-4 accent-primary" />
                        <span className="font-semibold">{label}</span>
                      </label>
                    ))}
                  </fieldset>
                  <label className="grid gap-1.5 text-sm font-medium">Bemerkungen (z. B. Farbe, Grösse)<textarea name="note" maxLength={2000} rows={3} className={input} /></label>
                  <Button type="submit" disabled={pending} className="h-12 rounded-sm">{pending ? <LoaderCircle className="animate-spin" /> : <CheckCircle2 />}{pending ? "Wird gesendet …" : `Verbindlich bestellen · CHF ${priced.total}.–`}</Button>
                  {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
                  <p className="text-sm text-muted-foreground">Die Ware wird nach Zahlungseingang per Post verschickt.</p>
                </form>
              </section>
            </div>
          )}
        </>}
      </main>
    </div>
  );
}

function Confirmation({ done }: { done: Done }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
      <p className="mt-6 mb-2 kicker text-primary">Vielen Dank</p>
      <h1 className="heading-section">Bestellung erhalten</h1>
      <p className="mt-4 body-text text-muted-foreground">Ihre Bestellnummer: <strong className="text-foreground">{done.orderNumber}</strong> · Total CHF {done.total}.–</p>
      <div className="mt-8 rounded-lg border border-border bg-card p-6 text-left">
        {done.payment === "twint" ? <>
          <h2 className="heading-sub">Bezahlen mit TWINT</h2>
          <p className="mt-3 body-text text-muted-foreground">Bitte bezahlen Sie CHF {done.total}.– per TWINT und geben Sie die Bestellnummer <strong className="text-foreground">{done.orderNumber}</strong> als Mitteilung an.</p>
          <p className="mt-3 rounded-sm bg-muted p-4 text-sm text-muted-foreground">Der TWINT-QR-Code wird hier in Kürze angezeigt. Bis dahin melden wir uns mit den Zahlungsangaben bei Ihnen.</p>
        </> : <>
          <h2 className="heading-sub">Bezahlen per Einzahlungsschein</h2>
          <p className="mt-3 body-text text-muted-foreground">Wir senden Ihnen die Rechnung mit Einzahlungsschein über CHF {done.total}.–. Sobald die Zahlung eingegangen ist, verschicken wir Ihre Aufkleber per Post.</p>
        </>}
      </div>
      <Button asChild className="mt-8 h-12 rounded-sm px-6"><Link to="/shop">Zurück zum Shop</Link></Button>
    </div>
  );
}
