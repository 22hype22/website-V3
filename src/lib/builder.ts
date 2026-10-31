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

/* ───────── Build your own: individual modules ("code parts") that make up a custom bot ───────── */

export type ModuleGroup = "moderation" | "tickets" | "community" | "media" | "erlc";
export const MODULE_GROUPS: { id: ModuleGroup; label: string }[] = [
  { id: "moderation", label: "Moderation & safety" },
  { id: "tickets", label: "Tickets & support" },
  { id: "community", label: "Community & engagement" },
  { id: "media", label: "Media & alerts" },
  { id: "erlc", label: "ER:LC & Roblox" },
];

export type Module = { id: string; name: string; group: ModuleGroup; desc: string; price: number };

/* Prices are reference estimates: the ones the store lists for add-ons, plus placeholders for core systems. */
export const MODULES: Module[] = [
  { id: "verify", name: "Verification system", group: "moderation", desc: "Gate the server behind a verify step.", price: 4.99 },
  { id: "modtools", name: "Warn, mute, ban, kick", group: "moderation", desc: "The full mod toolkit with reasons and history.", price: 4.99 },
  { id: "antiraid", name: "Anti-spam & anti-raid", group: "moderation", desc: "Catches floods and join raids as they start.", price: 4.99 },
  { id: "phishing", name: "Phishing link detection", group: "moderation", desc: "Deletes known scam links on sight.", price: 1.99 },
  { id: "logging", name: "Advanced logging", group: "moderation", desc: "Message edits, deletes, and full activity logs.", price: 2.99 },
  { id: "nsfw", name: "NSFW invite & avatar scanning", group: "moderation", desc: "Flags NSFW invites and avatars, stores censored evidence.", price: 2.99 },
  { id: "escalate", name: "Auto-escalating warnings", group: "moderation", desc: "Warns auto-escalate to mute and ban thresholds.", price: 1.99 },
  { id: "lockdown", name: "Lockdown & temp-bans", group: "moderation", desc: "Lock a channel or the server, bans that lift themselves.", price: 1.99 },
  { id: "wordfilter", name: "Word filter & auto slowmode", group: "moderation", desc: "Banned phrases and slowmode when chat spikes.", price: 1.99 },
  { id: "tickets", name: "Ticket system", group: "tickets", desc: "Unlimited categories, buttons, and claim flow.", price: 9.99 },
  { id: "transcripts", name: "Ticket transcripts & logs", group: "tickets", desc: "Full history of every ticket, saved.", price: 0.99 },
  { id: "notes", name: "Ticket notes & members", group: "tickets", desc: "Internal staff notes, pull people in or out.", price: 0.99 },
  { id: "appeals", name: "Ban appeals & reports", group: "tickets", desc: "Appeal forms and member reports, routed to staff.", price: 2.99 },
  { id: "staffperf", name: "Staff performance tracking", group: "tickets", desc: "Tickets handled, response times, and more.", price: 1.99 },
  { id: "priority", name: "Priority flagging & auto-close", group: "tickets", desc: "Mark tickets urgent, close stale ones.", price: 0.99 },
  { id: "anon", name: "Anonymous reporting", group: "tickets", desc: "Members report without revealing who they are.", price: 0.99 },
  { id: "welcome", name: "Welcome / goodbye messages", group: "tickets", desc: "Cards and messages when people join or leave.", price: 1.99 },
  { id: "reactionroles", name: "Reaction roles", group: "community", desc: "Unlimited self-assign role menus.", price: 2.99 },
  { id: "autorole", name: "Autorole & polls", group: "community", desc: "Roles on join and quick polls.", price: 1.99 },
  { id: "announce", name: "/say and /announce", group: "community", desc: "Styled announcements from the bot.", price: 0.99 },
  { id: "starboard", name: "Starboard", group: "community", desc: "Highlight top reactions in a channel.", price: 0.99 },
  { id: "giveaways", name: "Giveaway system", group: "community", desc: "Giveaways with reactions and timers.", price: 0.99 },
  { id: "leveling", name: "Leveling system", group: "community", desc: "XP, level-ups, and role rewards.", price: 2.99 },
  { id: "economy", name: "Economy system", group: "community", desc: "Currency, shop, gambling, and rewards.", price: 1.99 },
  { id: "stats", name: "Server stats channels", group: "community", desc: "Auto-updating member-count channels.", price: 0.99 },
  { id: "reminders", name: "Reminders & recurring messages", group: "community", desc: "/remindme and messages on a timer.", price: 0.99 },
  { id: "music", name: "Music", group: "media", desc: "Full playback with queues and controls.", price: 1.99 },
  { id: "radio", name: "Auto radio by genre", group: "media", desc: "Non-stop radio, 24/7.", price: 0.99 },
  { id: "streams", name: "Twitch / YouTube notifications", group: "media", desc: "Ping when streamers go live or upload.", price: 0.99 },
  { id: "tts", name: "Text to speech", group: "media", desc: "Reads messages aloud in voice.", price: 0.99 },
  { id: "robloxsync", name: "Roblox verification & rank sync", group: "erlc", desc: "Link Roblox accounts, sync group ranks to roles.", price: 4.99 },
  { id: "infractions", name: "Infractions & promotions", group: "erlc", desc: "Staff infraction and promotion logs.", price: 2.99 },
  { id: "shifts", name: "Shifts & leave of absence", group: "erlc", desc: "Clock in, clock out, and LOA requests.", price: 2.99 },
  { id: "applications", name: "Applications", group: "erlc", desc: "A form you design, accepted in one press.", price: 4.99 },
  { id: "roster", name: "Roster & quotas", group: "erlc", desc: "Live roster by rank with weekly quotas.", price: 4.99 },
  { id: "certs", name: "Certifications", group: "erlc", desc: "K9, SWAT, FTO and more, logged per member.", price: 1.99 },
  { id: "dispatcher", name: "AI 911 dispatcher (voice)", group: "erlc", desc: "Reads calls aloud and talks back.", price: 14.99 },
  { id: "trainer", name: "AI staff trainer (voice)", group: "erlc", desc: "Trains staff out loud from your handbook.", price: 14.99 },
];

export const CUSTOM_BASE = 49; // the bare custom bot before modules

export function quoteCustom(ids: string[]): Quote {
  const mods = MODULES.filter((m) => ids.includes(m.id));
  const items: Quote["items"] = [{ base: { id: "custom", name: "Custom bot", group: "discord", tagline: "", price: CUSTOM_BASE, bullets: [] }, price: CUSTOM_BASE }];
  const modulesTotal = mods.reduce((s, m) => s + m.price, 0);
  return { items, oneTime: Math.round((CUSTOM_BASE + modulesTotal) * 100) / 100, hostingMonthly: HOSTING_PER_BOT, discordBots: 1, savings: 0 };
}
