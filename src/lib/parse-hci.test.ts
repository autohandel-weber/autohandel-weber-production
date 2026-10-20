import { describe, it, expect } from "vitest";
import { parseHciHtml } from "./parse-hci";

const html = `<ul><li><article><a href="/de/hci/v2/4250/detail/20887185"><img src="https://images.autoscout24.ch/public/listing/185/20887185/1.jpg?w=1920"/><style>.x{}</style><p>MAZDA CX-5 2.0</p><p>CHF\u00a012&#x27;900.-</p><span>Calendar icon</span><span>03.2014</span><span>Gas station icon</span><span>Benzin</span><span>Road icon</span><span>122&#x27;299 km</span></a></article></li></ul>`;

describe("parseHciHtml", () => {
  it("liest ein AutoScout24-Inserat mit Link, Preis und Daten", () => {
    const [car] = parseHciHtml(html);
    expect(car.url).toBe("https://www.autoscout24.ch/de/hci/v2/4250/detail/20887185");
    expect(car.price).toBe("CHF 12'900.-");
    expect(car.km).toBe("122'299 km");
    expect(car.date).toBe("03.2014");
  });
});
