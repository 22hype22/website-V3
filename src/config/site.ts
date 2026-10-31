/* Site-wide switches and copy. */
export const site = {
  name: "Oversite",
  /* Top bar tabs, in order. A "|" entry draws a thin divider. Targets are placeholders until those pages exist. */
  nav: [
    ["/", "Home"],
    ["#our-process", "Our Process"],
    ["#bots", "Bots"],
    "|",
    ["#cad", "CAD"],
  ] as ([string, string] | "|")[],
  /* The top-bar button: "Sign in" for visitors, "Dashboard" once signed in (see src/lib/auth.ts). */
  signInUrl: "#sign-in",
  dashboardUrl: "#dashboard",
  /* A session is detected from this cookie, or from the oversite:signed-in key in localStorage. */
  sessionCookie: "oversite_session",
  /* Where the other "Launch App" and "Get Started" buttons go. */
  appUrl: "#launch",
  loginUrl: "#sign-in",
  signupUrl: "#signup",
  helpUrl: "#help-center",
  blogUrl: "#blog",
  email: "info@oversite.com",
  social: { linkedin: "#", instagram: "#", x: "#" },
};
