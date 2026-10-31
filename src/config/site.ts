/* Site-wide switches, links and copy. Every URL into the product lives here. */
export const site = {
  name: "Oversite",
  /* Top bar tabs, in order. A "|" entry draws a thin divider; http links open in a new tab. */
  nav: [
    ["/", "Home"],
    ["#process", "Our Process"],
    ["#build", "Bots"],
    "|",
    ["https://www.oversitescad.com/", "CAD"],
  ] as ([string, string] | "|")[],
  /* The top-bar button: "Sign in" for visitors, "Dashboard" once signed in (see src/lib/auth.ts). */
  signInUrl: "https://www.oversite.shop/auth",
  signUpUrl: "https://www.oversite.shop/auth?mode=signup",
  dashboardUrl: "https://www.oversite.shop/bot-dashboard",
  /* A session is detected from this cookie, or from the oversite:signed-in key in localStorage. */
  sessionCookie: "oversite_session",
  /* Product links */
  appUrl: "https://www.oversite.shop/auth", // "Deploy now"
  botsUrl: "https://www.oversite.shop/bots",
  buildUrl: "https://www.oversite.shop/bots#build",
  processUrl: "https://www.oversite.shop/process",
  erlcUrl: "https://www.oversite.shop/erlc-design",
  legal: {
    privacy: "https://www.oversite.shop/legal/privacy-policy",
    terms: "https://www.oversite.shop/legal/terms-of-use",
    refunds: "https://www.oversite.shop/legal/sales-and-refunds",
  },
  /* Optional: a server that answers the help chat (POST { messages } -> { reply }). Empty = built-in answers. */
  assistantEndpoint: "",
  discordUrl: "https://discord.gg/ovs",
  discordHandle: ".gg/ovs",
  tiktokUrl: "https://www.tiktok.com/@oversite.erlc",
  youtubeUrl: "https://www.youtube.com/@all.things.oversite",
  email: "support@oversite.shop",
  founded: 2025,
};
