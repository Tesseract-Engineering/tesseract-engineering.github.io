"use client";

import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { contact } from "@/lib/site";

// Personal inboxes: the form asks for a work email instead.
const PERSONAL = ["gmail.com", "googlemail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com"];

type Fields = { firstName: string; lastName: string; company: string; email: string; size: string; phone: string };

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

/**
 * The book-a-demo form. With a form service endpoint configured (contact.formEndpoint), it posts
 * the details there and shows a thank-you. Without one, it opens the visitor's email app with their
 * details filled in, so no request is lost.
 */
export function DemoForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "emailed" | "failed">("idle");
  const [emailError, setEmailError] = useState<string>();
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

    if (contact.formEndpoint) {
      setState("sending");
      try {
        const res = await fetch(contact.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...data, _subject: `Demo request: ${data.company}` }),
        });
        setState(res.ok ? "sent" : "failed");
      } catch {
        setState("failed");
      }
      return;
    }

    // No form service yet: hand the details to the visitor's email app.
    const body = [
      `Name: ${data.firstName} ${data.lastName}`,
      `Company: ${data.company}`,
      `Work email: ${data.email}`,
      `Company size: ${data.size}`,
      data.phone && `Phone: ${data.phone}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(`Demo request: ${data.company}`)}&body=${encodeURIComponent(body)}`;
    setState("emailed");
  }

  if (state === "sent" || state === "emailed") {
    return (
      <div role="status" className="grid justify-items-start gap-3 rounded-box border border-line bg-white p-7">
        <CheckCircle2 className="size-8 text-forest" strokeWidth={1.6} />
        <h2 className="text-[1.5rem]">Thanks{firstName ? `, ${firstName}` : ""}.</h2>
        <p className="text-stone">
          {state === "sent"
            ? "We’ve got your request and will email you to find a time."
            : `Your email app should have opened with your details. Send it to ${contact.email} and we’ll find a time.`}
        </p>
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
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company size" htmlFor="size">
          <div className="relative">
          <select id="size" name="size" required defaultValue="" className={`${input} appearance-none pr-9`}>
            <option value="" disabled>
              Select
            </option>
            {contact.companySizes.map((s) => (
              <option key={s} value={s}>
                {s} employees
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-stone" />
          </div>
        </Field>
        <Field label="Phone number" htmlFor="phone" optional>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={input} />
        </Field>
      </div>
      {state === "failed" && (
        <p role="alert" className="text-[14px] text-[#B42318]">
          Something went wrong sending your request. Please email us at{" "}
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
