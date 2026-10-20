import { describe, expect, it } from "vitest";
import { ENQUIRY_RECIPIENT, enquirySchema, SELECTS, photoError } from "./enquiry-schema";

const valid = { kind: "contact", name: "Test", email: "test@example.com", phone: "", subject: "Test", message: "Anfrage", website: "", vehicle: { Marke: "", Modell: "", Jahrgang: "", Kilometer: "", Getriebe: "", Treibstoff: "", Fahrzeugart: "" } };
describe("enquiry rules", () => {
  it("uses the owner's specified recipient", () => expect(ENQUIRY_RECIPIENT).toBe("audeliab@proton.me"));
  it("accepts exactly the requested transmission options", () => {
    expect(SELECTS[0].options).toEqual(["Automatik", "Handgeschaltet", "Halbautomat"]);
    expect(enquirySchema.safeParse({ ...valid, vehicle: { ...valid.vehicle, Getriebe: "Andere" } }).success).toBe(false);
  });
  it("accepts exactly the requested fuels", () => expect(SELECTS[1].options).toEqual(["Benzin", "Diesel", "Hybrid", "Elektro"]));
  it("accepts exactly the requested vehicle types", () => expect(SELECTS[2].options).toEqual(["Limousine", "Kombi / Van", "Cabrio", "Jeep"]));
  it("rejects invalid email", () => expect(enquirySchema.safeParse({ ...valid, email: "bad" }).success).toBe(false));
  it("rejects empty contact messages", () => expect(enquirySchema.safeParse({ ...valid, message: "" }).success).toBe(false));
  it("rejects vehicle offers without a brand", () => expect(enquirySchema.safeParse({ ...valid, kind: "vehicle" }).success).toBe(false));
  it("rejects more than ten photos", () => expect(photoError(Array.from({ length: 11 }, () => new File(["x"], "a.png", { type: "image/png" })))).not.toBeNull());
});