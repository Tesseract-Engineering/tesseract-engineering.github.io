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
      tools: ["Slack", "Microsoft Teams"],
      title: "Ask anything. Get a cited answer.",
      text: "Cited answers in any Slack or Teams channel or DM, using only what you can access.",
    },
    {
      id: "documents",
      label: "Documents",
      tools: ["Google Docs", "Microsoft Word"],
      title: "Check a design doc before review.",
      text: "Flags contradictions, past incidents and who to ask, right inside Google Docs or Word.",
    },
    {
      id: "meetings",
      label: "Meetings",
      tools: ["Google Meet", "Zoom"],
      title: "Context in the meeting, while it’s happening.",
      text: "Ask mid-call in Google Meet or Zoom and get context on screen that everyone in the room can see.",
    },
    {
      id: "support",
      label: "IT support",
      tools: ["ServiceNow", "Jira Service Management"],
      title: "IT answers that know the history.",
      text: "Answers employees’ IT questions in ServiceNow or Jira Service Management from past tickets and runbooks, and drafts fixes for your IT team to approve.",
    },
  ],
} as const;

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
