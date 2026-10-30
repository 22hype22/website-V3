"use client";

import { site } from "@/config/site";
import { Split } from "./primitives";
import { FundingIcon, ShieldIcon, EdgeIcon, DiscoveredIcon } from "./Products";

/* The phone version of the feature grid (the live site swaps the bento for a stack under 768px). */
export default function CardsMobile() {
  const items = [
    { icon: <FundingIcon />, n: "01", title: "Access Funding", text: `Keep trading your existing account. Apply for ${site.name} funding without paying for more challenge accounts.` },
    { icon: <ShieldIcon />, n: "02", title: "Find Opportunities", text: "Compare track records across performance, drawdown, risk, and consistency." },
    { icon: <EdgeIcon />, n: "03", title: "Sharpen Your Edge", text: "Use real-time analytics, signals, portfolio tools, and market context to understand where risk builds, and what drives performance." },
    { icon: <DiscoveredIcon />, n: "04", title: "Get Discovered", text: `Publish a verified track record, earn trust with verification, and audits. Connect with investors through the ${site.name} community.` },
  ];
  return (
    <section className="section_c-mb">
      <div className="padding-global is-perfom">
        <div className="w-layout-vflex cards_h-wrap"><Split as="h2" className="h-s-mb">Discover Powerful Features for Smarter Investments</Split></div>
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
