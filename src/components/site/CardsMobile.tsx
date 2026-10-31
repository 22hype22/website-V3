"use client";

import { site } from "@/config/site";
import { Split } from "./primitives";
import { FundingIcon, ShieldIcon, EdgeIcon, DiscoveredIcon } from "./Products";

/* The phone version of the feature grid (the live site swaps the bento for a stack under 768px). */
export default function CardsMobile() {
  const items = [
    { icon: <FundingIcon />, n: "01", title: "Connect", text: `Authorize ${site.name} and link your server. No tokens to generate, nothing to host, no command line.` },
    { icon: <ShieldIcon />, n: "02", title: "Configure", text: "Choose your bots and toggle exactly the features you want, all from one visual dashboard." },
    { icon: <EdgeIcon />, n: "03", title: "Deploy", text: "Our auto-deploy pipeline pushes your setup live in under sixty seconds. No restarts, no downtime." },
    { icon: <DiscoveredIcon />, n: "04", title: "Automate", text: "Moderation, tickets and utilities run themselves around the clock. Rules enforce, raids get caught, and every change lands in the audit log." },
  ];
  return (
    <section className="section_c-mb">
      <div className="padding-global is-perfom">
        <div className="w-layout-vflex cards_h-wrap"><Split as="h2" className="h-s-mb">Ready in Minutes, Not Weekends</Split></div>
        <div className="cards_wrap-mb">
          {items.map((it) => (
            <div className="cards_item" key={it.n}>
              <div className="w-layout-vflex cards_top"><div className="cards_icon w-embed">{it.icon}</div><div>{it.n}</div></div>
              <div className="w-layout-vflex cards_btm">
                <Split as="h6" className="cards_title">{it.title}</Split>
                <div>{it.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
