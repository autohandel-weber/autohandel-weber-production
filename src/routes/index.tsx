import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ReliableImage } from "@/components/reliable-image";
import { EnquiryForm } from "@/components/enquiry-form";
import { Button } from "@/components/ui/button";
import logoSrc from "@/assets/images/logo-weber.webp";
import { getCars } from "@/lib/cars.functions";
import b1Src from "@/assets/images/beschriftung-1.webp";
import b2Src from "@/assets/images/beschriftung-2.webp";
import b3Src from "@/assets/images/beschriftung-3.webp";
import b4Src from "@/assets/images/beschriftung-4.webp";
import b5Src from "@/assets/images/beschriftung-5.webp";
import b6Src from "@/assets/images/beschriftung-6.webp";
import b7Src from "@/assets/images/beschriftung-7.webp";
import b8Src from "@/assets/images/beschriftung-8.webp";
import button59Src from "@/assets/images/button-59mm.webp";
import buttonsMotiveSrc from "@/assets/images/buttons-motive.webp";
import patrickSrc from "@/assets/images/patrick-weber.webp";

const logo = { url: logoSrc };
const b1 = { url: b1Src };
const b2 = { url: b2Src };
const b3 = { url: b3Src };
const b4 = { url: b4Src };
const b5 = { url: b5Src };
const b6 = { url: b6Src };
const b7 = { url: b7Src };
const b8 = { url: b8Src };
const button59 = { url: button59Src };
const buttonsMotive = { url: buttonsMotiveSrc };
const patrick = { url: patrickSrc };

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

const MORE_CARS = "https://www.autoscout24.ch/de/s/seller-63333";
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

// Meilensteine der Firmengeschichte – Jahr und Text erscheinen nebeneinander.
const HISTORY = [
  ["2004", "Im Jahre 2004 wurde dann die Firma Weber Autohandel & Beschriftungen gegründet."],
  ["August 2023", "Ab August 2023 durften wir unsere neue Garage beziehen an der Seewenstrasse 2 auch in 4418 Reigoldswil."],
  ["Herbst 2026", "Im Herbst 2026 haben wir unsere Firma stolz in eine GmbH gewandelt."],
] as const;

