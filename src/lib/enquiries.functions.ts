import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { enquiryFromForm, enquirySchema, photoError } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    if (!(input instanceof FormData)) throw new Error("Ungültige Anfrage.");
    return input;
  })
  .handler(async ({ data }) => {
    const request = getRequest();
    const origin = request.headers.get("origin");
    if (!origin || new URL(origin).host !== new URL(request.url).host) return { ok: false, message: "Bitte senden Sie die Anfrage direkt über diese Webseite." };
    const parsed = enquirySchema.safeParse(enquiryFromForm(data));
    if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message ?? "Bitte prüfen Sie Ihre Angaben." };
    const files = data.getAll("photos").filter((file): file is File => file instanceof File);
    const invalid = photoError(files);
    if (invalid) return { ok: false, message: invalid };
    // Check image magic bytes, not only the browser-supplied content type.
    for (const file of files) {
      const bytes = new Uint8Array(await file.slice(0, 12).arrayBuffer());
      const jpeg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
      const png = bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71;
      const webp = String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
      if (!(file.type === "image/jpeg" && jpeg || file.type === "image/png" && png || file.type === "image/webp" && webp)) return { ok: false, message: "Ein Foto ist beschädigt oder hat ein ungültiges Format." };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();
    const paths: string[] = [];
    try {
      for (const [index, file] of files.entries()) {
        const extension = file.type === "image/jpeg" ? "jpg" : file.type === "image/png" ? "png" : "webp";
        const path = `${id}/${index}.${extension}`;
        const { error } = await supabaseAdmin.storage.from("enquiry-photos").upload(path, file, { contentType: file.type });
        if (error) throw error;
        paths.push(path);
      }
      const value = parsed.data;
      const { error } = await supabaseAdmin.from("contact_submissions").insert({ id, kind: value.kind, name: value.name, email: value.email, phone: value.phone, subject: value.subject, message: value.message, vehicle: value.kind === "vehicle" ? value.vehicle : {}, details: value.kind === "print" ? value.print : {}, photo_paths: paths, email_status: "not_configured" });
      if (error) throw error;
      return { ok: true, message: "Vielen Dank! Ihre Anfrage ist bei uns eingegangen – wir melden uns so bald wie möglich." };
    } catch {
      if (paths.length) await supabaseAdmin.storage.from("enquiry-photos").remove(paths);
      return { ok: false, message: "Ihre Anfrage konnte nicht gespeichert werden. Bitte versuchen Sie es erneut oder rufen Sie uns an." };
    }
  });