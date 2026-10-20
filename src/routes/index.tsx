import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Menu, Phone, X } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ReliableImage } from "@/components/reliable-image";
import logo from "@/assets/logo-weber-optimized.webp.asset.json";
import { getCars } from "@/lib/cars.functions";
import b1 from "@/assets/beschriftung-1-optimized.webp.asset.json";
import b2 from "@/assets/beschriftung-2-optimized.webp.asset.json";
import b3 from "@/assets/beschriftung-3-optimized.webp.asset.json";
import b4 from "@/assets/beschriftung-4-optimized.webp.asset.json";
import b5 from "@/assets/beschriftung-5-optimized.webp.asset.json";
import b6 from "@/assets/beschriftung-6-optimized.webp.asset.json";
import b7 from "@/assets/beschriftung-7-optimized.webp.asset.json";
import b8 from "@/assets/beschriftung-8-optimized.webp.asset.json";
import button59 from "@/assets/button-59mm-optimized.webp.asset.json";
import buttonsMotive from "@/assets/buttons-motive-optimized.webp.asset.json";

const gallery = [
  { url: b1.url, width: 1386, height: 1158, alt: "Heckbeschriftung VW Caddy Bistro Kuhblick" },
  { url: b2.url, width: 1400, height: 722, alt: "Seitenbeschriftung Bistro Kuhblick" },
  { url: b3.url, width: 1400, height: 686, alt: "Ford S-Max mit Ultra Brag Beschriftung" },
  { url: b4.url, width: 1400, height: 990, alt: "Honda Rennmotorrad mit Dekor" },
  { url: b5.url, width: 1305, height: 1400, alt: "Mercedes Sprinter REGO-FIX" },
  { url: b8.url, width: 1400, height: 975, alt: "Lieferwagen Seccosit" },
  { url: b6.url, width: 1400, height: 868, alt: "Flugzeug mit Breezer Beschriftung" },
  { url: b7.url, width: 1400, height: 847, alt: "Flugzeug Hawaiian Beschriftung" },
];

const carsQuery = queryOptions({ queryKey: ["cars"], queryFn: () => getCars(), staleTime: 5 * 60 * 1000 });

const MORE_CARS = "http://www.autohandel-weber.ch/web-occasionen-index.htm";
const EMAIL = "patrick.weber@intergga.ch";
const TEL = "079 422 55 41";
// Internationale Schreibweise – öffnet auf dem Handy direkt die Telefon-App.
const TEL_HREF = "tel:+41794225541";
const WHATSAPP_NO = "+41 76 629 50 56";
// Öffnet auf dem Handy direkt den WhatsApp-Chat, auf dem Computer WhatsApp Web.
const WHATSAPP =
  "https://wa.me/41766295056?text=" + encodeURIComponent("Guten Tag, ich habe eine Anfrage.");

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weber Autohandel & Beschriftungen – Occasionen in Reigoldswil" },
      {
        name: "description",
        content:
          "Geprüfte Occasionen mit 12 Monaten Garantie, Auto-Ankauf und Fahrzeugbeschriftungen von Patrick Weber in Reigoldswil BL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Weber Autohandel & Beschriftungen" },
      {
        property: "og:description",
        content: "Occasionen, Ankauf und Fahrzeugbeschriftungen in Reigoldswil BL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(carsQuery),
  component: Index,
});

const nav = [
  ["fahrzeuge", "Fahrzeuge"],
  ["ankauf", "Ankauf"],
  ["beschriftungen", "Beschriftungen"],
  ["ueber-uns", "Über uns"],
  ["kontakt", "Kontakt"],
] as const;

const PARTNERS = [
  { name: "Garage Mory", url: "http://www.garagemory.ch/" },
  { name: "M-Automobil Service", url: "http://www.m-auto.ch/" },
  { name: "Audelia", url: "https://www.bewerbungswerkstatt.ch/", note: "Ihre Bewerbungsspezialistin" },
  { name: "StartSaldo", url: "https://www.startsaldo.ch/", note: "Ihre Buchhaltung" },
];

