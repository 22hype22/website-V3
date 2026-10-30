import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "@/styles/webflow.css";
import "@/styles/overrides.css";

export const metadata: Metadata = {
  title: "Oversite",
  description: "Oversite is the world's first performance network for serious traders. Turning performance into opportunity.",
  icons: { icon: "/assets/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
