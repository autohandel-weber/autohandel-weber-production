import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { EnquiryForm } from "@/components/enquiry-form";
import { useCart } from "@/lib/cart";
import { ArrowLeft, Grid3x3, ShoppingCart, Info, Palette, Phone, Printer, Truck } from "lucide-react";
import { ReliableImage } from "@/components/reliable-image";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/images/logo-weber.webp";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CHROME_SURCHARGE, DIGITALDRUCK, FOLIENFARBEN, SHIPPING, SHOP, priceRange, type Motif } from "@/lib/shop-data";

const TEL = "079 422 55 41";
const TEL_HREF = "tel:+41794225541";
const EMAIL = "patrick.weber@intergga.ch";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Aufkleber-Shop & Preise – Weber Beschriftungen Reigoldswil" },
      { name: "description", content: "Aufkleber für Auto, Motorrad und mehr: Fahrzeuge ab CHF 80.–, Tiere und Dekor ab CHF 30.–, Schriftzüge ab CHF 10.–. Digitaldruck auf Anfrage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Aufkleber-Shop & Preise – Weber Beschriftungen" },
      { property: "og:description", content: "Alle Aufkleber-Kategorien mit Preisen sowie Digitaldruck und Montage-Tipps." },
    ],
  }),
  component: Shop,
});

const MONTAGE = [
  "Fläche, die beklebt werden soll, mit Brennsprit entfetten.",
  "Wasser mit ein wenig Seife mischen und die Fläche anfeuchten.",
  "Kleber ausmitteln und mit einem Gummischaber (Rakel) das Restwasser ausdrücken.",
  "Kleber eine Nacht ruhen lassen.",
  "Am nächsten Tag die Applikationsfolie entfernen.",
  "Fertig!",
];

function CartButton() {
  const { count } = useCart();
  return (
    <Button asChild variant="outline" className="relative rounded-sm"><Link to="/warenkorb" aria-label={`Warenkorb (${count} Artikel)`}>
      <ShoppingCart /> <span className="hidden sm:inline">Warenkorb</span>
      {count > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-semibold text-primary-foreground">{count}</span>}
    </Link></Button>
  );
}

function MotifDialog({ title, motifs }: { title: string; motifs: Motif[] }) {
  const { add } = useCart();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4 h-11 w-full rounded-sm"><Grid3x3 /> Alle {motifs.length} Motive ansehen</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90dvh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-4xl font-normal tracking-wide">{title}</DialogTitle>
          <DialogDescription>{motifs.length} Motive · Preise in CHF pro Stück · Chrom/Gold-Folie + CHF {CHROME_SURCHARGE}</DialogDescription>
        </DialogHeader>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {motifs.map((m, i) => (
            <li key={i} className="flex flex-col rounded-sm border border-border p-3">
              <div className="flex aspect-[4/3] items-center justify-center">
                <ReliableImage src={m.src} width={m.width} height={m.height} loading="lazy" alt={`${m.name} Aufkleber`} className="max-h-full max-w-full object-contain" />
              </div>
              <p className="mt-3 font-semibold">{m.name} <span className="text-muted-foreground">#{i + 1}</span></p>
              <p className="font-display text-2xl text-primary">CHF {m.price}.–</p>
              <Button type="button" size="sm" className="mt-auto rounded-sm" onClick={() => { add(m.id); toast.success(`${m.name} #${i + 1} im Warenkorb`, { action: { label: "Zum Warenkorb", onClick: () => { window.location.href = "/warenkorb"; } } }); }}>
                <ShoppingCart /> In den Warenkorb
              </Button>
            </li>
          ))}
        </ul>
        <Button asChild variant="outline" className="h-12 rounded-sm"><Link to="/warenkorb"><ShoppingCart /> Zum Warenkorb</Link></Button>
      </DialogContent>
    </Dialog>
  );
}

/** Sections alternate light-blue/white; the index counts every section after the hero so no two neighbours match. */
const sectionBg = (i: number): string => (i % 2 ? "" : "bg-secondary");

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 kicker text-primary">{kicker}</p>
      <h2 className="heading-section">{title}</h2>
    </div>
  );
}

