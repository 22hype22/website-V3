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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
