"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Mark, Split, useFadeUps } from "./primitives";

const QA: [string, string][] = [
  [`How does ${site.name} work?`, `${site.name} connects your trading accounts and analyzes performance in real time. It tracks key metrics, visualizes results, and helps identify patterns and opportunities for improvement. It allows sharing and is capable of auditing trading results to establish a layer of trust between investors and asset managers. All data is processed securely, giving you clear insights to make more informed trading decisions.`],
  [`How does the ${site.name} funding program work?`, `Our unique funding program allows you to turn any trading account into an evaluation account. We cooperate with licensed asset managers and multiple Cayman-domiciled funds to connect successful traders with allocators. Keep your account connected with ${site.name} to complete the requirements to join. Once approved, you will be invited to an interview to start the onboarding process. Our minimum funding is $100,000 USD with allocations up to $20,000,000 USD available, offering a real and longterm career opportunity. Note that the funding program and profit splits are subject to selection criteria from our partnered allocators. Check our help center for more details.`],
  ["Who can use the platform?", `${site.name} is designed for any investor looking to gain more insights into their trading. Beyond serving as a institutional grade dashboard and analytics tool, the audit and share capabilities make it ideal for raising capital and gaining trust with potential investors.`],
  ["How is performance verified?", `${site.name} uses a proprietary API to connect directly to your trading account on any of the supported platforms. Your trading records (e.g. Trading History, Balance, Equity) are synced, tracked and compared to ground-truth asset prices. This comparison allows to verify not only closed, but importantly point in time mark-to-market returns and deliver US CPA verified audits.`],
  ["Can I connect multiple accounts?", `Yes, you can connect multiple accounts depending on your account plan. If you have reached the limit of your plan, you can add further accounts under the same plan with our "additional account" add-on.`],
  [`What makes ${site.name} different?`, `In contrast to similar services, ${site.name} is the only platform that is able to compute point in time mark-to-market equity returns giving outstanding insights into your trading. This, in combination with our CPA cooperation make it not only the strongest analytical tool on the market, but also the benchmark for institutional trust.`],
];

/* "FAQ": the accordion. One answer open at a time; the plus turns into a minus. */
export default function Faq() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useFadeUps(root);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".dropdown-list-qn", root.current).forEach((list, i) => {
      gsap.to(list, { height: open === i ? "auto" : 0, duration: 0.3, ease: "power2.out" });
    });
  }, { scope: root, dependencies: [open] });

  return (
    <div id="blog-faq" className="section_faq" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top">
            <Split>FAQ</Split>
            <div className="title-icon"><Mark /></div>
          </div>
          <div className="w-layout-hflex faq_wrap">
            <div className="faq_left">
              <Split as="h2">Frequently Asked Questions</Split>
              <div className="faq_sub"><div data-fade>Everything you need to know about the&nbsp;platform, features, and getting started.</div></div>
              <a href={site.helpUrl} className="button w-button" data-fade>Help Center</a>
            </div>
            <div className="w-layout-vflex faq_items">
              {QA.map(([q, a], i) => (
                <div className="dropd-q-wrap" key={q} data-fade>
                  <div className={`dropdown-qna w-dropdown${open === i ? " is-open" : ""}`}>
                    <div className="toggle-qna w-dropdown-toggle" role="button" tabIndex={0} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(open === i ? null : i); } }}>
                      <div className="qna-between">
                        <div className="w-layout-hflex faq-goggle"><div className="q">{q}</div></div>
                        <div className="qnaplus"><div className="faq-g" /><div className="faq-v" /></div>
                      </div>
                    </div>
                    <nav className="dropdown-list-qn w-dropdown-list"><div className="a-trxt">{a}</div></nav>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
