import { z } from "zod";

export const PRINT_TYPES = ["Aufkleber / Kleber", "Poster", "Blache", "T-Shirt / Sweatshirt", "Anderes"] as const;
export const ENQUIRY_RECIPIENT = "audeliab@proton.me";
export const SELECTS = [
  { name: "Getriebe", options: ["Automatik", "Handgeschaltet", "Halbautomat"] },
  { name: "Treibstoff", options: ["Benzin", "Diesel", "Hybrid", "Elektro"] },
  { name: "Fahrzeugart", options: ["Limousine", "Kombi / Van", "Cabrio", "Jeep"] },
] as const;
const text = (max: number) => z.string().trim().max(max);
export const enquirySchema = z.object({
  kind: z.enum(["contact", "vehicle", "print"]),
  name: text(100).min(1, "Bitte geben Sie Ihren Namen an."),
  email: text(255).email("Bitte geben Sie eine gültige E-Mail-Adresse an."),
  phone: text(40).regex(/^[+\d\s()./-]*$/, "Bitte prüfen Sie Ihre Telefonnummer."),
  subject: text(200),
  message: text(4000),
  website: z.literal(""),
  vehicle: z.object({
    Marke: text(100), Modell: text(100),
    Jahrgang: text(4).regex(/^$|^\d{4}$/, "Bitte geben Sie einen vierstelligen Jahrgang an."),
    Kilometer: text(12).regex(/^$|^[\d'’\s]+$/, "Bitte prüfen Sie den Kilometerstand."),
    Getriebe: z.enum(["", ...SELECTS[0].options]),
    Treibstoff: z.enum(["", ...SELECTS[1].options]),
    Fahrzeugart: z.enum(["", ...SELECTS[2].options]),
  }),
  print: z.object({
    Motiv: text(300), Wunschfarbe: text(100), Wunschgrösse: text(100),
    Anzahl: text(10).regex(/^$|^\d+$/, "Bitte geben Sie die Anzahl als Zahl an."),
    Druckart: z.enum(["", ...PRINT_TYPES]),
  }),
}).superRefine((value, ctx) => {
  if (value.kind === "contact" && !value.message) ctx.addIssue({ code: "custom", path: ["message"], message: "Bitte geben Sie eine Nachricht ein." });
  if (value.kind === "vehicle" && !value.vehicle.Marke) ctx.addIssue({ code: "custom", path: ["vehicle", "Marke"], message: "Bitte geben Sie die Fahrzeugmarke an." });
  if (value.kind === "print" && !value.print.Motiv) ctx.addIssue({ code: "custom", path: ["print", "Motiv"], message: "Bitte beschreiben Sie Ihr Motiv." });
});

export function enquiryFromForm(form: FormData) {
  const read = (name: string) => String(form.get(name) ?? "");
  return {
    kind: read("kind"), name: read("Name"), email: read("E-Mail"), phone: read("Telefon"),
    subject: read("Betreff"), message: read("Nachricht") || read("Bemerkungen"), website: read("website"),
    vehicle: { Marke: read("Marke"), Modell: read("Modell"), Jahrgang: read("Jahrgang"), Kilometer: read("Kilometer"), Getriebe: read("Getriebe"), Treibstoff: read("Treibstoff"), Fahrzeugart: read("Fahrzeugart") },
    print: { Motiv: read("Motiv"), Wunschfarbe: read("Wunschfarbe"), Wunschgrösse: read("Wunschgrösse"), Anzahl: read("Anzahl"), Druckart: read("Druckart") },
  };
}

export function photoError(files: File[]) {
  if (files.length > 10) return "Bitte wählen Sie höchstens 10 Fotos.";
  if (files.some((file) => !["image/jpeg", "image/png", "image/webp"].includes(file.type))) return "Bitte wählen Sie JPG-, PNG- oder WebP-Fotos.";
  if (files.some((file) => file.size === 0 || file.size > 5 * 1024 * 1024)) return "Jedes Foto darf höchstens 5 MB gross sein.";
  if (files.reduce((sum, file) => sum + file.size, 0) > 20 * 1024 * 1024) return "Die Fotos dürfen zusammen höchstens 20 MB gross sein.";
  return null;
}