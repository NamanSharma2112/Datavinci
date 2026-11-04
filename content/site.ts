/**
 * ALL copy for the page lives in this file.
 *
 * ⚠️  This redesign was built without access to grippi.io, so the product
 *     positioning below is a DRAFT. Every string marked `// TODO verify` must be
 *     checked against the live site (or replaced with its real copy) before this
 *     is shown to anyone at Grippi. Nothing here is a real statistic, customer,
 *     or testimonial, and none should be added unless it comes from Grippi.
 */

export const concept = {
  /** Shown in the footer so nobody mistakes this for the official site. */
  author: "Your Name", // TODO: your name
  authorUrl: "https://www.linkedin.com/in/your-handle", // TODO: your LinkedIn
  note: "Unofficial redesign concept. Not affiliated with or endorsed by Grippi.",
};

export const brand = {
  name: "Grippi",
  appUrl: "https://grippi.io", // TODO verify: real sign-up / app URL
  signInUrl: "https://grippi.io", // TODO verify
  demoUrl: "https://grippi.io", // TODO verify: real "book a demo" URL, if any
};

export const nav = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
];

export const hero = {
  eyebrow: "Now in early access", // TODO verify
  // Rendered as: titleStart + <serif>titleAccent</serif> + titleEnd
  titleStart: "Get a ",
  titleAccent: "grip",
  titleEnd: " on the work that keeps slipping.",
  subtitle:
    // TODO verify: replace with Grippi's real one-line value proposition
    "Describe the outcome in a sentence. Grippi plans the steps, works across your tools, and checks with you before anything goes out.",
  primaryCta: "Get started free", // TODO verify
  secondaryCta: "See it work",
  footnote: "No credit card required", // TODO verify
};

/** The interactive demo in the hero. Illustrative only. */
export const demo = {
  prompt:
    "Pull last week's sign-ups, flag teams over 200 people, and draft a personal hello for each.",
  steps: [
    { state: "weaving", label: "Planning the steps", done: "Planned 4 steps" },
    { state: "searching", label: "Reading sign-ups from your CRM", done: "Found 86 sign-ups" },
    { state: "solving", label: "Checking company size", done: "Flagged 12 teams over 200" },
    { state: "composing", label: "Drafting 12 messages", done: "12 drafts written" },
  ] as const,
  result: {
    title: "12 drafts ready for review",
    body: "Nothing has been sent. Approve all, edit one by one, or ask for changes.",
    approve: "Review drafts",
  },
  caption: "Illustrative demo. Data is made up.",
};

export const how = {
  eyebrow: "How it works",
  title: "Three steps. You stay in charge of every one.",
  steps: [
    {
      n: "01",
      title: "Ask in plain words",
      body: "Write what you want done the way you'd brief a colleague. No templates, no flowcharts to build.",
    },
    {
      n: "02",
      title: "Watch it work",
      body: "Grippi breaks the job into steps and shows each one live, so you always know what it's doing and why.",
    },
    {
      n: "03",
      title: "Approve what ships",
      body: "Anything that leaves your workspace waits for your OK. Edit, approve, or send it back with a note.",
    },
  ],
}; // TODO verify: does Grippi actually work this way?

export const features = {
  eyebrow: "Features",
  title: "Built to be trusted with real work.",
  subtitle:
    "The parts that matter when software acts on your behalf: visibility, control, and context.",
  items: {
    plan: {
      title: "Plans before it acts",
      body: "Every request becomes a short, readable plan. Change a step before it runs.",
    },
    tools: {
      title: "Works where you work",
      body: "Connects to the tools your team already uses, so the work lands where people look for it.",
      // TODO verify: replace with Grippi's real integrations (names only, no logos unless licensed)
      nodes: ["CRM", "Email", "Docs", "Sheets", "Calendar", "Chat"],
    },
    control: {
      title: "Nothing ships without you",
      body: "Approval gates on anything external. A full log of what ran, when, and with which data.",
    },
    memory: {
      title: "Remembers how you like it",
      body: "Tone, formats, the people who matter. Tell it once and it carries that into every run.",
    },
    team: {
      title: "Shared with your team",
      body: "Hand off runs, review each other's drafts, and reuse the requests that work.",
    },
  },
}; // TODO verify all feature claims

export const faq = {
  eyebrow: "FAQ",
  title: "Questions, answered.",
  items: [
    {
      q: "What kind of work can I hand to Grippi?",
      a: "Repeatable, multi-step tasks that touch more than one tool: pulling data, cross-checking it, and producing something a person would otherwise write or assemble by hand.",
    },
    {
      q: "Will it do anything without asking me?",
      a: "Reading and preparing happen automatically. Anything that leaves your workspace, such as sending, posting or updating a record, waits for your approval.",
    },
    {
      q: "Which tools does it connect to?",
      a: "The tools most teams run on day to day. The full, current list lives on the integrations page.",
    },
    {
      q: "How is my data handled?",
      a: "See the security page for exactly how data is stored, who can access it, and how long it's kept.",
    },
    {
      q: "How much does it cost?",
      a: "You can start for free. Paid plans are priced per team as you scale; see the pricing page for current details.",
    },
  ],
}; // TODO verify every answer against Grippi's real policies and pricing

export const cta = {
  title: "Hand off the next one.",
  body: "Start with one task you do every week. See how it feels to get the result instead of the to-do.",
  primary: "Get started free", // TODO verify
  secondary: "Book a demo", // TODO verify
};

export const footer = {
  columns: [
    {
      title: "Product",
      links: [
        { label: "How it works", href: "#how" },
        { label: "Features", href: "#features" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Company",
      // TODO verify: real URLs from grippi.io
      links: [
        { label: "About", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  ],
};
