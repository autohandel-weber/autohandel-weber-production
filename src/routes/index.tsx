import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import { ArrowDown, ArrowRight, CarFront, CircleGauge, ClipboardCheck, Menu, Phone, Snowflake, Warehouse, Wrench, X } from "lucide-react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { ReliableImage } from "@/components/reliable-image";
import { EnquiryForm } from "@/components/enquiry-form";
import { Button } from "@/components/ui/button";
import { ContactActions } from "@/components/contact-actions";
import { selectHomepageCars } from "@/lib/homepage-data";
import logoSrc from "@/assets/images/logo-weber.webp";
import { getCars } from "@/lib/cars.functions";
import b2Src from "@/assets/images/beschriftung-2.webp";
import b4Src from "@/assets/images/beschriftung-4.webp";
import patrickSrc from "@/assets/images/patrick-weber.webp";
import garageSrc from "@/assets/images/garage.webp";

const logo = { url: logoSrc };
const patrick = { url: patrickSrc };
const garage = { url: garageSrc };
const gallery = [
  { url: b2Src, width: 1400, height: 722, alt: "Seitenbeschriftung Bistro Kuhblick" },
  { url: b4Src, width: 1400, height: 990, alt: "Honda Rennmotorrad mit Dekor" },
];

const carsQuery = queryOptions({ queryKey: ["cars"], queryFn: () => getCars(), staleTime: 5 * 60 * 1000 });

const MORE_CARS = "https://www.autoscout24.ch/de/s/seller-63333";
const TEL = "079 422 55 41";
const TEL_HREF = "tel:+41794225541";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weber – Autohandel, Garage & Beschriftungen in Reigoldswil" },
      {
        name: "description",
        content:
          "Occasionen, Auto-Ankauf, Reparaturen aller Marken, MFK, Pneuwechsel und Pneulagerung sowie Beschriftungen von Patrick Weber in Reigoldswil BL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Weber Autohandel & Beschriftungen" },
      {
        property: "og:description",
        content: "Autohandel, Garage & Service sowie Beschriftungen und Druck in Reigoldswil BL.",
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(carsQuery),
  component: Index,
});

