import { Mini, WindowFrame, reveal } from "./window-frame";

/** IT support in your own help desk: Tesseract recognises a repeat issue and drafts the fix for IT to approve. */
export function SupportMockup() {
  return (
    <WindowFrame
      title="Help desk · IT queue"
      label="Mock-up: an internal IT help desk where Tesseract recognises a repeat VPN issue from an earlier ticket, cites the runbook and drafts a fix for the IT team to approve."
      bodyClassName="gap-0 p-0 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)]"
    >
      <ul className="hidden content-start gap-1 border-r border-line bg-paper p-2.5 sm:grid">
        <li className="rounded-md bg-paper-2 p-2.5 text-[0.8125rem] leading-[1.4]">
          <b className="block font-mono text-[0.6875rem] leading-normal font-medium">IT-2291</b>Lena Park &middot; VPN drops on Wi-Fi
        </li>
        <li className="rounded-md p-2.5 text-[0.8125rem] leading-[1.4] text-stone">
          <b className="block font-mono text-[0.6875rem] leading-normal font-medium">IT-2304</b>Diego Torres &middot; Access to staging
        </li>
      </ul>
      <div className="grid min-w-0 content-start gap-3.5 p-[clamp(16px,2.4vw,22px)]">
        <p {...reveal(0)}>
          <span className="inline-flex items-center gap-2 rounded-btn bg-forest-soft px-[11px] py-[7px] text-sm font-medium text-forest before:size-1.5 before:bg-current">
            Seen before: IT-1876
          </span>
        </p>
        <p {...reveal(1)}>Same VPN timeout as IT-1876, fixed by updating the VPN client to 6.2.</p>
        <div {...reveal(2)} className="grid gap-1.5 rounded-md bg-paper-2 px-3.5 py-3">
          <p className="label-mono text-stone">Draft reply</p>
          <p>Hi Lena, this is a known issue with the older VPN client. Update it from Self Service under VPN; it takes two minutes.</p>
          <p className="font-mono text-[0.6875rem] text-forest">IT-1876 &middot; Runbook: VPN client</p>
        </div>
        <div {...reveal(3)} className="flex flex-wrap items-center gap-2">
          <Mini primary>Approve</Mini>
          <Mini>Edit</Mini>
        </div>
      </div>
    </WindowFrame>
  );
}
