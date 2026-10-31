/* The assistant's brain. With no backend on this static site, answers come from this knowledge base (built from the
   Oversite content handover) by keyword match. Point site.assistantEndpoint at a server that accepts
   POST { messages: [{ role, content }] } and returns { reply } and the chat will use that instead. */
import { site } from "@/config/site";

export type Msg = { role: "user" | "assistant"; content: string };

type Entry = { keys: string[]; strong?: string[]; answer: string };

const KB: Entry[] = [
  { keys: ["invite", "add", "install", "join", "server", "link", "connect", "authorize", "authorise"], strong: ["invite", "install"], answer: `You don't invite it yourself. Authorize ${site.name} from the dashboard, pick your server, and the auto-deploy pipeline brings the bot online in under a minute. No token to generate, no invite link to manage, nothing to host.` },
  { keys: ["robux", "roblox", "r$", "gamepass", "game", "pass", "shirt"], strong: ["robux"], answer: "Yes, you can pay in Robux. The price is the dollar price at 100 R$ per $1 plus 30% for Roblox's cut, rounded up to end in 999, so a $99 bot is R$ 12,999. After you place the order you sign in with Roblox and buy a game pass made for your order (or a shirt from our group store on a Roblox Select account if you're under 16). The order is paid the moment Roblox records the sale." },
  { keys: ["refund", "refunds", "money", "back", "return"], strong: ["refund", "refunds"], answer: "If something is wrong with your bot, tell us within fourteen days of buying and we will fix it or refund you where it is fair to. Robux refunds come back at 70%, since Roblox keeps 30%. Open a ticket in the Discord or email support@oversite.shop and the team will sort it." },
  { keys: ["cancel", "cancelling", "canceling", "stop", "subscription", "unsubscribe", "delete"], strong: ["cancel"], answer: "Cancel anytime from your dashboard. Charges stop right away, you get a thirty-second undo, and then the bot is removed from your servers and its data is deleted. We will never make you call, give a reason or click through offers to cancel." },
  { keys: ["price", "pricing", "cost", "costs", "much", "pay", "paying", "payment", "plan", "plans", "cheap", "expensive"], strong: ["price", "cost", "pricing"], answer: "Discord bots are $99 one-time for Protection, Support or Utilities, a second bot in the same order is $50, and the All in One Pack with every base in a single bot is $199. Managed hosting is $5 a month per bot (two bots $10, and the third bot's hosting is free). ER:LC bots are one-time and hosted free: Dispatch $19.99, Roleplay $99, Roleplay Pack $119.99. Every add-on is included at no charge." },
  { keys: ["hosting", "host", "hosted", "vps", "server", "uptime", "online", "downtime", "run"], strong: ["host", "hosting", "vps"], answer: `No, you don't host anything. Every bot runs on ${site.name}'s infrastructure. There's no VPS to rent, no process to keep alive, and no token to babysit. Discord bots carry $5 a month managed hosting; ER:LC bots are hosted free.` },
  { keys: ["fast", "quick", "long", "setup", "set", "up", "minutes", "deploy", "deployed", "live", "soon"], strong: ["fast", "setup", "deploy"], answer: "Minutes. Authorize the bots, choose what you want enabled, and the auto-deploy pipeline has you live in under sixty seconds, all from the dashboard. No restarts, no downtime." },
  { keys: ["technical", "code", "coding", "config", "configure", "settings", "dashboard", "toggle", "manage", "managed"], strong: ["technical", "code", "dashboard"], answer: "You don't need to be technical. Everything is managed from one visual dashboard: toggle features, fill in settings, and changes apply live across your server with no code, config files or restarts." },
  { keys: ["staff", "team", "moderators", "mods", "access", "roles", "permissions", "audit"], strong: ["staff", "team", "moderators"], answer: "Yes. Invite your staff, assign roles to control what they can touch, and every change is written to an audit log so nothing happens off the record." },
  { keys: ["data", "private", "privacy", "isolated", "secure", "security", "safe"], strong: ["data", "privacy", "secure"], answer: "Every server's configuration and data is isolated and permission-gated, so nothing you set up is visible to anyone outside your authorized team. Settings are saved and reload automatically, so updates and restarts never wipe your setup." },
  { keys: ["update", "updates", "restart", "restarts", "survive", "keep", "working", "release"], strong: ["update", "updates", "restart"], answer: "Updates roll out without downtime or resets. Your bots keep running and your configuration carries straight through every release, so everything stays exactly where you left it." },
  { keys: ["protection", "raid", "raids", "moderation", "automod", "anti", "verification", "phishing", "ban", "mute"], strong: ["protection", "raid", "automod"], answer: "Protection is the shield: anti-raid, verification, auto-moderation, phishing link detection, warn / mute / ban / kick, logging and a real-time threat shield that quarantines bad actors before they reach your members. $99 one-time." },
  { keys: ["support", "ticket", "tickets", "transcript", "transcripts", "appeal", "appeals", "reports"], strong: ["ticket", "tickets"], answer: "Support turns chaos into clean tickets: routing, a claim system, searchable transcripts, ban appeals, member reports, priority flagging and staff tools so nothing slips through. $99 one-time." },
  { keys: ["utilities", "leveling", "economy", "giveaway", "giveaways", "radio", "music", "reaction", "stats", "twitch", "youtube", "starboard"], strong: ["utilities", "radio", "leveling"], answer: "Utilities is everything else your server runs on: leveling and economy, giveaways and starboard, reaction roles and autorole, server stats channels, Twitch / YouTube alerts and Oversite Radio, a live station with an AI DJ. $99 one-time." },
  { keys: ["all", "one", "pack", "bundle", "everything", "all-in-one"], strong: ["pack", "bundle", "all-in-one"], answer: "The All in One Pack fuses Protection, Support and Utilities into a single bot: every base your server needs, one install, one dashboard, custom branding ready and a multi-server license. $199 one-time." },
  { keys: ["erlc", "er:lc", "liberty", "county", "roleplay", "dispatch", "911", "instructor", "department", "customs", "design"], strong: ["erlc", "dispatch", "roleplay", "customs"], answer: "For ER:LC communities there's Roleplay (tickets, Roblox verification and rank sync, logs, giveaways, music and economy, $99), Dispatch (an AI voice dispatcher that reads 911 calls aloud and talks back, $19.99), Customs (the design-server platform: order tickets, portfolios, storefronts, payments and credits, $99) and the Roleplay Pack (Roleplay, Instructor, Dispatch and Department, four bots for $119.99). All one-time and hosted free." },
  { keys: ["bots", "offer", "which", "what", "kinds", "types", "fleet", "options"], strong: ["offer", "fleet"], answer: "Three core bots: Protection (anti-raid and moderation), Support (tickets) and Utilities (leveling, giveaways, live radio and more), plus the All in One Pack that fuses the three. For ER:LC there's Roleplay, Dispatch, Customs and the Roleplay Pack." },
  { keys: ["name", "icon", "banner", "bio", "status", "branding", "custom", "customize", "customise", "avatar"], strong: ["icon", "banner", "branding"], answer: "Every bot is yours to shape. Name, icon, banner, bio and status are all yours to set, and you can change any of them whenever you like. Changes go live right away." },
  { keys: ["trial", "free", "discount", "code", "promo", "gift"], strong: ["trial", "discount", "gift"], answer: "New accounts get their first two months free, applied automatically when you create your account. Discount codes and gifting a bot to someone else's account are supported at checkout." },
  { keys: ["human", "person", "someone", "talk", "contact", "email", "discord", "help", "ticket"], strong: ["human", "person", "contact"], answer: `No problem, the team can take it from here. Open a ticket in the Discord at ${site.discordHandle}, or email ${site.email}, and we'll jump in. Replies usually come within 24 to 48 hours.` },
];

