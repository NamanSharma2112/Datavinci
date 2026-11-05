/**
 * Every word on the page lives here.
 *
 * Copy, numbers, pricing, testimonials and FAQ answers are taken from
 * grippi.io (captured Nov 2026) and tightened for length. Nothing was
 * invented: dashboard figures are the same illustrative demo data Grippi's
 * own site uses. Re-check anything time-sensitive (pricing, stats) before
 * sharing.
 */

export const concept = {
  author: "Your Name", // TODO: your name
  authorUrl: "https://www.linkedin.com/in/your-handle", // TODO: your LinkedIn
  note: "Redesign concept — not the official Grippi site.",
};

export const links = {
  app: "https://app.grippi.io",
  signIn: "https://app.grippi.io",
  demo: "https://grippi.io",
};

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Real ROAS", href: "#roas" },
  { label: "Agencies", href: "#agencies" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

/** One offer, said the same way everywhere (the live site mixes "free forever" and "30 days free"). */
export const offer = {
  cta: "Start free",
  long: "Start free for 30 days",
  reassurance: ["30 days free", "No credit card", "5-minute setup"],
};

export const hero = {
  badge: "New: Grippi inside Claude & ChatGPT",
  titleA: "Your entire marketing performance.",
  titleB: "Before your first meeting.",
  subtitle:
    "Grippi blends Shopify, Amazon, Meta, Google and TikTok into one live dashboard — with your real ROAS, a month-end forecast and plain-language insights waiting for you every morning.",
  proof: { count: "500+", label: "eCommerce brands & agencies", rating: "4.9", ratingLabel: "on G2 & Capterra" },
};

export type Platform = "meta" | "google" | "shopify" | "amazon" | "tiktok";

export const platformMeta: Record<Platform, { label: string; color: string }> = {
  meta: { label: "Meta", color: "var(--p-meta)" },
  google: { label: "Google", color: "var(--p-google)" },
  shopify: { label: "Shopify", color: "var(--p-shopify)" },
  amazon: { label: "Amazon", color: "var(--p-amazon)" },
  tiktok: { label: "TikTok", color: "var(--p-tiktok)" },
};

/** Hero dashboard demo data — mirrors the figures on grippi.io. */
export const dashboard = {
  greeting: "Good morning, Sarah",
  updated: "Updated 4 min ago",
  month: "May 2025",
  kpis: [
    { label: "Blended ROAS", value: 4.7, format: "x", delta: "+0.4 vs last month", up: true },
    { label: "Total revenue", value: 84.2, format: "k", delta: "+12% MoM", up: true },
    { label: "Total ad spend", value: 17.9, format: "k", delta: "−2% MoM", up: false, goodWhenDown: true },
    { label: "Month forecast", value: 4.8, format: "x", delta: "On track", up: true, tag: "Projected" },
  ],
  contribution: [
    { p: "meta", pct: 58 },
    { p: "google", pct: 24 },
    { p: "shopify", pct: 12 },
    { p: "amazon", pct: 6 },
  ] as { p: Platform; pct: number }[],
  insight:
    "Meta CPC dropped 18% this week while Google ROAS climbed to 6.1×. Shifting $1.2K from TikTok to Google is projected to add +$840 in revenue.",
  insightAction: "Apply suggestion",
};

export const platforms = [
  "Shopify",
  "Meta Ads",
  "Google Ads",
  "Google Analytics",
  "Amazon Seller",
  "Amazon Ads",
  "TikTok Ads",
  "Klaviyo",
  "WooCommerce",
  "Slack",
];

export const realNumber = {
  eyebrow: "The real number",
  title: "Meta's ROAS. Google's ROAS. Neither is the real number.",
  body: "Every ad platform takes credit for the same customer, so their numbers add up to more than you actually made. Grippi divides total revenue across every platform by total spend across every platform — updated throughout the day.",
  claimed: [
    { p: "meta", label: "Meta claims", value: 6.8 },
    { p: "google", label: "Google claims", value: 5.4 },
  ] as { p: Platform; label: string; value: number }[],
  claimedTotal: 12.2,
  real: 4.7,
  warning: "Attribution overlap detected across 3 platforms.",
};

export const ask = {
  eyebrow: "Ask Grippi",
  title: "The questions that used to take hours are already answered.",
  body: "Ask in plain English inside Grippi — or connect your live data to Claude and ChatGPT and ask there.",
  thinking: "Reading 5 platforms",
  items: [
    {
      q: "What is our true ROAS across every platform right now?",
      a: "Your blended ROAS is 4.7× — Meta 3.2×, Google 6.1×, TikTok 2.8×, Amazon 4.4×. Combined and de-duplicated across all four platforms.",
    },
    {
      q: "Which platform is actually driving revenue this month?",
      a: "Google is your top driver at 42% of total revenue. Meta follows at 31%, Shopify at 18%, Amazon at 9%. Google's share grew 7 points month-over-month.",
    },
    {
      q: "Are we on track to hit our monthly target?",
      a: "Yes — you're at 68% of target with 14 days remaining. Current pacing projects 104% of goal by month end. No intervention needed.",
    },
    {
      q: "Where is our budget underperforming?",
      a: "TikTok is under-delivering at 2.1× ROAS against your 3.5× benchmark. $1,200 in weekly spend is at risk. Reallocating to Google would add an estimated +$840 in revenue.",
    },
    {
      q: "What changed this week, and why?",
      a: "Meta CPC rose 18% — iOS seasonality. Google impressions +24% — a competitor paused their campaigns. Net effect: +11% revenue week-over-week.",
    },
  ],
};

export const features = {
  eyebrow: "Works while you don't",
  title: "Not a dashboard you check. One that checks for you.",
  forecast: {
    title: "Know by the 15th, not the 31st",
    body: "Revenue, ROAS and spend forecasts update daily from real pacing data — two weeks to act while you still can.",
    actual: "$41.1K",
    projected: "$86K",
    target: "$80K",
  },
  messenger: {
    title: "Insights delivered where you already are",
    body: "Plain-language briefs and alerts in Slack, WhatsApp or email the moment something changes.",
    channel: "grippi-daily",
    time: "Today 6:58 AM",
    brief:
      "Blended ROAS hit 4.7× overnight, up 0.4 vs last month. Meta is outperforming forecast. Amazon spend efficiency dropped 18% — worth a check today.",
  },
  alerts: {
    title: "Anomalies caught before the damage",
    body: "Set thresholds once. Grippi watches every account, all day.",
    client: "NightShift Coffee",
    text: "ROAS dropped to 1.9× (was 3.4×). Spend continues. Recommend pausing Google campaign #7.",
  },
  slides: {
    title: "Client reports that write themselves",
    body: "Performance audits land as editable Google Slides, every Monday, without anyone touching them.",
  },
};

export type Status = "Attention" | "Review" | "Healthy";

export const agencies = {
  eyebrow: "For agencies",
  title: "Stop finding out from your clients. Start knowing first.",
  body: "Masterview puts every client in one sortable table across every platform. The accounts that need you today are already at the top.",
  points: ["Healthy / Review / Attention status on every account", "One-click deep dive into any client", "Report Messenger and alerts per client"],
  // Illustrative demo data, same client names Grippi's own demo uses.
  clients: [
    { name: "NightShift Coffee", status: "Attention", roas: 1.9, spend: 8400, trend: [3.4, 3.1, 2.8, 2.6, 2.2, 1.9] },
    { name: "Bloom & Root", status: "Review", roas: 2.6, spend: 5200, trend: [3.0, 2.9, 3.1, 2.8, 2.7, 2.6] },
    { name: "Dune & Co.", status: "Review", roas: 3.1, spend: 3900, trend: [3.6, 3.4, 3.5, 3.2, 3.3, 3.1] },
    { name: "Northfield Apparel", status: "Healthy", roas: 4.8, spend: 12100, trend: [4.1, 4.3, 4.2, 4.5, 4.6, 4.8] },
    { name: "Crestline Sports", status: "Healthy", roas: 5.3, spend: 9600, trend: [4.6, 4.8, 5.0, 4.9, 5.1, 5.3] },
    { name: "Verdant Wellness", status: "Healthy", roas: 4.2, spend: 7300, trend: [3.8, 3.9, 4.0, 4.1, 4.0, 4.2] },
    { name: "Halo Active", status: "Healthy", roas: 3.9, spend: 6100, trend: [3.5, 3.6, 3.6, 3.8, 3.7, 3.9] },
  ] as { name: string; status: Status; roas: number; spend: number; trend: number[] }[],
};

export const proof = {
  stats: [
    { value: "5 min", label: "From signup to your first blended dashboard" },
    { value: "+34%", label: "Average ROAS improvement in the first 60 days" },
    { value: "8 hrs", label: "Saved every week on manual reporting" },
    { value: "500+", label: "eCommerce brands and agencies on Grippi" },
  ],
  // Quoted from grippi.io. Confirm with Grippi these are real, attributable customers before publishing.
  quotes: [
    {
      text: "The month-end forecast means I know by the 15th whether we're going to hit our targets. I used to find out on the 31st.",
      name: "James Okafor",
      role: "Head of Growth, Verdant Wellness",
    },
    {
      text: "I manage 24 client accounts. Before Grippi I'd find out an account was struggling when the client called. Now I see it in the status column before they do.",
      name: "Priya Sharma",
      role: "Account Director, Momentum Digital",
    },
    {
      text: "I expected setup to take a week. It took eleven minutes.",
      name: "Daniel Whitmore",
      role: "Founder, Crestline Sports",
    },
  ],
};

export const pricing = {
  eyebrow: "Pricing",
  title: "Costs less per month than one hour of manual reporting.",
  body: "Every plan gets every feature. No tiers, no upgrades, no surprises.",
  plans: [
    {
      name: "D2C",
      price: 15,
      for: "For brands and growth teams",
      unit: "1 workspace",
      features: [
        "Unlimited data sources",
        "Unified blended dashboard",
        "True blended ROAS, live",
        "Month-end forecast",
        "AI insights in plain language",
        "Report Messenger — Slack, WhatsApp, email",
        "Real-time alerts",
      ],
    },
    {
      name: "Agency",
      price: 100,
      for: "For agencies running many clients",
      unit: "10 workspaces",
      featured: true,
      features: [
        "Everything in D2C",
        "Agency Masterview across all clients",
        "Healthy / Review / Attention status",
        "One-click deep dive per client",
        "Report Messenger per client",
        "Performance audits to Google Slides",
        "Real-time alerts per account",
      ],
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Questions worth asking before you start.",
  items: [
    {
      q: "How long does setup actually take?",
      a: "Five minutes for most users. Connect Meta, Google, Shopify, TikTok and Amazon, authorize access, and your first blended dashboard fills itself in. No data engineering, no developer.",
    },
    {
      q: "What is blended ROAS and why does it matter?",
      a: "Each ad platform reports ROAS from the conversions it claims. Several platforms often claim the same customer, so their figures add up to more than your real return. Blended ROAS is total revenue across every platform divided by total spend across every platform.",
    },
    {
      q: "Is my data secure?",
      a: "Grippi connects through official API integrations — the same authorization you use with any trusted tool. It processes performance metrics only (spend, revenue, ROAS, orders), and your platform credentials are never stored by Grippi directly.",
    },
    {
      q: "How does it work for agencies with many clients?",
      a: "Agency Masterview shows every client in one sortable table across Meta, Google, Shopify, Amazon and TikTok, each with a Healthy, Review or Attention label. Filter by status and click into any account for its full dashboard.",
    },
    {
      q: "What happens after the 30-day trial?",
      a: "Plans start at $15 per month per workspace with unlimited data sources and every feature. If Grippi isn't right for you, cancel and your connections are removed. No contracts, no hidden fees.",
    },
    {
      q: "How does Grippi compare to Triple Whale or Polar Analytics?",
      a: "Those are built mainly for high-volume DTC brands with bigger teams and budgets. Grippi gives performance marketers and agencies the same quality of insight without the setup complexity or the price tag.",
    },
  ],
};

export const finalCta = {
  title: "Once you've seen everything in one place, five tabs feels broken.",
  body: "Connect your platforms in five minutes. Your first report arrives tomorrow morning.",
};

export const footer = {
  tagline: "Every platform. One honest number.",
  columns: [
    { title: "Product", links: [["Dashboard", "#product"], ["Real ROAS", "#roas"], ["Ask Grippi", "#ask"], ["Pricing", "#pricing"]] },
    { title: "Solutions", links: [["Agencies", "#agencies"], ["Brands", "#product"], ["Live demo", "https://grippi.io"]] },
    { title: "Company", links: [["Sign in", "https://app.grippi.io"], ["Privacy", "https://grippi.io"], ["Terms", "https://grippi.io"]] },
  ] as { title: string; links: [string, string][] }[],
};
