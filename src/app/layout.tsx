import type { Metadata } from "next";
import "./globals.css";
import "@/styles/webflow.css";
import "@/styles/overrides.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Oversite — Managed Discord Bots for Serious Servers",
  description: "Oversite builds managed Discord bots and dashboards for Roblox communities: Protection, Support and Utilities bots plus ER:LC tools, with nothing to host, no tokens and no code.",
  icons: { icon: "/assets/favicon.png" },
};

/* Who runs the site, for search engines: the business, where it is, and how to reach it. */
const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: "https://www.oversite.shop/",
  email: site.email,
  foundingDate: String(site.founded),
  address: { "@type": "PostalAddress", addressRegion: "Minnesota", addressCountry: "US" },
  sameAs: [site.discordUrl, site.tiktokUrl, site.youtubeUrl],
  description: "Managed Discord bots for Roblox and ER:LC communities. Nothing to host, no tokens, no code.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