function Shop() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to="/" className="shrink-0" aria-label="Zur Startseite">
            <ReliableImage src={logoSrc} width={1200} height={640} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-sm"><Link to="/" hash="beschriftungen"><ArrowLeft /> <span className="hidden sm:inline">Zur Startseite</span></Link></Button>
            <CartButton />
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
              <Phone className="h-4 w-4" /> <span className="hidden sm:inline">{TEL}</span>
            </a>
          </div>
        </div>
      </header>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="hero-in mb-4 kicker text-accent">Weber Beschriftungen</p>
          <h1 className="hero-in font-display text-5xl min-[380px]:text-6xl leading-[0.9] md:text-8xl" style={{ animationDelay: "150ms" }}>Aufkleber-Shop<br />& Preise</h1>
          <p className="hero-in mt-6 max-w-2xl body-text text-ink-foreground/75" style={{ animationDelay: "300ms" }}>
            Über 220 fertige Motive als Folien-Aufkleber – oder Ihr eigenes Motiv im Digitaldruck. Wählen Sie, was zu Ihnen passt.
          </p>
          <div className="hero-in mt-10 grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" style={{ animationDelay: "450ms" }}>
            <div className="rounded-lg border border-ink-foreground/20 p-6">
              <p className="kicker text-accent">Folien-Aufkleber</p>
              <p className="mt-2 text-sm text-ink-foreground/70">Fertige Motive, aus einfarbiger Folie geschnitten – Farbe frei wählbar.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {SHOP.map((g) => <a key={g.group} href={`#${g.group.toLowerCase()}`} className="rounded-sm border border-ink-foreground/30 px-4 py-2 font-semibold hover:border-accent">{g.group}</a>)}
              </div>
            </div>
            <div className="rounded-lg border border-ink-foreground/20 p-6">
              <p className="kicker text-accent">Digitaldruck</p>
              <p className="mt-2 text-sm text-ink-foreground/70">Ihr eigenes Bild oder Logo, farbig gedruckt.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href="#digitaldruck" className="rounded-sm border border-ink-foreground/30 px-4 py-2 font-semibold hover:border-accent">Eigenes Motiv</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {SHOP.map((g, gi) => (
        <section key={g.group} id={g.group.toLowerCase()} className={`scroll-mt-20 ${sectionBg(gi)}`}>
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionHead kicker={g.subtitle} title={g.group} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item) => (
                <article key={item.name} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
                  <div className="grid grid-cols-2 gap-3">
                    {item.motifs.slice(0, 4).map((im, i) => (
                      <div key={i} className="flex aspect-[4/3] items-center justify-center rounded-sm bg-card p-2">
                        <ReliableImage src={im.src} width={im.width} height={im.height} loading="lazy" alt={`${im.name} Aufkleber`} className="max-h-full max-w-full object-contain" />
                      </div>
                    ))}
                  </div>
                  <h3 className="mt-5 heading-sub">{item.name}</h3>
                  <p className="mt-1 body-text text-muted-foreground">{item.note}</p>
                  <p className="mt-auto pt-4 font-display text-3xl text-primary">CHF {priceRange(item.motifs)} <span className="font-sans text-sm text-muted-foreground">/ Stk.</span></p>
                  <MotifDialog title={item.name} motifs={item.motifs} />
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="digitaldruck" className={`scroll-mt-20 ${sectionBg(SHOP.length)}`}>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <SectionHead kicker="Digitaldruck" title="Eigenes Motiv" />
            <p className="body-text text-muted-foreground">Senden Sie uns Ihr Wunschbild, das als Kleber oder Poster gedruckt werden soll. Auch Blachendruck ist für uns kein Problem.</p>
            <p className="mt-5 body-text text-muted-foreground">T-Shirts und Sweatshirts (Fabrikat Switcher) bedrucken wir mit Ihrem Logo oder Foto – auch Druck auf Ihr eigenes T-Shirt ist möglich.</p>
            <p className="mt-6 font-display text-3xl text-primary">Preise auf Anfrage</p>
          </div>
          <div className="grid grid-cols-2 gap-4 self-center">
            {DIGITALDRUCK.map((im, i) => (
              <div key={i} className="flex aspect-square items-center justify-center rounded-lg border border-border bg-card p-4 shadow-sm">
                <ReliableImage src={im.src} width={im.width} height={im.height} loading="lazy" alt={`Digitaldruck Beispiel ${i + 1}`} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
          <div id="offerte" className="scroll-mt-24 md:col-span-2">
            <EnquiryForm kind="print" />
          </div>
        </div>
      </section>

      <section className={`scroll-mt-20 ${sectionBg(SHOP.length + 1)}`}>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <SectionHead kicker="Gut zu wissen" title="Folien & Montage" />
            <p className="flex gap-3 body-text text-muted-foreground"><Palette className="mt-1 h-5 w-5 shrink-0 text-primary" />Viele Folienfarben verfügbar – für spezielle Farbwünsche schreiben oder rufen Sie uns einfach an.</p>
            <p className="mt-4 flex gap-3 body-text text-muted-foreground"><Printer className="mt-1 h-5 w-5 shrink-0 text-primary" />Zuschlag für Aufkleber mit Chrom- oder Goldfolie: CHF {CHROME_SURCHARGE}</p>
            <p className="mt-4 flex gap-3 body-text text-muted-foreground"><Truck className="mt-1 h-5 w-5 shrink-0 text-primary" />Versand ausschliesslich per Post: CHF {SHIPPING.post}, per Nachnahme CHF {SHIPPING.cod}. Die Ware wird nach Zahlungseingang verschickt.</p>
            <p className="mt-4 flex gap-3 body-text text-muted-foreground"><Info className="mt-1 h-5 w-5 shrink-0 text-primary" />Aus eigener Erfahrung ist Chrom- oder Goldfolie auf Scheiben weniger geeignet.</p>
            <figure className="mt-8 rounded-lg border border-border bg-card p-4">
              <ReliableImage src={FOLIENFARBEN.src} width={FOLIENFARBEN.width} height={FOLIENFARBEN.height} loading="lazy" alt="Übersicht der Folienfarben" className="h-auto w-full" />
              <figcaption className="mt-2 text-sm text-muted-foreground">Verfügbare Folienfarben</figcaption>
            </figure>
          </div>
          <ol className="grid gap-4 self-center">
            {MONTAGE.map((s, i) => (
              <li key={s} className="flex items-center gap-5 border-b border-border pb-4">
                <span className="font-display text-4xl text-accent">0{i + 1}</span>
                <span className="body-text">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Kontakt – gleich aufgebaut wie auf der Startseite */}
      <section id="kontakt" className="scroll-mt-20 bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-3">
          <div>
            <p className="mb-2 kicker text-accent">Kontakt</p>
            <h2 className="heading-section">So erreichen Sie uns</h2>
          </div>
          <div>
            <p className="font-semibold">Autohandel</p>
            <p className="text-ink-foreground/70">Seewenstrasse 2<br />4418 Reigoldswil</p>
            <p className="mt-6 font-semibold">Beschriftungen</p>
            <p className="text-ink-foreground/70">Hohlegasse 37<br />4104 Oberwil</p>
          </div>
          <div className="space-y-3">
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="flex items-center gap-3 rounded-sm bg-primary px-6 py-4 font-semibold text-primary-foreground">
              <Phone className="h-6 w-6 shrink-0" /> Anrufen: <span className="font-display text-3xl">{TEL}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="block text-ink-foreground/70 hover:text-ink-foreground">{EMAIL}</a>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 pb-24">
          <div className="max-w-3xl">
            <EnquiryForm kind="contact" />
          </div>
        </div>
        <p className="border-t border-ink-foreground/15 py-6 text-center text-sm text-ink-foreground/60">© {new Date().getFullYear()} Weber Autohandel & Beschriftungen</p>
      </section>
    </div>
  );
}
