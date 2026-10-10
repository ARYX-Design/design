export const EMAIL = "aryx.design@gmail.com"
export const MAILTO = `mailto:${EMAIL}?subject=New%20project%20inquiry`

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Watch", href: "#watch" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Insights", href: "/insights.html" },
]

export const rotatingWords = ["websites", "logos", "AI agents", "apps", "games", "automations"]

export const marqueeItems = [
  "Websites", "Logo & Identity", "AI Agents", "AI Chatbots", "AI Workflows", "Automation",
  "Apps", "Games", "UI / UX", "Landing pages",
]

export type ServiceKey = "agents" | "websites" | "logo" | "automation" | "chatbots" | "workflows" | "apps" | "games" | "uiux"
export interface Service {
  key: ServiceKey
  name: string
  description: string
  bullets: string[]
  className: string
}

export const services: Service[] = [
  { key: "agents", name: "AI Agents", description: "Agents that research, decide and act across your tools, with you staying in control.",
    bullets: ["Lead qualification & follow-up agents", "Research & reporting agents", "Multi-step workflow agents"], className: "lg:col-span-2" },
  { key: "websites", name: "Websites", description: "Fast, responsive, conversion-focused sites that look stunning on every screen.",
    bullets: ["Landing pages & full sites", "Webflow, Framer or hand-coded", "SEO & performance built in"], className: "" },
  { key: "logo", name: "Logo & Identity", description: "Memorable logos and complete brand systems that set you apart.",
    bullets: ["Logo suite & variations", "Color, type & guidelines", "Social & print-ready assets"], className: "" },
  { key: "automation", name: "Automation", description: "Stop doing the same task twice. I connect your tools and build workflows that run on their own.",
    bullets: ["Forms, emails & spreadsheet flows", "Bots, scripts & scheduled jobs", "App-to-app integrations"], className: "lg:col-span-2" },
  { key: "chatbots", name: "AI Chatbots", description: "Support and sales assistants trained on your own content, live on your site.",
    bullets: ["Website & customer support bots", "Answers from your knowledge base", "Hand-off to a human when needed"], className: "" },
  { key: "workflows", name: "AI Workflows", description: "AI steps inside your processes: read, sort, extract, write, then pass it on.",
    bullets: ["Email & inbox triage", "Document & invoice data extraction", "Content & report generation"], className: "" },
  { key: "apps", name: "App Development", description: "Web apps and tools that solve one problem well: dashboards, trackers, calculators and more.",
    bullets: ["Web apps & installable PWAs", "Dashboards & internal tools", "From idea to working MVP"], className: "" },
  { key: "games", name: "Game Creation", description: "Playable browser games and prototypes, from a tiny arcade idea to a branded promo game.",
    bullets: ["Browser & mobile-friendly games", "Prototypes & game jams", "Branded mini-games for campaigns"], className: "" },
  { key: "uiux", name: "UI / UX Design", description: "Interfaces and product designs that feel effortless to use.",
    bullets: ["App & dashboard design", "Design systems in Figma", "Prototypes & handoff"], className: "lg:col-span-2" },
]

export const videos = [
  { id: "promo", src: "/assets/video/aryx-promo-16x9.mp4", poster: "/assets/video/posters/aryx-promo-16x9.jpg", tag: "40 s · Overview",
    title: "ARYX in 40 seconds", text: "Websites, logos, apps, games, AI agents and automation, from just €19.99.", vertical: false },
  { id: "ai", src: "/assets/video/aryx-ai-explainer-16x9.mp4", poster: "/assets/video/posters/aryx-ai-explainer-16x9.jpg", tag: "35 s · AI agents",
    title: "AI agents, explained", text: "What agents, chatbots and AI workflows can take off your plate.", vertical: false },
  { id: "support", src: "/assets/video/aryx-ai-support-9x16.mp4", poster: "/assets/video/posters/aryx-ai-support-9x16.jpg", tag: "24 s · Vertical",
    title: "An AI support agent", text: "Answers customers from your own content, at any hour.", vertical: true },
]

export const gallery = [
  { n: 1, title: "Logo Lockups", text: "Mono, vivid & light versions", alt: "ARYX logo lockups in mono, vivid and light", className: "sm:col-span-2 sm:row-span-2" },
  { n: 2, title: "Web Design", text: "Fast, responsive builds", alt: "Website hero layout in a browser frame", className: "sm:col-span-2" },
  { n: 3, title: "Sketch to Screen", text: "Wireframes & concepts", alt: "Wireframe sketch becoming a polished screen", className: "sm:col-span-2" },
  { n: 4, title: "Typography", text: "Type that carries the brand", alt: "Type specimen showing Space Grotesk and Inter", className: "" },
  { n: 5, title: "Color System", text: "Palettes that hold together", alt: "Brand color system swatches", className: "" },
  { n: 6, title: "Launch Day", text: "Shipping it live", alt: "Launch card with phone and growth chart", className: "" },
]

export const process = [
  { n: "01", title: "Discover", text: "We talk goals, audience, and vibe. I learn what makes your brand tick." },
  { n: "02", title: "Design", text: "Concepts, drafts, and iterations until it feels unmistakably yours." },
  { n: "03", title: "Build", text: "I develop the site or finalize your assets, pixel-perfect and fast." },
  { n: "04", title: "Launch", text: "We ship it live, and I hand off everything you need to grow." },
]

export const pricing = [
  { name: "Starter", desc: "Quick wins, fixed price", price: 19.99, decimals: 2, from: true, note: "one small task · ~48 hours",
    items: ["A simple automation, AI workflow or script", "A basic logo or social asset", "A small game or app tweak", "Clear scope, no surprises"], cta: "Get started", featured: false },
  { name: "Logo & Brand", desc: "A complete identity kit", price: 490, decimals: 0, from: false, note: "one-time · ~5 days",
    items: ["Primary logo + variations", "Color palette & typography", "Mini brand guidelines", "Social profile assets"], cta: "Get started", featured: false },
  { name: "Website + Brand", desc: "The full launch package", price: 1900, decimals: 0, from: false, note: "one-time · ~2–3 weeks",
    items: ["Everything in Logo & Brand", "Up to 5-page responsive site", "Copy polish & SEO setup", "Fast, mobile-first build", "2 rounds of revisions"], cta: "Start a project", featured: true },
  { name: "Custom", desc: "Product, app or ongoing work", price: null, decimals: 0, from: false, note: "scoped to your needs",
    items: ["Web apps & dashboards", "AI agents & design systems", "Ongoing design retainer", "Priority turnaround"], cta: "Book a call", featured: false },
]

export const aboutTags = ["Figma", "Webflow", "Framer", "HTML/CSS", "React", "AI agents", "Automation", "Brand strategy"]