function Index() {
  const { data: { cars } } = useSuspenseQuery(carsQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="shrink-0">
            <ReliableImage src={logo.url} width={944} height={488} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="hidden items-center gap-2 rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-flex">
              <Phone className="h-4 w-4" /> {TEL}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              className="rounded-sm p-2 text-foreground hover:bg-muted md:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <div className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out md:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <nav className="min-h-0">
            <div className="flex flex-col gap-1 border-t border-border px-6 py-4">
              {nav.map(([id, l]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-sm px-2 py-3 text-lg font-medium hover:bg-muted hover:text-primary">
                  {l}
                </a>
              ))}
              <a href={TEL_HREF} className="mt-2 flex items-center justify-center gap-2 rounded-sm bg-primary px-4 py-3 text-center font-semibold text-primary-foreground">
                <Phone className="h-5 w-5" /> Anrufen: {TEL}
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-ink pt-20 text-ink-foreground">
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
          <p className="hero-in mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent" style={{ animationDelay: "100ms" }}>Seit 2004 · Reigoldswil BL</p>
          <h1 style={{ animationDelay: "250ms" }} className="hero-in font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
            Autohandel &<br />Beschriftungen
          </h1>
          <p className="hero-in mt-6 max-w-xl text-lg text-ink-foreground/75" style={{ animationDelay: "450ms" }}>
            Geprüfte Occasionen mit 12 Monaten Garantie, fairer Ankauf und Fahrzeugbeschriftungen aus einer Hand.
          </p>
          <div className="hero-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "600ms" }}>
            <a href="#fahrzeuge" className="rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground">
              {cars.length} Fahrzeuge ansehen
            </a>
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="flex items-center gap-2 rounded-sm border border-accent bg-accent/15 px-6 py-3 font-semibold hover:border-accent">
              <Phone className="h-5 w-5" /> {TEL}
            </a>
            <a href="#ankauf" className="rounded-sm border border-ink-foreground/30 px-6 py-3 font-semibold hover:border-accent">
              Auto verkaufen
            </a>
          </div>
          </div>
          <div className="hero-in rounded-xl bg-card p-4 shadow-2xl" style={{ animationDelay: "500ms" }}>
            <ReliableImage src={logo.url} width={944} height={488} alt="Logo Weber AutoHandel & Beschriftungen" className="w-full" />
          </div>
        </div>
      </section>

      {/* Fahrzeuge */}
      <section id="fahrzeuge" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <SectionHead kicker="Occasionen" title="Unsere Fahrzeuge" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.slice(0, 6).map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <ReliableImage src={c.img} width={800} height={600} referrerPolicy="no-referrer" alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold leading-snug">{c.title}</h3>
                <p className="mt-2 font-display text-3xl text-primary">{c.price}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <dd>{c.date}</dd>
                  <dd>{c.km}</dd>
                  <dd>{c.fuel}</dd>
                  <dd>{c.gear}</dd>
                  <dd className="col-span-2">{c.power}</dd>
                </dl>
                <p className="mt-4 text-sm font-semibold text-primary">Auf AutoScout24 ansehen →</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Live von AutoScout24 – wird laufend aktualisiert.</p>
        <div className="mt-4 text-center">
          <a href={MORE_CARS} target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm bg-primary px-8 py-3 font-semibold text-primary-foreground">
            Mehr auf AutoScout24
          </a>
        </div>
      </section>

      <Ankauf />

      {/* Beschriftungen */}
      <section id="beschriftungen" className="scroll-mt-20 bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 md:grid-cols-2">
          <div>
            <SectionHead kicker="Weber Beschriftungen" title="Fahrzeug­beschriftungen" />
            <p className="text-muted-foreground">
              Sie liefern uns Ihr Logo – den Rest erledigen wir. Ihr neues Fahrzeug holen Sie bereits beschriftet von der Garage ab.
            </p>
            <p className="mt-6 text-muted-foreground">
              Ob Lieferwagen, Personenwagen, Motorrad oder sogar Flugzeug – wir beschriften alles.{" "}
              <a href="#buttons" className="font-semibold text-primary">Neu: Buttons →</a>
            </p>
            <a href={`mailto:${EMAIL}?subject=Offerte%20Beschriftung`} className="mt-8 inline-block rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground">
              Offerte verlangen
            </a>
          </div>
          <ul className="grid gap-4 self-center">
            {[
              "Fahrzeugbeschriftungen aller Art",
              "Werbeschilder aller Art",
              "Plakate, Blachendruck, T-Shirts",
              "Digitaldruck 4-farbig, wetterbeständig, in Fotoqualität",
            ].map((s, i) => (
              <li key={s} className="flex items-center gap-5 border-b border-border pb-4">
                <span className="font-display text-4xl text-accent">0{i + 1}</span>
                <span className="text-lg">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-primary">Referenzen</p>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {gallery.map((g) => (
              <figure key={g.url} className="mb-4 break-inside-avoid overflow-hidden rounded-md bg-card shadow-sm">
                <ReliableImage src={g.url} width={g.width} height={g.height} alt={g.alt} loading="lazy" className="w-full transition-transform duration-500 hover:scale-105" />
              </figure>
            ))}
          </div>

          <div id="buttons" className="mt-20 grid items-center gap-10 rounded-xl bg-card p-8 shadow-sm md:grid-cols-2 md:p-12">
            <div className="grid grid-cols-2 gap-4">
              <ReliableImage src={button59.url} width={446} height={452} alt="Button 59 mm mit Clip" loading="lazy" className="w-full rounded-md" />
              <ReliableImage src={buttonsMotive.url} width={348} height={324} alt="Bedruckte Buttons mit verschiedenen Motiven" loading="lazy" className="w-full rounded-md" />
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Neu</p>
              <h3 className="font-display text-4xl md:text-5xl">Ihre eigenen Buttons</h3>
              <p className="mt-4 text-muted-foreground">
                Bedruckt mit Ihrem Motiv, 59 mm mit Clip – für Vereine, Events, Werbung oder als Geschenk.
              </p>
              <p className="mt-6 font-display text-3xl text-primary">CHF 1.– bis 7.– / Stk.</p>
              <p className="text-sm text-muted-foreground">Je nach Auflage und Bildbearbeitung, exkl. Versand.</p>
              <a href={`mailto:${EMAIL}?subject=Anfrage%20Buttons`} className="mt-6 inline-block rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground">
                Buttons anfragen
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section id="ueber-uns" className="mx-auto max-w-4xl scroll-mt-20 px-6 py-24">
        <SectionHead kicker="Über uns" title="Patrick Weber" />
        <div className="space-y-5 text-lg text-muted-foreground">
          <p>
            Gelernter Mechaniker und Instandhaltungsfachmann mit Ausbildung in Beschriftung und Digitaldruck. Motoren und Autos begeistern mich, seit ich ein Knabe war – mit 14 kam das erste Mofa, und das Restaurieren von Puch-Mofas pflegen wir bis heute.
          </p>
          <p>
            2004 gründete ich Weber Autohandel & Beschriftungen. Seit August 2023 sind wir in der neuen Garage an der Seewenstrasse 2 in Reigoldswil. Unsere Fahrzeuge liefern wir termingerecht und mit 12 Monaten Garantie ab.
          </p>
        </div>
        <div className="mt-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">Partner</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {PARTNERS.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm border border-border px-4 py-3 transition-colors hover:border-primary"
              >
                <span className="block font-semibold">{p.name}</span>
                {p.note && <span className="block text-sm text-muted-foreground">{p.note}</span>}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-20 bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-3">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Kontakt</p>
            <h2 className="font-display text-5xl md:text-6xl">So erreichen Sie uns</h2>
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
        <p className="border-t border-ink-foreground/15 py-6 text-center text-sm text-ink-foreground/60">
          © {new Date().getFullYear()} Weber Autohandel & Beschriftungen
        </p>
      </section>

      {/* Auf dem Handy immer sichtbar: ein Tipp, und die Telefon-App öffnet sich */}
      <a
        href={TEL_HREF}
        aria-label={`Anrufen: ${TEL}`}
        className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-center gap-2 bg-primary px-6 py-4 font-semibold text-primary-foreground md:hidden"
      >
        <Phone className="h-5 w-5" /> Anrufen: {TEL}
      </a>

      {/* WhatsApp-Button unten rechts */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Per WhatsApp schreiben: ${WHATSAPP_NO}`}
        title={`WhatsApp: ${WHATSAPP_NO}`}
        className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg transition-transform hover:scale-110 md:bottom-6 md:right-6"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}

// WhatsApp-Symbol (Markenlogo), weil lucide-react es nicht anbietet.
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.116-.198.058-.371-.029-.52-.087-.149-.67-1.612-.917-2.207-.242-.579-.487-.5-.669-.51-.173-.006-.371-.006-.57-.006-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const REVEAL_SELECTOR = [
  "#fahrzeuge > :not(.grid)",
  "#fahrzeuge .grid > a",
  "#ankauf > div",
  "#ankauf form > *",
  "#beschriftungen > div:first-child > div",
  "#beschriftungen > div:nth-child(2) > p",
  "#buttons > div",
  "#beschriftungen li",
  "#beschriftungen figure",
  "#ueber-uns > *",
  "#ueber-uns a",
  "#kontakt > div > div",
].join(",");

// Blendet Elemente beim Scrollen weich ein (respektiert "reduzierte Bewegung").
function useReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
    );
    for (const el of els) {
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 80}ms`;
      el.classList.add("reveal");
      io.observe(el);
    }
    // Never leave content hidden if observation stalls or is interrupted.
    const safetyTimer = window.setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
      io.disconnect();
    }, 12000);
    return () => {
      window.clearTimeout(safetyTimer);
      io.disconnect();
      els.forEach((el) => el.classList.remove("reveal", "is-visible"));
    };
  }, []);
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="font-display text-5xl md:text-6xl">{title}</h2>
    </div>
  );
}

