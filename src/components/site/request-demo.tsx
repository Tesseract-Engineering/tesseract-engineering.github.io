"use client";

import { ArrowRight } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contact, contactLinks } from "@/lib/site";

/*
  "Request a demo" starts an email. A bare mailto: link does nothing for people without a mail app,
  so the buttons open a dialog offering Gmail, Outlook, the mail app, or the address to copy.
  Each button is still a real mailto: link, so it works before JavaScript loads.
*/

const OpenContext = createContext<() => void>(() => {});

export function RequestDemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard?.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <OpenContext.Provider value={() => setOpen(true)}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-4 rounded-box border-0 bg-white p-7 shadow-[0_40px_80px_-30px_rgb(15_14_13/0.45)] sm:max-w-[440px]">
          <DialogHeader className="gap-3 text-left">
            <DialogTitle className="font-display text-[2rem] font-normal">{contact.dialogTitle}</DialogTitle>
            <DialogDescription className="text-base text-stone">{contact.dialogText}</DialogDescription>
          </DialogHeader>
          <div className="flex min-w-0 items-center justify-between gap-2.5 rounded-md bg-paper-2 px-3 py-2.5 font-mono text-sm font-medium">
            <span className="break-all">{contact.email}</span>
            <Button variant="outline" size="sm" onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="grid gap-2.5">
            <Button asChild size="cta">
              <a href={contactLinks.gmail} target="_blank" rel="noopener">
                Open in Gmail
              </a>
            </Button>
            <Button asChild variant="outline" size="cta">
              <a href={contactLinks.outlook} target="_blank" rel="noopener">
                Open in Outlook
              </a>
            </Button>
            <Button asChild variant="outline" size="cta">
              <a href={contactLinks.mailto}>Use my mail app</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </OpenContext.Provider>
  );
}

export function RequestDemoButton({
  variant = "default",
  size = "cta",
  className,
}: {
  variant?: "default" | "inverted";
  size?: "cta" | "sm";
  className?: string;
}) {
  const open = useContext(OpenContext);
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <a
        href={contactLinks.mailto}
        onClick={(e) => {
          e.preventDefault();
          open();
        }}
        className="group"
      >
        {contact.cta}
        <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-[3px]" />
      </a>
    </Button>
  );
}
