import { Lock } from "lucide-react";

import { Cite, Mini, WindowFrame, reveal } from "./window-frame";

function Avatar({ bot, children }: { bot?: boolean; children: string }) {
  return (
    <span
      className={
        bot
          ? "grid size-[34px] place-items-center rounded-md bg-ink font-display text-[1.0625rem] text-on-dark"
          : "grid size-[34px] place-items-center rounded-md bg-paper-2 text-xs font-semibold"
      }
    >
      {children}
    </span>
  );
}

function Who({ name, time, app }: { name: string; time: string; app?: boolean }) {
  return (
    <p className="text-sm font-semibold">
      {name}
      {app && (
        <span className="ml-1 rounded-[3px] bg-paper-2 px-[5px] py-[3px] align-[2px] font-mono text-[0.5625rem] leading-none font-medium tracking-[0.08em] text-stone uppercase">
          App
        </span>
      )}
      <time className="ml-1.5 text-xs font-normal text-stone">{time}</time>
    </p>
  );
}

export function MessagesMockup() {
  return (
    <WindowFrame
      title="# platform"
      label="Mock-up: Tesseract answering a question in a Slack channel, with quoted sources and a request-access button for locked documents."
    >
      <div {...reveal(0)} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3">
        <Avatar>KV</Avatar>
        <div className="grid min-w-0 gap-2">
          <Who name="Karthik Valluri" time="2:14 PM" />
          <p>@Tesseract why does billing-service still go through the auth shim?</p>
        </div>
      </div>
      <div {...reveal(1)} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3">
        <Avatar bot>T</Avatar>
        <div className="grid min-w-0 gap-2">
          <Who name="Tesseract" time="2:14 PM" app />
          <p className="font-semibold">
            billing-service still reads tenant_id from the old claim, so auth-service rewrites it for billing webhooks until billing
            verifies tokens itself.
          </p>
          <blockquote className="border-l-2 border-forest py-0.5 pl-3">
            &ldquo;Keep the compat shim until billing-service reads namespaced claims.&rdquo;
            <Cite>SBX-10 &middot; Jira &middot; Dhruv Pendharkar</Cite>
          </blockquote>
        </div>
      </div>
      <p {...reveal(2)} className="flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-stone sm:pl-[46px]">
        <Lock aria-hidden className="size-3.5" strokeWidth={1.6} /> 2 related docs are owned by Legal. <Mini>Request access</Mini>
      </p>
    </WindowFrame>
  );
}
