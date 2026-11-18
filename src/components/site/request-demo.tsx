import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site";

/** "Request a demo": a link to the book-a-demo page, used in the top bar, the hero and the footer. */
export function RequestDemoButton({
  variant = "default",
  size = "cta",
  className,
}: {
  variant?: "default" | "inverted";
  size?: "cta" | "sm";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      {/* a plain link, so the demo page always opens at the top */}
      <a href={contact.href} className="group">
        {contact.cta}
        <ArrowRight aria-hidden className="transition-transform group-hover:translate-x-[3px]" />
      </a>
    </Button>
  );
}
