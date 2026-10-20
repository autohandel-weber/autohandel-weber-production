export type Car = {
  title: string;
  url: string;
  img: string;
  price: string;
  date: string;
  fuel: string;
  km: string;
  power: string;
  gear: string;
};

const unescape = (s: string) =>
  s
    .replace(/&#x27;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\u00a0/g, " ")
    .trim();

export function parseHciHtml(html: string): Car[] {
  const articles = html.match(/<article[\s\S]*?<\/article>/g) ?? [];
  return articles
    .map((raw) => {
      const a = raw.replace(/<style[\s\S]*?<\/style>/g, "");
      const href = a.match(/href="([^"]*\/detail\/\d+)"/)?.[1];
      const img = a.match(/src="(https:\/\/images\.autoscout24\.ch[^"]+)"/)?.[1] ?? "";
      const texts = [...a.matchAll(/>([^<>]+)</g)].map((m) => unescape(m[1])).filter(Boolean);
      const after = (label: string) => {
        const i = texts.indexOf(label);
        return i >= 0 ? (texts[i + 1] ?? "") : "";
      };
      if (!href) return null;
      return {
        title: texts[0] ?? "",
        url: href.startsWith("http") ? href : `https://www.autoscout24.ch${href}`,
        img: img.replace(/w=\d+/, "w=800"),
        price: texts.find((t) => t.startsWith("CHF")) ?? "Preis auf Anfrage",
        date: after("Calendar icon"),
        fuel: after("Gas station icon"),
        km: after("Road icon"),
        power: after("Vehicle power icon"),
        gear: after("Transmission icon"),
      };
    })
    .filter((c): c is Car => c !== null);
}