const GREETING = /^(hi|hey|hello|yo|sup|hiya|good (morning|afternoon|evening))\b/i;
const THANKS = /\b(thanks|thank you|ty|cheers)\b/i;

export function localAnswer(question: string): string {
  const q = question.trim();
  if (GREETING.test(q) && q.split(/\s+/).length <= 3) return `Hey! I'm ${site.name}'s assistant. Ask me about setup, the bots, pricing, Robux, refunds or anything in the dashboard.`;
  if (THANKS.test(q) && q.split(/\s+/).length <= 4) return "Any time. If anything else comes up, I'm right here.";
  const words = q.toLowerCase().replace(/[^a-z0-9$:\s-]/g, " ").split(/\s+/).filter(Boolean);
  let best: Entry | null = null, bestScore = 0;
  for (const e of KB) {
    let score = 0;
    for (const w of words) {
      if (e.strong?.includes(w)) score += 3;
      else if (e.keys.includes(w)) score += 1;
    }
    if (score > bestScore) { bestScore = score; best = e; }
  }
  if (best && bestScore >= 3) return best.answer;
  return `I'm not sure on that one yet, but I can get you to someone who is. Open a ticket in the Discord at ${site.discordHandle}, or email ${site.email}, and the team will jump in.`;
}

export async function answer(messages: Msg[]): Promise<string> {
  const last = messages[messages.length - 1]?.content ?? "";
  if (site.assistantEndpoint) {
    try {
      const res = await fetch(site.assistantEndpoint, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ messages }) });
      if (res.ok) { const data = (await res.json()) as { reply?: string }; if (data.reply) return data.reply; }
    } catch {}
  }
  await new Promise((r) => setTimeout(r, 450 + Math.random() * 450));
  return localAnswer(last);
}