function Index() {
  const { data: { cars } } = useSuspenseQuery(carsQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  useReveal();
  return (
    <div className="min-h-screen bg-background pb-16 text-foreground md:pb-0">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:flex lg:justify-between lg:gap-6">
          <a href="#top" className="shrink-0">
            <ReliableImage src={logo.url} width={1200} height={640} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden min-w-0 items-center gap-6 whitespace-nowrap text-sm font-medium uppercase lg:flex xl:gap-8">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            ))}
            <Link to="/shop" className="text-muted-foreground transition-colors hover:text-primary">Shop</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="hidden shrink-0 items-center gap-2 whitespace-nowrap rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground sm:inline-flex">
              <Phone className="h-4 w-4 shrink-0" /> {TEL}
            </a>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Menü schliessen" : "Menü öffnen"}
              aria-expanded={menuOpen}
              className="shrink-0 rounded-sm text-foreground hover:bg-muted lg:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        <div inert={!menuOpen} className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out lg:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <nav className="max-h-[calc(100dvh-6rem)] min-h-0 overflow-y-auto">
            <div className="flex flex-col gap-1 border-t border-border px-6 py-4">
              {nav.map(([id, l]) => (
                <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="rounded-sm px-2 py-3 text-lg font-medium hover:bg-muted hover:text-primary">
                  {l}
                </a>
              ))}
              <Link to="/shop" className="rounded-sm px-2 py-3 text-lg font-medium hover:bg-muted hover:text-primary">Shop</Link>
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
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div className="min-w-0">
          <p className="hero-in mb-4 kicker text-accent" style={{ animationDelay: "100ms" }}>Seit 2004 · Reigoldswil BL</p>
          <h1 style={{ animationDelay: "250ms" }} className="hero-in font-display text-5xl min-[380px]:text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
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
          <div className="hero-in" style={{ animationDelay: "500ms" }}>
            <ReliableImage src={logo.url} width={1200} height={640} alt="Logo Weber AutoHandel & Beschriftungen" className="w-full" />
          </div>
        </div>
      </section>

      {/* Fahrzeuge */}
      <div className="bg-secondary">
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
      </div>

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
            <Button asChild className="mt-8 h-12 rounded-sm px-6"><Link to="/shop" hash="offerte">
              Offerte verlangen
            </Link></Button>
            <Button asChild variant="outline" className="ml-3 mt-8 h-12 rounded-sm px-6"><Link to="/shop">
              Zum Aufkleber-Shop / Preise
            </Link></Button>
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
          <p className="mb-2 kicker text-primary">Referenzen</p>
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
              <p className="mb-2 kicker text-primary">Neu</p>
              <h3 className="heading-sub">Ihre eigenen Buttons</h3>
              <p className="mt-4 text-muted-foreground">
                Bedruckt mit Ihrem Motiv, 59 mm mit Clip – für Vereine, Events, Werbung oder als Geschenk.
              </p>
              <p className="mt-6 font-display text-3xl text-primary">CHF 1.– bis 7.– / Stk.</p>
              <p className="text-sm text-muted-foreground">Je nach Auflage und Bildbearbeitung, exkl. Versand.</p>
              <Button asChild className="mt-6 h-12 rounded-sm px-6"><a href="#kontakt">
                Buttons anfragen
              </a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section id="ueber-uns" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,17rem)] md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div className="about-copy min-w-0">
            <SectionHead kicker="Über uns" title="Patrick Weber" />
            <h3 className="heading-sub">Meine beruflichen Erfahrungen</h3>
            <p className="mt-1 text-muted-foreground">
              Mechaniker · Instandhaltungsfachmann · Ausbildung Beschriften · Digital Druck
            </p>
            <p className="mt-8 body-text text-muted-foreground">
              Schon als junger Knabe begeisterten mich Motoren und Autos. Da mein Vater auch ein
              autobegeisterter Mann war, wuchs ich automatisch in die Szene.
            </p>
            <p className="mt-5 body-text text-muted-foreground">
              So begann es zuerst mit den Velos und dann Mofas – die wir auch heute noch
              restaurieren (vor allem Puch).
            </p>
            <p className="mt-5 body-text text-muted-foreground">
              Stets bemühen wir uns, unsere Kunden zufrieden zu stellen und Fahrzeuge termingerecht
              abzuliefern, selbstverständlich mit 12 Monaten Garantie. Auch bei den Beschriftungen
              streben wir stets nach Perfektionismus und voller Kundenzufriedenheit.
            </p>
            <p className="mt-6 body-text text-foreground">
              Wir freuen uns, auch Sie zu unseren Kunden zählen zu dürfen!
            </p>
            <h3 className="mt-14 heading-sub">Geschichte</h3>
            <ol className="mt-6 space-y-5">
              {HISTORY.map(([year, text]) => (
                <li
                  key={year}
                  className="flex flex-col gap-1 border-b border-border pb-5 sm:flex-row sm:gap-6"
                >
                  <span className="shrink-0 font-display text-2xl whitespace-nowrap text-accent sm:w-40">
                    {year}
                  </span>
                  <span className="body-text text-muted-foreground">{text}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <p className="body-text text-muted-foreground">
                Mit bestem Dank für Ihr Vertrauen in unsere Firma
              </p>
              <p className="mt-3 font-display text-2xl text-primary">
                Weber Autohandel & Beschriftungen
              </p>
              <p className="mt-1 body-text text-foreground">Patrick Weber</p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-sm md:max-w-none">
            <ReliableImage
              src={patrick.url}
              width={768}
              height={1024}
              alt="Patrick Weber, Inhaber von Weber Autohandel & Beschriftungen"
              loading="lazy"
              className="w-full rounded-md border border-border bg-card shadow-sm"
            />
          </figure>
        </div>
        <div className="mt-16">
          <p className="mb-2 kicker text-primary">Partner</p>
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
  "#ueber-uns .about-copy > *",
  "#ueber-uns figure",
  "#ueber-uns li",
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
      <p className="mb-2 kicker text-primary">{kicker}</p>
      <h2 className="heading-section">{title}</h2>
    </div>
  );
}

function Ankauf() {
  return (
    <section id="ankauf" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-6 py-24 md:grid-cols-2">
      <div>
        <SectionHead kicker="Ankauf" title="Sie möchten Ihr Auto verkaufen?" />
        <p className="body-text text-muted-foreground">
          Senden Sie uns ein paar Angaben und Fotos zu Ihrem Fahrzeug – wir melden uns mit einem fairen Angebot.
        </p>
        <a href={TEL_HREF} aria-label={`Anrufen: ${TEL}`} className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
          <Phone className="h-5 w-5" /> Lieber anrufen: {TEL}
        </a>
      </div>
      <EnquiryForm kind="vehicle" />
    </section>
  );
}
