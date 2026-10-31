"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { Split, useFadeUps } from "./primitives";

/* Prices from the store: $99 a bot, $50 for a second one, $199 for the All in One Pack. Robux is the dollar price
   at 100 R$ per $1 plus 30% for Roblox's cut, rounded up to end in 999 (so $99 is R$ 12,999). */
const PLANS = [
  { icon: "d-icon.svg", iconHover: "Price_Icon-h.svg", usd: "$99 one-time", robux: "R$ 12,999", name: "Single Bot", text: "Protection, Support or Utilities. Pick the base your server needs and shape its name, icon, banner and status.", features: ["Every add-on included free", "Managed hosting, $5 a month", "Name, icon, banner and bio are yours", "Changes apply live from the dashboard", <strong key="f">Cancel anytime, 30-second undo</strong>] },
  { icon: "Price_Icon.png", iconHover: "44.svg", usd: "$50 one-time", robux: "R$ 6,999", name: "Second Bot", text: "Add a second base to your first order and the second bot costs $50. Each one keeps its own identity.", features: ["Any of Protection, Support or Utilities", "Hosting $10 a month for two bots", <strong key="f">Third bot's hosting is free</strong>, "Each bot has its own name and icon", "One dashboard for all of them"] },
  { icon: "cup_Icon.svg", iconHover: "6453.svg", usd: "$199 one-time", robux: "R$ 25,999", name: "All in One Pack", text: "Protection, Support and Utilities fused into a single bot. Every base your server needs, one install.", features: [<strong key="a">Everything in Protection, Support & Utilities</strong>, "One bot, one dashboard", "Custom branding ready", "Multi-server license", "Managed hosting, $5 a month", "Zero-downtime updates"] },
];

/* "Pick Your Fleet": USD/Robux toggle, three ways to buy, and the ER:LC bots row. */
export default function Discover() {
  const root = useRef<HTMLDivElement>(null);
  const [yearly, setYearly] = useState(false);
  useFadeUps(root);

  return (
    <div id="pricing" className={`section_discover${yearly ? " is-yearly-view" : ""}`} ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="w-layout-vflex discover_top">
            <Split as="h4">Pick Your Fleet</Split>
            <div className="discover_descr"><div data-fade>Run one bot, mix two, or grab the All in One Pack. You only pay for what you need, and every add-on is included free.</div></div>
            <div className="w-layout-hflex discover_togll-wrap">
              <div className={`w-layout-hflex discover_period${yearly ? " is-yearly" : ""}`}>
                <div>USD</div>
                <div className="switch-block" role="switch" aria-checked={yearly} tabIndex={0} onClick={() => setYearly((y) => !y)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setYearly((y) => !y); }}>
                  <div className="off"><div className="togll-circ" /></div>
                  <div className="on" />
                </div>
                <div className="togll-bold">Robux</div>
              </div>
              <div className="w-layout-hflex discover_promotion"><div>+30% Roblox fee</div></div>
            </div>
          </div>

          <div className="w-layout-grid discover_content">
            {PLANS.map((p) => (
              <a href={site.buildUrl} className="discover_card w-inline-block" key={p.name} data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name">
                    <div className="discover_icon-wrap">
                      <img src={`/al/${p.icon}`} loading="lazy" alt="" className="discover_icon" />
                      <img src={`/al/${p.iconHover}`} loading="lazy" alt="" className="discover_icon is-hover" />
                    </div>
                    <div className="discover_cena-wrap">
                      <div className="discover_month">{p.usd}</div>
                      <div className="discover_year"><div className="discover_month-year">{p.robux}</div><div className="t-size-14">one-time, paid on Roblox</div></div>
                    </div>
                  </div>
                  <div className="w-layout-vflex discpver_text">
                    <div className="discover_title">{p.name}</div>
                    <div>{p.text}</div>
                  </div>
                </div>
                <div className="discover_wrap">
                  <div className="button is-card"><div>Build your bot</div></div>
                  <div className="discover_list-wrap">
                    <div>Included:</div>
                    <div className="discover_list">
                      {p.features.map((f, i) => (
                        <div className="discover_item" key={i}><img src="/al/Check_Icon.svg" loading="lazy" alt="" className="icon" /><div>{f}</div></div>
                      ))}
                    </div>
                  </div>
                  <div className="discover_bg" />
                </div>
              </a>
            ))}
          </div>

          <div className="discover_solutions">
            <Split as="h5" className="discover_h-solut">ER:LC Bots</Split>
            <div className="discover_grid">
              <a href={site.buildUrl} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/user-add--01.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/user-add--01.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <div className="additional_price">$19.99<br /><span className="p-14">one-time, hosted free</span></div>
                  </div>
                  <div className="w-layout-vflex discpver_text is-sol"><div className="discover_title">{site.name} Dispatch</div><div>An AI voice dispatcher that reads 911 calls aloud and talks back.</div></div>
                </div>
                <div className="button is-card"><div>Build it</div></div>
              </a>
              <a href={site.buildUrl} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/license.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/license.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <div className="additional_price">$99<br /><span className="p-14">one-time, hosted free</span></div>
                  </div>
                  <div className="w-layout-vflex discpver_text"><div className="discover_title">{site.name} Roleplay</div><div>Everything an ER:LC roleplay community runs on, all dashboard-driven.</div></div>
                </div>
                <div className="button is-card"><div>Build it</div></div>
              </a>
              <a href={site.buildUrl} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/news.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/news.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <div className="additional_price">$119.99<br /><span className="p-14">four bots, hosted free</span></div>
                  </div>
                  <div className="w-layout-vflex discpver_text"><div className="discover_title">Roleplay Pack</div><div>Roleplay, Instructor, Dispatch and Department. Four bots for one ER:LC community, one price.</div></div>
                </div>
                <div className="button is-card"><div>Build it</div></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
