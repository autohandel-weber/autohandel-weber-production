import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactActions() {
  return (
    <div className="flex min-w-0 flex-col items-start gap-2">
      <Button asChild variant="ghost" className="h-11 max-w-full justify-start px-3 text-base text-ink-foreground hover:bg-ink-foreground/10 hover:text-ink-foreground">
        <a href="tel:+41794225541" aria-label="Anrufen: 079 422 55 41"><Phone className="text-accent" />079 422 55 41</a>
      </Button>
      <Button asChild variant="ghost" className="h-11 max-w-full justify-start px-3 text-base text-ink-foreground/80 hover:bg-ink-foreground/10 hover:text-ink-foreground">
        <a href={"https://wa.me/41766295056?text=" + encodeURIComponent("Guten Tag, ich habe eine Anfrage.")} target="_blank" rel="noopener noreferrer" aria-label="Per WhatsApp schreiben: +41 76 629 50 56">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true" className="text-whatsapp"><path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.7-4.6A9 9 0 1 1 21 11.5Z" /><path d="M8 7.5c-.5 2.5 3 6 5.5 6.5l2-1.5-2-1-1 1c-1.5-.7-2.5-1.7-3-3l1-1-1-2Z" /></svg>
          oder WhatsApp schreiben
        </a>
      </Button>
      <a href="mailto:patrick.weber@intergga.ch" className="flex min-w-0 items-center gap-2 px-3 py-2 text-base text-ink-foreground/70 hover:text-ink-foreground"><Mail className="h-4 w-4 shrink-0" /><span className="break-all">patrick.weber@intergga.ch</span></a>
    </div>
  );
}