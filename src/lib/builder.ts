/* The bot catalogue behind the "Design your dream bot" builder: bases, prices and the pricing rules from the
   store (second Discord bot capped at $50, hosting tiers, Robux conversion). Prices are the store defaults. */

export type Group = "erlc" | "discord";

export type Base = {
  id: string;
  name: string;
  group: Group;
  tagline: string;
  price: number;          // one-time USD; 0 = price coming soon
  soon?: boolean;         // "Coming Soon" pill, still selectable as a pre-order
  pack?: boolean;         // bundles (All in One, Roleplay Pack)
  bullets: string[];
};

export const BASES: Base[] = [
  { id: "roleplay", name: "Oversite Roleplay", group: "erlc", price: 99,
    tagline: "Everything an ER:LC roleplay community runs on, all dashboard-driven.",
    bullets: ["Tickets with transcripts and claim flow", "Roblox verification and group rank sync", "Infraction and promotion logs", "Giveaways, suggestions, and blacklist logs", "Music, auto radio, and text to speech", "Economy, gambling, marketplace, and ads", "Invite tracker and join messages"] },
  { id: "customs", name: "Oversite Customs", group: "erlc", price: 99,
    tagline: "Tickets, messaging, credits, and join logs, all dashboard-driven.",
    bullets: ["Ticket system with transcripts", "Components V2 message builder", "Join logs with welcome cards", "Credits system (give / remove / track)", "Live member-count status"] },
  { id: "dispatch", name: "Oversite Dispatch", group: "erlc", price: 19.99,
    tagline: "AI voice dispatcher for ER:LC that reads 911 calls and talks back.",
    bullets: ["Reads live 911 calls aloud in a real dispatcher voice", "Two-way voice: officers talk to dispatch", "Nearest-unit dispatch from live positions", "Automatic officer-down & pursuit alerts", "BOLO broadcasts & call-cleared updates", "Traffic-stop auto-return on pursuits", "Live roster & unit status board", "Region-accurate radio codes & phonetics"] },
  { id: "instructor", name: "Oversite Instructor", group: "erlc", price: 99, soon: true,
    tagline: "Trains your staff out loud, from your own handbook.",
    bullets: ["Sits in a voice channel and trains your staff", "Learns your server from your handbook or a video", "Writes the course itself, you read it over and approve it", "Answers questions out loud, in the middle of a lesson", "Only ever teaches what your own material says", "Marks each trainee passed or failed, and shows you why", "Stops and asks a human whenever it is unsure", "Hands out the staff role the moment somebody passes"] },
  { id: "department", name: "Oversite Department", group: "erlc", price: 0, soon: true,
    tagline: "Everything a police, sheriff, fire or DOT server runs on, all dashboard-driven.",
    bullets: ["Applications with a form you design, accepted in one press", "A live roster by rank with certifications", "Weekly shift quotas per rank, with a Monday report", "Activity checks that list who didn't respond", "Certifications like K9, SWAT and FTO, logged", "Shifts, leave of absence, promotions and infractions", "Tickets, Roblox verification and group rank sync", "Add it to as many servers as you like, free"] },
  { id: "roleplay-pack", name: "Roleplay Pack", group: "erlc", price: 119.99, soon: true, pack: true,
    tagline: "Roleplay, Instructor, Dispatch and Department. Four bots for one ER:LC community, one price.",
    bullets: ["Oversite Roleplay: tickets, verification, logs, music and economy", "Oversite Instructor: trains your staff out loud from your handbook", "Oversite Dispatch: an AI voice dispatcher for your 911 calls", "Oversite Department: applications, roster, quotas and certifications", "Four separate bots, each with its own name, icon and dashboard", "One payment, hosted free", "Best value: save vs buying separately"] },
  { id: "support", name: "Oversite Support", group: "discord", price: 99,
    tagline: "Tickets, appeals, reports, and welcomes.",
    bullets: ["Ticket system (unlimited categories)", "Claim system", "Ban appeals & member reports", "Welcome / goodbye messages", "Full ticket transcripts & logs", "Staff performance tracking", "Priority flagging & auto-close", "Anonymous reporting"] },
  { id: "utilities", name: "Oversite Utilities", group: "discord", price: 99,
    tagline: "Announcements, roles, Roblox, music, more.",
    bullets: ["/say and /announce", "Reaction roles (unlimited)", "Autorole & polls", "Userinfo, serverinfo, avatar", "Music + auto-radio by genre", "Starboard & giveaways", "Twitch / YouTube notifications", "Leveling, economy & reminders"] },
  { id: "protection", name: "Oversite Protection", group: "discord", price: 99, soon: true,
    tagline: "Automod, anti-raid, and a full mod toolkit.",
    bullets: ["Verification system", "Warn, mute, ban, kick", "Anti-spam & anti-raid", "Phishing link detection", "Advanced logging: edits, deletes, activity", "NSFW invite & avatar scanning", "Auto-escalating warnings", "Channel lockdown & temp-bans"] },
  { id: "scratch", name: "All in One Pack", group: "discord", price: 199, soon: true, pack: true,
    tagline: "Protection + Support + Utilities. Every base in one bot.",
    bullets: ["Everything in Protection, Support & Utilities", "Full automod, anti-raid & logging", "Complete ticket, appeals & reports system", "Reaction roles, autorole & welcomes", "Music, giveaways & starboard", "Leveling, economy & stream alerts", "Every command in one bot", "One bot to set up instead of three"] },
];

export const SECOND_BOT_PRICE = 50;   // every Discord single after the first in one order
export const HOSTING_PER_BOT = 5;     // $/month per Discord bot; the third bot's hosting is free

/** Robux: 100 per dollar plus 30% for Roblox's cut, rounded up to end in 999 (minimum R$ 99). */
export function robux(usd: number): number {
  if (usd <= 0) return 0;
  const raw = Math.ceil(usd * 100 * 1.3);
  const r = Math.ceil((raw + 1) / 1000) * 1000 - 1;
  return Math.max(99, r);
}

export const fmtUsd = (n: number) => "$" + (Number.isInteger(n) ? n.toFixed(0) : n.toFixed(2));
export const fmtRobux = (n: number) => "R$ " + n.toLocaleString("en-US");

export type Quote = {
  items: { base: Base; price: number; note?: string }[];
  oneTime: number;
  hostingMonthly: number;
  discordBots: number;
  savings: number;
};

/** Prices a selection the way the store does. */
export function quote(ids: string[]): Quote {
  const picked = BASES.filter((b) => ids.includes(b.id));
  const items: Quote["items"] = [];
  let discordSingles = 0, savings = 0;
  for (const base of picked) {
    let price = base.price, note: string | undefined;
    if (base.group === "discord" && !base.pack) {
      discordSingles += 1;
      if (discordSingles > 1 && price > SECOND_BOT_PRICE) { savings += price - SECOND_BOT_PRICE; price = SECOND_BOT_PRICE; note = "second bot price"; }
    }
    items.push({ base, price, note });
  }
  const discordBots = picked.filter((b) => b.group === "discord").length;
  const hostingMonthly = Math.min(discordBots, 2) * HOSTING_PER_BOT;
  return { items, oneTime: items.reduce((s, i) => s + i.price, 0), hostingMonthly, discordBots, savings };
}
