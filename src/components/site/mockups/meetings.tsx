import { Cite, WindowFrame, reveal } from "./window-frame";

export function MeetingsMockup() {
  return (
    <WindowFrame
      title="Platform sync · live"
      label="Mock-up: a live call transcript, a question asked to Tesseract, and a cited answer shown to everyone on the call."
    >
      <p {...reveal(0)} className="label-mono inline-flex items-center gap-2 tracking-[0.08em] text-forest">
        <i className="size-[7px] animate-pulse rounded-full bg-current" />
        Transcribing &middot; everyone on the call was told
      </p>
      <div {...reveal(1)} className="grid gap-0.5 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-3">
        <b className="font-mono text-xs leading-[1.9] font-medium text-stone">Hamilton</b>
        <p>Can we just raise the export limit for Initech this week?</p>
      </div>
      <p {...reveal(2)} className="max-w-[85%] justify-self-end rounded-[12px_12px_3px_12px] bg-paper-2 px-3.5 py-2.5 font-medium">
        What happened last time we raised export limits?
      </p>
      <div {...reveal(3)} className="grid gap-1.5 rounded-md border border-line border-l-2 border-l-forest bg-white p-3.5">
        <p className="font-semibold">
          Raised for ACME in August, rolled back two days later: legacy-exporter ran out of memory on large tenants.
        </p>
        <Cite>INC-12 &middot; postmortem &middot; Platform team</Cite>
      </div>
    </WindowFrame>
  );
}
