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
  lede: "Forge turns the graph into tools your team actually uses, and your engineers can extend them.",
  tabs: [
    {
      id: "messages",
      label: "Messages",
      title: "Ask anything. Get a cited answer.",
      text: "Engineers ask in Slack or Teams and get answers cited from specs, change orders and past decisions, using only what they can access.",
    },
    {
      id: "documents",
      label: "Documents",
      title: "Review a contract against your playbook.",
      text: "Flags clauses that break your playbook and the precedents you agreed to before, right inside Word or Google Docs.",
    },
    {
      id: "meetings",
      label: "Meetings",
      title: "Answers in the meeting, while it’s happening.",
      text: "Deal teams ask mid-call in Zoom or Google Meet and get the numbers from past deals, with their sources, on screen for everyone.",
    },
    {
      id: "support",
      label: "IT support",
      title: "IT answers that know the history.",
      text: "Matches engineers’ IT requests in Jira Service Management or ServiceNow to past tickets and runbooks, and drafts the fix for your IT team to approve.",
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
  title: "Secure by design.",
  items: [
    { icon: "cloud", title: "Your cloud", text: "Your data never leaves it." },
    { icon: "cpu", title: "Any model", text: "Anthropic, OpenAI or OpenRouter. No lock-in." },
    { icon: "lock", title: "Your permissions", text: "Nobody sees more than they already could." },
    { icon: "file", title: "Cited and approved", text: "Every claim sourced. Every action approved." },
  ],
} as const;

export const team = {
  title: "Built by engineers from",
  /*
    Logos are drawn in ink from each file's transparent shape, so the set matches. `ratio` is the
    file's width ÷ height; `height` (px) sizes each mark so the row has an even visual weight.
    Sources: Amazon and Applied Materials press kits (Applied's white lines made transparent so it works as a stencil), BAIR's site, and the Tesla wordmark from Wikimedia
    Commons (public-domain text logo). The trademarks belong to their owners.
  */
  companies: [
    { name: "Amazon", logo: "/logos/amazon.png", ratio: 6110 / 2047, height: 30 },
    { name: "Tesla", logo: "/logos/tesla.svg", ratio: 1236 / 161, height: 15 },
    { name: "Applied Materials", logo: "/logos/applied-materials.png", ratio: 1475 / 461, height: 34 },
    { name: "Berkeley AI Research", logo: "/logos/bair.png", ratio: 1050 / 561, height: 46 },
  ],
} as const;

export const closing = {
  title: "See Tesseract on your own stack.",
} as const;

/** Request a demo: there's no form backend on a static site, so the buttons start an email. */
export const contact = {
  cta: "Request a demo",
  email: "ishan.tesseract@gmail.com",
  subject: "Tesseract demo request",
  body: "Hi Tesseract team,\n\nWe'd like to see a demo. Here are a few times that work for us:\n\n",
  dialogTitle: "Request a demo",
  dialogText: "Email us and we’ll find a time that works.",
} as const;

const q = encodeURIComponent;

export const contactLinks = {
  mailto: `mailto:${contact.email}?subject=${q(contact.subject)}&body=${q(contact.body)}`,
  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${q(contact.email)}&su=${q(contact.subject)}&body=${q(contact.body)}`,
  outlook: `https://outlook.office.com/mail/deeplink/compose?to=${q(contact.email)}&subject=${q(contact.subject)}&body=${q(contact.body)}`,
} as const;
