import { toast } from "sonner";
import { useEffect, useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Camera, LoaderCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReliableImage } from "@/components/reliable-image";
import { enquiryFromForm, enquirySchema, photoError, PRINT_TYPES, SELECTS } from "@/lib/enquiry-schema";
import { submitEnquiry } from "@/lib/enquiries.functions";

const input = "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-foreground outline-none focus:border-primary";

function PhotoPreview({ file, remove }: { file: File; remove: () => void }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return <div className="relative aspect-square overflow-hidden rounded-sm bg-muted">
    {url && <ReliableImage src={url} width={160} height={160} alt={file.name} className="h-full w-full object-cover" />}
    <Button type="button" variant="secondary" size="icon" aria-label={`Foto entfernen: ${file.name}`} onClick={remove} className="absolute right-1 top-1 h-7 w-7"><X /></Button>
  </div>;
}

export function EnquiryForm({ kind }: { kind: "contact" | "vehicle" | "print" }) {
  const send = useServerFn(submitEnquiry);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const parsed = enquirySchema.safeParse(enquiryFromForm(data));
    const invalid = photoError(photos);
    if (!parsed.success || invalid) {
      const message = invalid ?? (!parsed.success ? parsed.error.issues[0]?.message : null) ?? "Bitte prüfen Sie Ihre Angaben.";
      setFeedback({ ok: false, message }); toast.error(message);
      return;
    }
    photos.forEach((file) => data.append("photos", file));
    setPending(true);
    setFeedback(null);
    try {
      const result = await send({ data });
      setFeedback(result);
      if (result.ok) { form.reset(); setPhotos([]); toast.success(result.message); } else toast.error(result.message);
    } catch {
      const message = "Die Verbindung wurde unterbrochen. Bitte versuchen Sie es erneut.";
      setFeedback({ ok: false, message }); toast.error(message);
    } finally { setPending(false); }
  };
  return <form onSubmit={submit} aria-label={kind === "contact" ? "Kontaktformular" : kind === "print" ? "Offertanfrage Eigenes Motiv" : "Fahrzeuganfrage"} className="grid gap-4 sm:grid-cols-2">
    <input type="hidden" name="kind" value={kind} />
    <div className="hidden" aria-hidden="true"><input name="website" tabIndex={-1} autoComplete="off" /></div>
    {kind === "vehicle" && <>
      {["Marke", "Modell", "Jahrgang", "Kilometer"].map((field) => <label key={field} className="grid gap-1.5 text-sm font-medium">{field}{field === "Marke" ? " *" : ""}<input name={field} required={field === "Marke"} maxLength={field === "Jahrgang" ? 4 : field === "Kilometer" ? 12 : 100} inputMode={field === "Jahrgang" || field === "Kilometer" ? "numeric" : "text"} className={input} /></label>)}
      {SELECTS.map((select) => <label key={select.name} className="grid gap-1.5 text-sm font-medium">{select.name}<select name={select.name} defaultValue="" className={input}><option value="">Bitte wählen</option>{select.options.map((option) => <option key={option}>{option}</option>)}</select></label>)}
    </>}
    {kind === "print" && <>
      <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">Motiv *<textarea name="Motiv" required maxLength={300} rows={2} placeholder="z. B. Firmenlogo, Foto vom Hund, Schriftzug …" className={input} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Wunschfarbe<input name="Wunschfarbe" maxLength={100} className={input} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Wunschgrösse<input name="Wunschgrösse" maxLength={100} placeholder="z. B. 30 × 20 cm" className={input} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Anzahl<input name="Anzahl" inputMode="numeric" maxLength={10} className={input} /></label>
      <label className="grid gap-1.5 text-sm font-medium">Art des Druckes<select name="Druckart" defaultValue="" className={input}><option value="">Bitte wählen</option>{PRINT_TYPES.map((o) => <option key={o}>{o}</option>)}</select></label>
    </>}
    <label className="grid gap-1.5 text-sm font-medium">Name *<input name="Name" autoComplete="name" required maxLength={100} className={input} /></label>
    <label className="grid gap-1.5 text-sm font-medium">E-Mail *<input name="E-Mail" type="email" autoComplete="email" required maxLength={255} className={input} /></label>
    <label className="grid gap-1.5 text-sm font-medium">Telefon<input name="Telefon" type="tel" autoComplete="tel" maxLength={40} className={input} /></label>
    {kind === "contact" && <label className="grid gap-1.5 text-sm font-medium">Betreff<input name="Betreff" maxLength={200} className={input} /></label>}
    <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">{kind === "contact" ? "Nachricht *" : "Bemerkungen"}<textarea name={kind === "contact" ? "Nachricht" : "Bemerkungen"} required={kind === "contact"} maxLength={4000} rows={4} className={input} /></label>
    {kind !== "contact" && <>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border-2 border-dashed border-input px-4 py-6 text-center hover:border-primary sm:col-span-2">
        <Camera className="h-6 w-6 text-primary" /><span className="font-semibold">{kind === "print" ? "Bilder hinzufügen" : "Fotos hinzufügen"}</span><span className="text-sm text-muted-foreground">Bis zu 10 Fotos · JPG, PNG, WebP · max. 5 MB pro Foto</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" aria-label="Fotos hinzufügen" onChange={(event) => {
          const next = [...photos, ...Array.from(event.target.files ?? [])];
          const error = photoError(next);
          if (error) setFeedback({ ok: false, message: error });
          else { setPhotos(next); setFeedback(null); }
          event.target.value = "";
        }} />
      </label>
      {photos.length > 0 && <div className="grid grid-cols-4 gap-2 sm:col-span-2">{photos.map((file, index) => <PhotoPreview key={`${file.name}-${index}`} file={file} remove={() => setPhotos((previous) => previous.filter((_, i) => i !== index))} />)}</div>}
    </>}
    <Button type="submit" disabled={pending} className="h-12 rounded-sm sm:col-span-2">{pending ? <LoaderCircle className="animate-spin" /> : <Send />}{pending ? "Wird gesendet …" : kind === "print" ? "Offerte anfragen" : "Anfrage senden"}</Button>
    {feedback && <p role={feedback.ok ? "status" : "alert"} className={`text-sm sm:col-span-2 ${feedback.ok ? "font-semibold text-accent" : "text-destructive"}`}>{feedback.message}</p>}
  </form>;
}