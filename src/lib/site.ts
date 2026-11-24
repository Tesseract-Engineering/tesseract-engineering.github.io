/**
 * Site copy and settings in one place. Edit text here; the components read from it.
 * (The integration mock-ups are markup, so their sample conversations live in
 * `src/components/site/mockups/`.)
 */

export const site = {
  name: "Tesseract",
  url: "https://tesseract-engineering.github.io",
  description:
    "Enterprise knowledge infrastructure tuned to your company. Tesseract maps your people, projects and decisions into a knowledge graph in your own cloud, then builds it into Slack, Docs, meetings and support.",
  legalName: "Tesseract Engineering Inc.",
  /**
   * What Tesseract is, in the words the page itself uses. Read by search engines and AI agents
   * (JSON-LD `knowsAbout` and `keywords`, llms.txt); keep each term one that appears on the page.
   */
  productTerms: ["enterprise knowledge infrastructure", "knowledge graph"],
} as const;

/**
 * The hero is one paragraph at headline size, after anthropic.com: `lead` is the headline sentence,
 * `rest` runs straight on in a lighter style.
 */
export const hero = {
  lead: "Put your company knowledge to work.",
  rest: "Organizations hold years of decisions, systems and expertise that no one person can find. Tesseract brings it together and delivers it inside the tools your people already use, secure by design.",
} as const;

export const integrations = {
  title: "Built into the tools your team already uses.",
  lede: "Tesseract meets your team where they work, and grows with what your company needs.",
  tabs: [
    {
      id: "messages",
      label: "Messages",
      title: "Ask anything. Get a cited answer.",
      text: "Engineers ask in Slack or Teams and get answers cited from specs, change orders and past decisions.",
    },
    {
      id: "documents",
      label: "Documents",
      title: "Review a contract against your playbook.",
      text: "Lawyers review contracts in Word or Google Docs, and Tesseract flags clauses that break your playbook, citing the terms you’ve agreed to before.",
    },
    {
      id: "meetings",
      label: "Meetings",
      title: "Answers in the meeting, while it’s happening.",
      text: "Finance asks mid-call in Zoom or Google Meet and gets the numbers, from contracts and past spend, on screen for everyone.",
    },
    {
      id: "support",
      label: "IT support",
      title: "IT answers that know the history.",
      text: "When someone hits a problem a colleague already solved, Tesseract finds that ticket in Jira Service Management or ServiceNow and offers the fix that worked, one click for IT to apply.",
    },
  ],
} as const;

/**
 * The tools Tesseract works across, for the hub diagram above the integrations: the Microsoft and
 * Google suites as a whole, plus the tools most companies run on. Each is shown as its logo alone,
 * centred in a same-size tile; `box` is the [width, height] the logo is fitted into, so wide
 * wordmarks and square icons carry similar weight. Logos are each company's trademark, from
 * Wikimedia Commons.
 */
export const apps = [
  { name: "Slack", logo: "/logos/apps/slack.svg", box: [34, 34] },
  { name: "Microsoft 365", logo: "/logos/apps/microsoft-365.svg", box: [34, 34] },
  { name: "Google Workspace", logo: "/logos/apps/google-workspace.svg", box: [118, 22] },
  { name: "Zoom", logo: "/logos/apps/zoom.svg", box: [80, 20] },
  { name: "GitHub", logo: "/logos/apps/github.svg", box: [34, 34] },
  { name: "Jira", logo: "/logos/apps/jira.svg", box: [80, 30] },
  { name: "Confluence", logo: "/logos/apps/confluence.svg", box: [34, 34] },
  { name: "Salesforce", logo: "/logos/apps/salesforce.svg", box: [60, 42] },
  { name: "Zendesk", logo: "/logos/apps/zendesk.svg", box: [58, 42] },
  { name: "ServiceNow", logo: "/logos/apps/servicenow.svg", box: [110, 18] },
] as const;

export type IntegrationId = (typeof integrations.tabs)[number]["id"];

export const security = {
  title: "Your cloud. Your data. Your permissions.",
  // The questions a security reviewer asks, each answered in a line. Confirm "Nowhere." and
  // "nothing is copied to us" with the team before launch.
  questions: [
    { icon: "cloud", q: "Where does your data go?", a: "Nowhere. Tesseract collects and stores it inside your own cloud, and nothing is copied to us." },
    { icon: "lock", q: "Who can see what?", a: "The same people as today. Access is read-only, and every record keeps its original permissions." },
    { icon: "cpu", q: "Which model does it use?", a: "Your choice: Anthropic, OpenAI or OpenRouter. Switch any time." },
    { icon: "check", q: "Can it act on its own?", a: "No. Every answer is cited, and every action waits for a person to approve it." },
  ],
} as const;

export const team = {
  title: "Built by engineers from",
  /*
    Logos are drawn in ink from each file's transparent shape, so the set matches. `ratio` is the
    file's width ÷ height; `height` (px) sizes each mark so the row has an even visual weight.
    Sources: Amazon and Applied Materials press kits (Applied's white lines made transparent so it works as a stencil), BAIR's site, the Tesla wordmark from Wikimedia
    Commons (public-domain text logo), and OpenMind's share image at openmind.com/og-image.png (cropped
    to the logo, its white background made transparent). The trademarks belong to their owners.
  */
  companies: [
    { name: "Amazon", logo: "/logos/amazon.png", ratio: 6110 / 2047, height: 30 },
    { name: "Tesla", logo: "/logos/tesla.svg", ratio: 1236 / 161, height: 15 },
    { name: "Applied Materials", logo: "/logos/applied-materials.png", ratio: 1475 / 461, height: 34 },
    { name: "Berkeley AI Research", logo: "/logos/bair.png", ratio: 1050 / 561, height: 46 },
    { name: "OpenMind", logo: "/logos/openmind.png", ratio: 858 / 160, height: 21 },
  ],
} as const;

export const closing = {
  title: "Unlock what your company already knows.",
} as const;

/**
 * Get a free AI audit. The buttons go to /book-a-demo/ (the URL kept from when it booked demos), a
 * short form. There's no server on a static site, so submissions go to Formspree ("AI audit
 * requests" form, project "website"), which emails them to the account's inbox. `email` is shown
 * to visitors if sending fails.
 */
export const contact = {
  cta: "Get a free AI audit",
  href: "/book-a-demo/",
  email: "ishan.tesseract@gmail.com",
  formEndpoint: "https://formspree.io/f/xrpqrjzy",
  page: {
    title: "Get a free AI audit",
  },
} as const;
