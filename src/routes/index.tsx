import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import logo from "@/assets/logo-weber.png.asset.json";
import { getCars } from "@/lib/cars.functions";

const carsQuery = queryOptions({ queryKey: ["cars"], queryFn: () => getCars(), staleTime: 5 * 60 * 1000 });

const HCI = "https://www.autoscout24.ch/de/hci/v2/4250/search";
const EMAIL = "patrick.weber@intergga.ch";
const TEL = "079 422 55 41";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Weber Autohandel & Beschriftungen – Occasionen in Reigoldswil" },
      {
        name: "description",
        content:
          "Geprüfte Occasionen mit 12 Monaten Garantie, Auto-Ankauf und Fahrzeugbeschriftungen von Patrick Weber in Reigoldswil BL.",
      },
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

function Index() {
  const { data: { cars } } = useSuspenseQuery(carsQuery);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-card/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#top" className="shrink-0">
            <img src={logo.url} alt="Weber AutoHandel & Beschriftungen" className="h-10 w-auto md:h-12" />
          </a>
          <nav className="hidden gap-8 text-sm font-medium uppercase tracking-wider md:flex">
            {nav.map(([id, l]) => (
              <a key={id} href={`#${id}`} className="text-muted-foreground transition-colors hover:text-primary">
                {l}
              </a>
            ))}
          </nav>
          <a href={`tel:${TEL.replace(/\s/g, "")}`} className="rounded-sm bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            {TEL}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-ink pt-20 text-ink-foreground">
        <div className="absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[24rem] w-[24rem] rounded-full bg-primary/25 blur-3xl" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-accent">Seit 2004 · Reigoldswil BL</p>
          <h1 className="font-display text-6xl leading-[0.9] md:text-8xl lg:text-9xl">
            Autohandel &<br />Beschriftungen
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-foreground/75">
            Geprüfte Occasionen mit 12 Monaten Garantie, fairer Ankauf und Fahrzeugbeschriftungen aus einer Hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#fahrzeuge" className="rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground">
              {cars.length} Fahrzeuge ansehen
            </a>
            <a href="#ankauf" className="rounded-sm border border-ink-foreground/30 px-6 py-3 font-semibold hover:border-accent">
              Auto verkaufen
            </a>
          </div>
          </div>
          <div className="rounded-xl bg-card p-4 shadow-2xl">
            <img src={logo.url} alt="Logo Weber AutoHandel & Beschriftungen" className="w-full" />
          </div>
        </div>
      </section>

      {/* Fahrzeuge */}
      <section id="fahrzeuge" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-24">
        <SectionHead kicker="Occasionen" title="Unsere Fahrzeuge" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((c) => (
            <a key={c.url} href={c.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-primary">
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img src={c.img} alt={c.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
          <a href={HCI} target="_blank" rel="noopener noreferrer" className="inline-block rounded-sm border border-border px-6 py-3 font-semibold hover:border-primary">
            Alle Fahrzeuge auf AutoScout24
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
              Neu: bedruckte Buttons 59 mm mit Clip, ab CHF 1.– pro Stück (je nach Auflage, exkl. Versand).
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
          <div className="flex flex-wrap gap-3">
            {[
              ["Garage Mory", "http://www.garagemory.ch/"],
              ["M-Automobil Service", "http://www.m-auto.ch/"],
              ["Audelia", "https://audelia.ch/"],
            ].map(([n, u]) => (
              <a key={u} href={u} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-border px-4 py-2 hover:border-primary">
                {n}
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
            <a href={`tel:${TEL.replace(/\s/g, "")}`} className="block font-display text-4xl text-accent">{TEL}</a>
            <a href={`mailto:${EMAIL}`} className="block text-ink-foreground/70 hover:text-ink-foreground">{EMAIL}</a>
          </div>
        </div>
        <p className="border-t border-ink-foreground/15 py-6 text-center text-sm text-ink-foreground/60">
          © {new Date().getFullYear()} Weber Autohandel & Beschriftungen
        </p>
      </section>
    </div>
  );
}

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">{kicker}</p>
      <h2 className="font-display text-5xl md:text-6xl">{title}</h2>
    </div>
  );
}

function Ankauf() {
  const [sent, setSent] = useState(false);
  const fields = ["Marke", "Modell", "Jahrgang", "Kilometer", "Name", "Telefon", "E-Mail"];
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [...fields, "Bemerkungen"].map((f) => `${f}: ${d.get(f) ?? ""}`).join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Auto verkaufen")}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const input = "w-full rounded-sm border border-input bg-background px-3 py-2.5 outline-none focus:border-primary";
  return (
    <section id="ankauf" className="mx-auto grid max-w-7xl scroll-mt-20 gap-12 px-6 py-24 md:grid-cols-2">
      <div>
        <SectionHead kicker="Ankauf" title="Sie möchten Ihr Auto verkaufen?" />
        <p className="text-lg text-muted-foreground">
          Senden Sie uns ein paar Angaben zu Ihrem Fahrzeug – wir melden uns mit einem fairen Angebot. Fotos können Sie gerne per E-Mail nachreichen.
        </p>
      </div>
      <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <input key={f} name={f} placeholder={f} required={["Marke", "Name"].includes(f)} className={input} />
        ))}
        <select name="Getriebe" className={input} aria-label="Getriebe">
          <option>Handschaltung</option>
          <option>Automat</option>
        </select>
        <textarea name="Bemerkungen" placeholder="Bemerkungen / Optionen" rows={3} className={`${input} sm:col-span-2`} />
        <button className="rounded-sm bg-primary px-6 py-3 font-semibold text-primary-foreground sm:col-span-2">
          {sent ? "E-Mail-Programm geöffnet" : "Anfrage senden"}
        </button>
      </form>
    </section>
  );
}