const SELECTS = [
  { name: "Getriebe", options: ["Automatik", "Handgeschaltet", "Halbautomat"] },
  { name: "Treibstoff", options: ["Benzin", "Diesel", "Hybrid", "Elektro"] },
  { name: "Fahrzeugart", options: ["Limousine", "Kombi / Van", "Cabrio", "Jeep"] },
] as const;

function Ankauf() {
  const [sent, setSent] = useState<null | "shared" | "mail">(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const fields = ["Marke", "Modell", "Jahrgang", "Kilometer", "Name", "Telefon", "E-Mail"];
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const keys = [...fields.slice(0, 4), ...SELECTS.map((s) => s.name), ...fields.slice(4), "Bemerkungen"];
    const body = keys.map((f) => `${f}: ${d.get(f) ?? ""}`).join("\n");
    const subject = "Auto verkaufen";
    // Auf Handys: Fotos direkt mitschicken über das Teilen-Menü (z. B. Mail oder WhatsApp).
    if (photos.length && navigator.canShare?.({ files: photos })) {
      try {
        await navigator.share({ title: subject, text: `An: ${EMAIL}\n\n${body}`, files: photos });
        setSent("shared");
        return;
      } catch {
        /* abgebrochen → weiter mit E-Mail */
      }
    }
    const note = photos.length ? `\n\nFotos (${photos.length}) bitte an diese E-Mail anhängen.` : "";
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body + note)}`;
    setSent("mail");
  };
  const input = "w-full rounded-sm border border-input bg-background px-3 py-2.5 outline-none focus:border-primary";
  return (
    <section id="ankauf" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-6 py-24 md:grid-cols-2">
      <div>
        <SectionHead kicker="Ankauf" title="Sie möchten Ihr Auto verkaufen?" />
        <p className="text-lg text-muted-foreground">
          Senden Sie uns ein paar Angaben und Fotos zu Ihrem Fahrzeug – wir melden uns mit einem fairen Angebot.
        </p>
        <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
          <Phone className="h-5 w-5" /> Lieber anrufen: {TEL}
        </a>
      </div>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {fields.slice(0, 4).map((f) => (
          <input key={f} name={f} placeholder={f} required={f === "Marke"} className={input} />
        ))}
        {SELECTS.map((s) => (
          <select key={s.name} name={s.name} defaultValue="" className={input} aria-label={s.name}>
            <option value="" disabled>{s.name}</option>
            {s.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ))}
        {fields.slice(4).map((f) => (
          <input key={f} name={f} placeholder={f} required={f === "Name"} type={f === "E-Mail" ? "email" : f === "Telefon" ? "tel" : "text"} className={input} />
        ))}
        <textarea name="Bemerkungen" placeholder="Bemerkungen / Optionen" rows={3} className={`${input} sm:col-span-2`} />
        <label className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-sm border-2 border-dashed border-input bg-background px-4 py-6 text-center hover:border-primary sm:col-span-2">
          <span className="font-semibold">📷 Fotos hinzufügen</span>
          <span className="text-sm text-muted-foreground">Mehrere Bilder möglich</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => setPhotos((p) => [...p, ...Array.from(e.target.files ?? [])].slice(0, 10))}
          />
        </label>
        {photos.length > 0 && (
          <div className="grid grid-cols-4 gap-2 sm:col-span-2">
            {photos.map((f, i) => (
              <div key={`${f.name}-${i}`} className="relative aspect-square overflow-hidden rounded-sm bg-muted">
                <ReliableImage src={URL.createObjectURL(f)} alt={f.name} className="h-full w-full object-cover" />
                <button
                  type="button"
                  aria-label="Foto entfernen"
                  onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))}
                  className="absolute right-1 top-1 rounded-full bg-card/90 px-2 text-sm font-bold"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <button className="rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground sm:col-span-2">
          {sent === "shared" ? "Danke – Anfrage geteilt" : sent === "mail" ? "E-Mail-Programm geöffnet" : "Anfrage senden"}
        </button>
        {sent === "mail" && photos.length > 0 && (
          <p className="text-sm text-muted-foreground sm:col-span-2">Bitte hängen Sie die Fotos in Ihrem E-Mail-Programm noch an.</p>
        )}
      </form>
    </section>
  );
}
