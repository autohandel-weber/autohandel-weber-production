// Aufkleber-Katalog vom bisherigen Online-Shop (Preise in CHF pro Stück).
const images = import.meta.glob<string>("/src/assets/images/shop/*.webp", { eager: true, import: "default" });
const img = (file: string): string => images[`/src/assets/images/shop/${file}`] ?? "";
export type ShopImage = { src: string; width: number; height: number };
const map = (list: { file: string; w: number; h: number }[]): ShopImage[] => list.map((i) => ({ src: img(i.file), width: i.w, height: i.h }));
const RAW = [
 {
  "group": "Fahrzeuge",
  "subtitle": "Fahrzeug-Silhouetten als Aufkleber",
  "items": [
   {
    "name": "Autos",
    "price": "80.–",
    "note": "z. B. Porsche 911, AC Cobra, Jaguar E-Type, Corvette",
    "images": [
     {
      "file": "fahrzeuge-autos-1.webp",
      "w": 150,
      "h": 104
     },
     {
      "file": "fahrzeuge-autos-2.webp",
      "w": 150,
      "h": 59
     },
     {
      "file": "fahrzeuge-autos-3.webp",
      "w": 150,
      "h": 97
     },
     {
      "file": "fahrzeuge-autos-4.webp",
      "w": 150,
      "h": 54
     }
    ]
   },
   {
    "name": "Motorräder",
    "price": "80.–",
    "note": "Bikes, Chopper, Motocross, Trike",
    "images": [
     {
      "file": "fahrzeuge-motorraeder-1.webp",
      "w": 150,
      "h": 85
     },
     {
      "file": "fahrzeuge-motorraeder-2.webp",
      "w": 150,
      "h": 148
     },
     {
      "file": "fahrzeuge-motorraeder-3.webp",
      "w": 81,
      "h": 150
     },
     {
      "file": "fahrzeuge-motorraeder-4.webp",
      "w": 117,
      "h": 150
     }
    ]
   },
   {
    "name": "Flugzeuge",
    "price": "80.–",
    "note": "Helikopter, Jumbo, Concorde",
    "images": [
     {
      "file": "fahrzeuge-flugzeuge-1.webp",
      "w": 150,
      "h": 49
     },
     {
      "file": "fahrzeuge-flugzeuge-2.webp",
      "w": 150,
      "h": 70
     },
     {
      "file": "fahrzeuge-flugzeuge-3.webp",
      "w": 150,
      "h": 65
     },
     {
      "file": "fahrzeuge-flugzeuge-4.webp",
      "w": 150,
      "h": 57
     }
    ]
   },
   {
    "name": "Lastwagen",
    "price": "80.–",
    "note": "Verschiedene Lastwagen-Motive",
    "images": [
     {
      "file": "fahrzeuge-lastwagen-1.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "fahrzeuge-lastwagen-2.webp",
      "w": 150,
      "h": 124
     },
     {
      "file": "fahrzeuge-lastwagen-3.webp",
      "w": 150,
      "h": 64
     },
     {
      "file": "fahrzeuge-lastwagen-4.webp",
      "w": 150,
      "h": 70
     }
    ]
   },
   {
    "name": "Schiffe",
    "price": "80.–",
    "note": "Boote",
    "images": [
     {
      "file": "fahrzeuge-schiffe-1.webp",
      "w": 150,
      "h": 59
     },
     {
      "file": "fahrzeuge-schiffe-2.webp",
      "w": 150,
      "h": 42
     },
     {
      "file": "fahrzeuge-schiffe-3.webp",
      "w": 150,
      "h": 57
     }
    ]
   },
   {
    "name": "Formel 1",
    "price": "80.–",
    "note": "Ferrari, Mercedes, Tyrrell",
    "images": [
     {
      "file": "fahrzeuge-formel1-1.webp",
      "w": 150,
      "h": 69
     },
     {
      "file": "fahrzeuge-formel1-2.webp",
      "w": 150,
      "h": 77
     },
     {
      "file": "fahrzeuge-formel1-3.webp",
      "w": 150,
      "h": 83
     },
     {
      "file": "fahrzeuge-formel1-4.webp",
      "w": 150,
      "h": 38
     }
    ]
   },
   {
    "name": "Go-Karts",
    "price": "80.–",
    "note": "Kart-Motive",
    "images": [
     {
      "file": "fahrzeuge-gokarts-1.webp",
      "w": 150,
      "h": 90
     },
     {
      "file": "fahrzeuge-gokarts-2.webp",
      "w": 150,
      "h": 89
     },
     {
      "file": "fahrzeuge-gokarts-3.webp",
      "w": 150,
      "h": 104
     },
     {
      "file": "fahrzeuge-gokarts-4.webp",
      "w": 150,
      "h": 104
     }
    ]
   }
  ]
 },
 {
  "group": "Tiere",
  "subtitle": "Tiermotive für Auto, Anhänger oder Wand",
  "items": [
   {
    "name": "Hunde",
    "price": "30.–",
    "note": "Verschiedene Hunde-Motive",
    "images": [
     {
      "file": "tiere-hund-1.webp",
      "w": 150,
      "h": 90
     },
     {
      "file": "tiere-hund-2.webp",
      "w": 150,
      "h": 105
     },
     {
      "file": "tiere-hund-3.webp",
      "w": 144,
      "h": 150
     },
     {
      "file": "tiere-hund-4.webp",
      "w": 103,
      "h": 150
     }
    ]
   },
   {
    "name": "Pferde",
    "price": "30.–",
    "note": "Verschiedene Pferde-Motive",
    "images": [
     {
      "file": "tiere-pferd-1.webp",
      "w": 150,
      "h": 81
     },
     {
      "file": "tiere-pferd-2.webp",
      "w": 150,
      "h": 105
     },
     {
      "file": "tiere-pferd-3.webp",
      "w": 145,
      "h": 150
     },
     {
      "file": "tiere-pferd-4.webp",
      "w": 148,
      "h": 150
     }
    ]
   },
   {
    "name": "Diverse Tiere",
    "price": "30.–",
    "note": "Wolf, Tiger, Delfin, Adler, Skorpion",
    "images": [
     {
      "file": "tiere-diverse-1.webp",
      "w": 150,
      "h": 85
     },
     {
      "file": "tiere-diverse-2.webp",
      "w": 150,
      "h": 45
     },
     {
      "file": "tiere-diverse-3.webp",
      "w": 140,
      "h": 150
     },
     {
      "file": "tiere-diverse-4.webp",
      "w": 150,
      "h": 96
     }
    ]
   }
  ]
 },
 {
  "group": "Dekor",
  "subtitle": "Comics, Tribals, Logos und mehr",
  "items": [
   {
    "name": "Comic",
    "price": "30.–",
    "note": "Tazmania, Spiderman, Caveman",
    "images": [
     {
      "file": "decor-comic-1.webp",
      "w": 150,
      "h": 115
     },
     {
      "file": "decor-comic-2.webp",
      "w": 148,
      "h": 150
     },
     {
      "file": "decor-comic-3.webp",
      "w": 113,
      "h": 150
     },
     {
      "file": "decor-comic-4.webp",
      "w": 150,
      "h": 147
     }
    ]
   },
   {
    "name": "Tribals",
    "price": "30.–",
    "note": "Tribals, Sterne, Pfeile",
    "images": [
     {
      "file": "decor-tribals-1.webp",
      "w": 150,
      "h": 37
     },
     {
      "file": "decor-tribals-2.webp",
      "w": 150,
      "h": 50
     },
     {
      "file": "decor-tribals-3.webp",
      "w": 150,
      "h": 34
     },
     {
      "file": "decor-tribals-4.webp",
      "w": 150,
      "h": 42
     }
    ]
   },
   {
    "name": "Car-Logos",
    "price": "30.–",
    "note": "Alfa Romeo, Audi, BMW und viele mehr",
    "images": [
     {
      "file": "decor-carlogos-1.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "decor-carlogos-2.webp",
      "w": 150,
      "h": 50
     },
     {
      "file": "decor-carlogos-3.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "decor-carlogos-4.webp",
      "w": 112,
      "h": 150
     }
    ]
   },
   {
    "name": "Dragons",
    "price": "30.– / 40.–",
    "note": "Drachen – ideal für Heckscheibe oder Karosserie",
    "images": [
     {
      "file": "decor-dragons-1.webp",
      "w": 150,
      "h": 104
     },
     {
      "file": "decor-dragons-2.webp",
      "w": 150,
      "h": 104
     },
     {
      "file": "decor-dragons-3.webp",
      "w": 150,
      "h": 104
     },
     {
      "file": "decor-dragons-4.webp",
      "w": 150,
      "h": 104
     }
    ]
   },
   {
    "name": "Diverse",
    "price": "30.–",
    "note": "Augen, Spinne, Yin Yang, Elvis",
    "images": [
     {
      "file": "decor-diverse-1.webp",
      "w": 150,
      "h": 128
     },
     {
      "file": "decor-diverse-2.webp",
      "w": 150,
      "h": 30
     },
     {
      "file": "decor-diverse-3.webp",
      "w": 150,
      "h": 42
     },
     {
      "file": "decor-diverse-4.webp",
      "w": 150,
      "h": 53
     }
    ]
   }
  ]
 },
 {
  "group": "Schriften",
  "subtitle": "Schriftzüge und Verkaufsschilder",
  "items": [
   {
    "name": "Schriftzüge & Schilder",
    "price": "10.– bis 40.–",
    "note": "Vtec, No Fear, Racing · Preisschilder ab 12.– · Allrad, Diesel, Klima ab 10.–",
    "images": [
     {
      "file": "schriften-diverse-1.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "schriften-diverse-2.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "schriften-diverse-3.webp",
      "w": 150,
      "h": 150
     },
     {
      "file": "schriften-diverse-4.webp",
      "w": 150,
      "h": 150
     }
    ]
   }
  ]
 }
];
export const SHOP = RAW.map((g) => ({ ...g, items: g.items.map((i) => ({ ...i, images: map(i.images) })) }));
export const DIGITALDRUCK = map([{"file": "digitaldruck-1.webp", "w": 93, "h": 93}, {"file": "digitaldruck-2.webp", "w": 93, "h": 93}, {"file": "digitaldruck-3.webp", "w": 93, "h": 93}, {"file": "digitaldruck-4.webp", "w": 93, "h": 93}]);
export const CHROME_SURCHARGE = "30.–";
