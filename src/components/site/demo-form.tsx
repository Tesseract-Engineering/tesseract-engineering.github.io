"use client";

import { CheckCircle2 } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site";

// Personal inboxes: the form asks for a work email instead.
const PERSONAL = ["gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com"];

type Fields = { firstName: string; lastName: string; company: string; email: string; phone: string };

const input =
  "h-11 w-full rounded-btn border border-line-2 bg-white px-3 text-[15px] text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-forest focus:ring-2 focus:ring-forest/20 aria-invalid:border-[#B42318]";

function Field({ label, htmlFor, optional, error, children }: { label: string; htmlFor: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={htmlFor} className="text-[14px] font-medium">
        {label} {optional && <span className="font-normal text-stone">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="text-[13px] text-[#B42318]">
          {error}
        </p>
      )}
    </div>
  );
}

/** Formspree's JSON reply to a rejected submission: one entry per problem, `field` set when it's one input's. */
type FormspreeErrors = { errors?: { field?: string; message: string }[] };

/**
 * The free AI audit request form. It posts the details to Formspree (contact.formEndpoint) as JSON
 * and shows a thank-you; Formspree emails the request to the team. Formspree's own errors are shown
 * against the email field, or above the button.
 */
export function DemoForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [emailError, setEmailError] = useState<string>();
  const [formError, setFormError] = useState<string>();
  const [firstName, setFirstName] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as unknown as Fields;

    const domain = data.email.split("@")[1]?.toLowerCase().trim();
    if (domain && PERSONAL.includes(domain)) {
      setEmailError("Please use your work email.");
      form.querySelector<HTMLInputElement>("#email")?.focus();
      return;
    }
    setEmailError(undefined);
    setFirstName(data.firstName);

    setFormError(undefined);
    setState("sending");
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        // _subject sets the email's subject line; _gotcha is the hidden spam trap (bots fill it in).
        body: JSON.stringify({ ...data, _subject: `AI audit request: ${data.company}` }),
      });
      if (res.ok) {
        setState("sent");
        return;
      }
      const { errors = [] } = (await res.json().catch(() => ({}))) as FormspreeErrors;
      const sentence = (message: string) => message.replace(/\.$/, "");
      const forEmail = errors.find((err) => err.field === "email");
      if (forEmail) {
        setEmailError(`Please check your email: it ${sentence(forEmail.message)}.`);
        form.querySelector<HTMLInputElement>("#email")?.focus();
        setState("idle");
        return;
      }
      setFormError(errors.map((err) => sentence(err.message)).join(". ") || undefined);
      setState("failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div role="status" className="grid justify-items-start gap-3 rounded-box border border-line bg-white p-7">
        <CheckCircle2 className="size-8 text-forest" strokeWidth={1.6} />
        <h2 className="text-[1.5rem]">Thanks{firstName ? `, ${firstName}` : ""}.</h2>
        <p className="text-stone">We’ve got your request and will email you to find a time.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName">
          <input id="firstName" name="firstName" required autoComplete="given-name" className={input} />
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <input id="lastName" name="lastName" required autoComplete="family-name" className={input} />
        </Field>
      </div>
      <Field label="Company name" htmlFor="company">
        <input id="company" name="company" required autoComplete="organization" className={input} />
      </Field>
      <Field label="Work email" htmlFor="email" error={emailError}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={emailError ? true : undefined}
          aria-describedby={emailError ? "email-error" : undefined}
          onChange={() => emailError && setEmailError(undefined)}
          className={input}
        />
      </Field>
      <Field label="Phone number" htmlFor="phone" optional>
        <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
      </Field>
      {/* spam trap: hidden from people and screen readers; Formspree drops any submission that fills it */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {state === "failed" && (
        <p role="alert" className="text-[14px] text-[#B42318]">
          {formError ? `${formError}. ` : "Something went wrong sending your request. "}Please try again, or email us at{" "}
          <a href={`mailto:${contact.email}`} className="underline">
            {contact.email}
          </a>
          .
        </p>
      )}
      <Button type="submit" size="cta" disabled={state === "sending"} className="w-full">
        {state === "sending" ? "Sending…" : "Submit"}
      </Button>
    </form>
  );
}
