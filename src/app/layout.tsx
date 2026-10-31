import type { Metadata } from "next";
import "./globals.css";
import "@/styles/webflow.css";
import "@/styles/overrides.css";

export const metadata: Metadata = {
  title: "Oversite — Managed Discord Bots for Serious Servers",
  description: "Oversite builds managed Discord bots and dashboards for Roblox communities: Protection, Support and Utilities bots plus ER:LC tools, with nothing to host, no tokens and no code.",
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
