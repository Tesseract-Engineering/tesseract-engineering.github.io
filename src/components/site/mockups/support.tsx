import { Mini, WindowFrame, reveal } from "./window-frame";

export function SupportMockup() {
  return (
    <WindowFrame
      title="Support · inbox"
      label="Mock-up: a support inbox where Tesseract recognises a repeat ticket, cites the earlier fix and drafts a reply waiting for approval."
      bodyClassName="gap-0 p-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]"
    >
      <ul className="hidden content-start gap-1 border-r border-line bg-paper p-2.5 sm:grid">
        <li className="rounded-md bg-paper-2 p-2.5 text-[0.8125rem] leading-[1.4]">
          <b className="block font-mono text-[0.6875rem] leading-normal font-medium">TD-104</b>Soylent &middot; 429s on the public API
        </li>
        <li className="rounded-md p-2.5 text-[0.8125rem] leading-[1.4] text-stone">
          <b className="block font-mono text-[0.6875rem] leading-normal font-medium">TD-113</b>Initech &middot; SSO login loops
        </li>
      </ul>
      <div className="grid min-w-0 content-start gap-3.5 p-[clamp(16px,2.4vw,22px)]">
        <p {...reveal(0)}>
          <span className="inline-flex items-center gap-2 rounded-btn bg-forest-soft px-[11px] py-[7px] text-sm font-medium text-forest before:size-1.5 before:bg-current">
            Seen before: TD-087
          </span>
        </p>
        <p {...reveal(1)}>Same rate limit as TD-087, fixed in PR #31.</p>
        <div {...reveal(2)} className="grid gap-1.5 rounded-md bg-paper-2 px-3.5 py-3">
          <p className="label-mono text-stone">Draft reply</p>
          <p>Hi Soylent team, this is a known limit on batch traffic. A fix is rolling out to your workspace today.</p>
        </div>
        <div {...reveal(3)} className="flex flex-wrap items-center gap-2">
          <Mini primary>Approve</Mini>
          <Mini>Edit</Mini>
        </div>
      </div>
    </WindowFrame>
  );
}