const nav = [
  ["fahrzeuge", "Fahrzeuge"],
  ["garage-service", "Garage & Service"],
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
  const { visible: visibleCars, remaining } = selectHomepageCars(cars);
  // Menü verschwindet beim Runterscrollen und kommt beim Hochscrollen zurück.
  const headerHidden = useHideOnScroll() && !menuOpen;
  useReveal();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header inert={headerHidden} className={`fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur transition-transform duration-300 ease-out ${headerHidden ? "-translate-y-full" : "translate-y-0"}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6 xl:flex xl:justify-between xl:gap-6">
          <a href="#top" className="shrink-0">
            <ReliableImage src={logo.url} width={1200} height={640} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden min-w-0 items-center gap-6 whitespace-nowrap text-sm font-medium uppercase xl:flex xl:gap-6">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            ))}
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
              className="shrink-0 rounded-sm text-foreground hover:bg-muted xl:hidden"
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        <div inert={!menuOpen} className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out xl:hidden ${menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <nav className="max-h-[calc(100dvh-6rem)] min-h-0 overflow-y-auto">
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

      {/* Alle drei Angebotsbereiche sind beim Einstieg sichtbar. */}
      <section id="top" className="bg-ink pt-20 text-ink-foreground">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-12 md:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="hero-in mb-4 kicker text-accent">Seit 2004 · Reigoldswil BL</p>
            <h1 className="hero-in font-display text-5xl leading-none sm:text-6xl md:text-7xl" style={{ animationDelay: "150ms" }}>Weber Autohandel<br />Garage & Beschriftungen</h1>
            <p className="hero-in mx-auto mt-5 max-w-2xl body-text text-ink-foreground/75" style={{ animationDelay: "300ms" }}>Ihr Fahrzeug kaufen, pflegen und beschriften – persönlich betreut von Patrick Weber.</p>
          </div>
          <div className="hero-in mt-10 grid gap-6 md:grid-cols-3" style={{ animationDelay: "450ms" }}>
            {[
              { title: "Autohandel", text: "Occasionen mit 12 Monaten Garantie · Auto-Ankauf", src: cars[0]?.img || garageSrc, width: cars[0] ? 800 : 1400, height: cars[0] ? 600 : 571, alt: cars[0]?.title || "Garage Weber mit Fahrzeugen", target: "fahrzeuge", label: "Fahrzeuge ansehen" },
              { title: "Garage & Service", text: "Reparaturen · MFK · Pneus · Autoglas · Diagnose · Klima", src: garageSrc, width: 1400, height: 571, alt: "Garage Weber in Reigoldswil", target: "garage-service", label: "Zum Garagenservice" },
              { title: "Beschriftungen & Druck", text: "Fahrzeugbeschriftungen · Aufkleber · Eigene Motive", src: b2Src, width: 1400, height: 722, alt: "Fahrzeugbeschriftung Bistro Kuhblick", target: "beschriftungen", label: "Beschriftungen ansehen" },
            ].map((item) => (
              <article key={item.target} className="min-w-0 overflow-hidden rounded-md border border-ink-foreground/20">
                <a href={`#${item.target}`} tabIndex={-1} aria-hidden="true"><ReliableImage src={item.src} width={item.width} height={item.height} alt={item.alt} className="aspect-[16/7] w-full object-cover" /></a>
                <div className="p-5">
                  <h2 className="font-display text-3xl">{item.title}</h2>
                  <p className="mt-2 min-h-12 text-sm text-ink-foreground/75">{item.text}</p>
                  <Button asChild variant="ghost" className="mt-3 h-11 max-w-full px-0 text-ink-foreground hover:bg-transparent hover:text-accent"><a href={`#${item.target}`}>{item.label}<ArrowDown /></a></Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Fahrzeuge */}
      <div className="bg-secondary">
      <section id="fahrzeuge" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16">
        <SectionHead kicker="Occasionen" title="Unsere Fahrzeuge" />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {visibleCars.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <ReliableImage src={c.img} width={800} height={600} referrerPolicy="no-referrer" alt={c.title} loading="lazy" className="h-full w-full object-contain" />
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
          <Button asChild className="h-auto min-h-12 max-w-full whitespace-normal rounded-sm px-6 py-3"><a href={MORE_CARS} target="_blank" rel="noopener noreferrer">
            {remaining > 0 ? `${remaining} weitere auf AutoScout24 ansehen` : "Alle Fahrzeuge auf AutoScout24 ansehen"}<ArrowRight />
          </a></Button>
        </div>
      </section>
      </div>

      <Ankauf />

      <section id="garage-service" className="scroll-mt-20 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHead kicker="Für alle Marken" title="Garage & Service" />
          <div className="mb-10 grid gap-6 md:grid-cols-2">
            <article className="flex items-start gap-4 rounded-md border border-accent bg-card p-6">
              <Snowflake className="mt-1 h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0"><p className="mb-2 kicker text-primary">Jetzt saisonal</p><h3 className="heading-sub">Pneuwechsel</h3><p className="mt-3 body-text text-muted-foreground">Zeit für Winterpneus: Wir wechseln Ihre Pneus und machen Ihr Fahrzeug bereit für die kalte Jahreszeit.</p></div>
            </article>
            <article className="flex items-start gap-4 rounded-md border border-accent bg-card p-6">
              <Warehouse className="mt-1 h-8 w-8 shrink-0 text-primary" />
              <div className="min-w-0"><p className="mb-2 kicker text-primary">Platz schaffen</p><h3 className="heading-sub">Pneus lagern</h3><p className="mt-3 body-text text-muted-foreground">Kein Platz zu Hause? Lassen Sie Ihre Pneus bei uns bis zum nächsten Wechsel lagern.</p></div>
            </article>
          </div>
          <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Wrench, title: "Reparaturen aller Marken", text: "Reparaturen und Unterhalt für Ihr Fahrzeug." },
              { icon: ClipboardCheck, title: "MFK-Service", text: "Bereitstellung und Vorführung zur Motorfahrzeugkontrolle." },
              { icon: CircleGauge, title: "Reifenservice", text: "Service rund um Ihre Reifen und Räder." },
              { icon: CarFront, title: "Autoglas", text: "Scheibenservice für Ihr Fahrzeug." },
              { icon: Wrench, title: "Diagnose", text: "Fahrzeugdiagnose bei Störungen und Fehlermeldungen." },
              { icon: Snowflake, title: "Klimaservice", text: "Service für die Klimaanlage Ihres Fahrzeugs." },
            ].map((service) => <article key={service.title} className="flex min-w-0 items-start gap-4 border-b border-border pb-6"><service.icon className="mt-1 h-6 w-6 shrink-0 text-primary" /><div className="min-w-0"><h3 className="text-lg font-semibold">{service.title}</h3><p className="mt-2 text-muted-foreground">{service.text}</p></div></article>)}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 rounded-sm px-6"><a href="#kontakt">Termin anfragen<ArrowRight /></a></Button>
            <Button asChild variant="outline" className="h-12 rounded-sm px-6"><a href={TEL_HREF}><Phone />{TEL}</a></Button>
          </div>
        </div>
      </section>

      <section id="beschriftungen" className="scroll-mt-20">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <SectionHead kicker="Weber Beschriftungen" title="Beschriftungen & Druck" />
          <p className="max-w-3xl body-text text-muted-foreground">Ihr Logo auf Fahrzeugen, Schildern oder Textilien. Dazu Aufkleber, Plakate und wetterbeständiger Digitaldruck – mit Ihrem Motiv, in Ihrer Wunschgrösse.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {gallery.map((g) => <figure key={g.url} className="overflow-hidden rounded-md"><ReliableImage src={g.url} width={g.width} height={g.height} alt={g.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" /></figure>)}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild className="h-12 rounded-sm px-6"><Link to="/shop" hash="offerte">Offerte verlangen<ArrowRight /></Link></Button>
            <Button asChild variant="outline" className="h-12 rounded-sm px-6"><Link to="/shop">Shop & Preise<ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section id="ueber-uns" className="scroll-mt-20 bg-secondary"><div className="mx-auto max-w-6xl px-6 py-20">
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
          </div>
          <figure className="mx-auto w-full max-w-sm md:max-w-none">
            <ReliableImage
              src={patrick.url}
              width={800}
              height={1000}
              alt="Patrick Weber, Inhaber von Weber Autohandel & Beschriftungen"
              loading="lazy"
              className="w-full rounded-md border border-border bg-card shadow-sm"
            />
          </figure>
        </div>

        {/* Firmengeschichte – auf dem Handy unterhalb der Geschichte das Garagenbild */}
        <div className="history mt-16 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <h3 className="heading-sub">Geschichte</h3>
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
          </div>
          <figure className="mx-auto w-full max-w-sm lg:max-w-none">
            <ReliableImage
              src={garage.url}
              width={1400}
              height={571}
              alt="Garage Weber an der Seewenstrasse 2 in Reigoldswil"
              loading="lazy"
              className="w-full rounded-md border border-border bg-card shadow-sm"
            />
          </figure>
        </div>

        <div className="mt-10">
          <p className="body-text text-muted-foreground">
            Mit bestem Dank für Ihr Vertrauen in unsere Firma
          </p>
          <p className="mt-3 font-display text-2xl text-primary">
            Weber Autohandel & Beschriftungen
          </p>
          <p className="mt-1 body-text text-foreground">Patrick Weber</p>
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
      </div></section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-20 bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-3">
          <div>
            <p className="mb-2 kicker text-accent">Kontakt</p>
            <h2 className="heading-section">So erreichen Sie uns</h2>
          </div>
          <div>
            <p className="font-semibold">Autohandel & Garage</p>
            <p className="text-ink-foreground/70">Seewenstrasse 2<br />4418 Reigoldswil</p>
            <p className="mt-6 font-semibold">Beschriftungen</p>
            <p className="text-ink-foreground/70">Hohlegasse 37<br />4104 Oberwil</p>
          </div>
          <ContactActions />
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

    </div>
  );
}

const REVEAL_SELECTOR = [
  "#fahrzeuge > :not(.grid)",
  "#fahrzeuge .grid > a",
  "#ankauf > div",
  "#ankauf form > *",
  "#garage-service article",
  "#garage-service h2",
  "#garage-service .mt-10",
  "#beschriftungen h2",
  "#beschriftungen p",
  "#beschriftungen figure",
  "#ueber-uns .about-copy > *",
  "#ueber-uns .history > *",
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
    <section id="ankauf" className="mx-auto grid max-w-7xl scroll-mt-20 gap-8 px-6 py-16 md:grid-cols-2">
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
