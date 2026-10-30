"use client";

import { useRef, useState } from "react";
import { site } from "@/config/site";
import { Split, useFadeUps } from "./primitives";

const PLANS = [
  { icon: "d-icon.svg", iconHover: "Price_Icon-h.svg", free: true, month: "Free", year: "Free", name: "Free Plan", text: `See what ${site.name} can reveal. Test our core functions and connectors.`, features: ["Connect 1 trading account", "Daily account updates", "Limited analytics dashboard", "Limited leaderboard access"] },
  { icon: "Price_Icon.png", iconHover: "44.svg", month: "$5/month", year: "$4/month", name: "Basic Plan", text: "Improve your trading with advanced analytics and find verified investment opportunities.", features: ["Connect 1 trading account", "Real-time account updates", "Full analytics dashboard", "Full leaderboard access & shareable trackrecord", <strong key="f">Funding program unlocked (90 days)</strong>] },
  { icon: "cup_Icon.svg", iconHover: "6453.svg", month: "$29/month", year: "$24/month", name: "Pro Plan", text: "Turn your trading into opportunity. Rank on the leaderboard and get faster access to funding.", features: [<strong key="a">Everything in Basic</strong>, "Includes 3 trading accounts", <strong key="b">Funding program shortlist (30 days)</strong>, "Display your strategy on the leaderboard", "Unlocks automated US CPA audits", "Institutional tools (coming soon)"] },
];

/* "Discover Your Perfect Plan": monthly/yearly toggle, three plans, and the additional solutions row. */
export default function Discover() {
  const root = useRef<HTMLDivElement>(null);
  const [yearly, setYearly] = useState(false);
  useFadeUps(root);

  return (
    <div id="pricing" className={`section_discover${yearly ? " is-yearly-view" : ""}`} ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="w-layout-vflex discover_top">
            <Split as="h4">Discover Your Perfect Plan</Split>
            <div className="discover_descr"><div data-fade>Find the perfect plan tailored to elevate your trading experience and meet your specific needs.</div></div>
            <div className="w-layout-hflex discover_togll-wrap">
              <div className={`w-layout-hflex discover_period${yearly ? " is-yearly" : ""}`}>
                <div>Monthly</div>
                <div className="switch-block" role="switch" aria-checked={yearly} tabIndex={0} onClick={() => setYearly((y) => !y)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setYearly((y) => !y); }}>
                  <div className="off"><div className="togll-circ" /></div>
                  <div className="on" />
                </div>
                <div className="togll-bold">Yearly</div>
              </div>
              <div className="w-layout-hflex discover_promotion"><div>20% off</div></div>
            </div>
          </div>

          <div className="w-layout-grid discover_content">
            {PLANS.map((p) => (
              <a href={site.signupUrl} className="discover_card w-inline-block" key={p.name} data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name">
                    <div className="discover_icon-wrap">
                      <img src={`/al/${p.icon}`} loading="lazy" alt="" className="discover_icon" />
                      <img src={`/al/${p.iconHover}`} loading="lazy" alt="" className="discover_icon is-hover" />
                    </div>
                    <div className="discover_cena-wrap">
                      {p.free ? <Split>Free</Split> : (
                        <>
                          <div className="discover_month">{p.month}</div>
                          <div className="discover_year"><div className="discover_month-year">{p.year}</div><div className="t-size-14">billed annually</div></div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="w-layout-vflex discpver_text">
                    <div className="discover_title">{p.name}</div>
                    <div>{p.text}</div>
                  </div>
                </div>
                <div className="discover_wrap">
                  <div className="button is-card"><div>Get Started</div></div>
                  <div className="discover_list-wrap">
                    <div>Features:</div>
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
            <Split as="h5" className="discover_h-solut">Additional Solutions</Split>
            <div className="discover_grid">
              <a href={site.signupUrl} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/user-add--01.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/user-add--01.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <div className="additional_price">$5/month<br /><span className="p-14">per account</span></div>
                  </div>
                  <div className="w-layout-vflex discpver_text is-sol"><div className="discover_title">Additional account</div><div>Add one additional trading account.</div></div>
                </div>
                <div className="button is-card"><div>Get Started</div></div>
              </a>
              <a href={site.signupUrl} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/license.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/license.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <div className="additional_price">$79/month<br /><span className="p-14">add-on</span></div>
                  </div>
                  <div className="w-layout-vflex discpver_text"><div className="discover_title">Live US CPA Audit</div><div>Have your trading audited by a US CPA.</div></div>
                </div>
                <div className="button is-card"><div>Get Started</div></div>
              </a>
              <a href={`mailto:${site.email}`} className="discover_card is-sol w-inline-block" data-fade>
                <div className="discover_card-top">
                  <div className="w-layout-hflex discover_card-name is-sol">
                    <div className="discover_icon-wrap"><img src="/al/news.svg" loading="lazy" alt="" className="discover_icon" /><img src="/al/news.svg" loading="lazy" alt="" className="discover_icon is-hover" /></div>
                    <Split className="discover_title-sol">Custom</Split>
                  </div>
                  <div className="w-layout-vflex discpver_text"><div className="discover_title">Enterprise White-Labeling</div><div>For firms looking for enterprise solutions.</div></div>
                </div>
                <div className="button is-card"><div>Contact us</div></div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
