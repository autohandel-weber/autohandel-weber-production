import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Prominent feedback panel shared by every form on the site (contact, vehicle
 * purchase, print quote, shop order) so a submitted form always answers with
 * the same large, unmistakable message instead of a small line of text.
 */
export function FormSuccess({ message, kicker = "Nachricht gesendet", onReset }: { message: string; kicker?: string; onReset?: () => void }) {
  const body = message.replace(/^Vielen Dank[!. ]*/i, "");
  return (
    <div role="status" className="rounded-lg border border-primary/30 bg-primary/5 px-6 py-10 text-center sm:px-10">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-9 w-9" />
      </span>
      <p className="mt-5 kicker text-primary">{kicker}</p>
      <h4 className="mt-2 heading-section text-foreground">Vielen Dank!</h4>
      <p className="mx-auto mt-4 max-w-md body-text text-muted-foreground">{body}</p>
      {onReset && (
        <Button type="button" variant="outline" className="mt-8 h-11 rounded-sm px-6" onClick={onReset}>
          Neue Anfrage schreiben
        </Button>
      )}
    </div>
  );
}

export function FormError({ message, className = "" }: { message: string; className?: string }) {
  return (
    <div role="alert" className={`flex items-start gap-4 rounded-lg border border-destructive/40 bg-destructive/5 p-5 ${className}`}>
      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-destructive" />
      <div>
        <p className="font-semibold text-destructive">Das hat leider nicht geklappt</p>
        <p className="mt-1 body-text text-foreground">{message}</p>
      </div>
    </div>
  );
}
