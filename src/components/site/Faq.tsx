"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Mark, Split, useFadeUps } from "./primitives";
import Assistant from "./Assistant";

const QA: [string, string][] = [
  [`What is ${site.name}?`, `${site.name} Customs is the ER:LC design product from ${site.name}: a managed Discord bot plus web dashboard that runs a Roblox ER:LC (Emergency Response: Liberty County) design server end to end. Commissions and order tickets, designer portfolios, package storefronts, payments, a credits economy, Roblox verification and group sync, and join logs all live in one place, with nothing to self-host.`],
  [`Sell me on why ${site.name}`, `Looking at the bot market there are three ways you can take. Making a bot yourself, this could be through AI spending all that money on credits then keeping up to date on the bot weekly when Discord makes changes. Paying for a custom bot usually priced at $30-50 then $20 to host it and any future updates or bug fixes are another $20-40. Or you can just go with ${site.name}: one time payment, free hosting for life, and any future updates we make get automatically applied to your bot for completely free.`],
  [`What can ${site.name} do for an ERLC design server?`, "It handles the full commission workflow: order tickets, an order-status board, designer portfolios, package storefronts, payments, credits, Roblox verification, group sync, and join logs. A design server can take, track, and deliver work like a real business from one dashboard."],
  ["Do I have to host anything myself?", `No. Every bot runs on ${site.name}'s infrastructure. There's no VPS to rent, no process to keep alive, and no token to babysit. You connect your server and we run it.`],
  ["How fast can I get set up?", "Minutes. Authorize the bots, choose what you want enabled, and our auto-deploy pipeline has you live in under sixty seconds, all from the dashboard."],
];

/* "FAQ": the accordion. One answer open at a time; the plus turns into a minus. */
export default function Faq() {
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [chat, setChat] = useState(false);

  // "Got something else?": the heading side slides out left and the questions slide out right, then the chat
  // scene fades in over the page. Closing the chat brings both halves back.
  const openChat = () => {
    const left = root.current?.querySelector(".faq_left"), items = root.current?.querySelector(".faq_items");
    if (!left || !items) { setChat(true); return; }
    gsap.to(left, { x: -140, opacity: 0, duration: 0.55, ease: "power3.inOut" });
    gsap.to(items, { x: 140, opacity: 0, duration: 0.55, ease: "power3.inOut", onComplete: () => setChat(true) });
  };
  const closeChat = () => {
    setChat(false);
    const left = root.current?.querySelector(".faq_left"), items = root.current?.querySelector(".faq_items");
    if (!left || !items) return;
    gsap.to([left, items], { x: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.05 });
  };
  useFadeUps(root);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".dropdown-list-qn", root.current).forEach((list, i) => {
      gsap.to(list, { height: open === i ? "auto" : 0, duration: 0.3, ease: "power2.out" });
    });
  }, { scope: root, dependencies: [open] });

  return (
    <div id="faq" className="section_faq" ref={root}>
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <div className="title-top">
            <Split>FAQ</Split>
            <div className="title-icon"><Mark /></div>
          </div>
          <div className="w-layout-hflex faq_wrap">
            <div className="faq_left">
              <Split as="h2">Frequently Asked Questions</Split>
              <div className="faq_sub"><div data-fade>Everything worth knowing before you deploy. Still curious? Ask our assistant anything, in your own words.</div></div>
              <button type="button" className="button w-button" data-fade onClick={openChat}>Got something else?</button>
              <Assistant open={chat} onClose={closeChat} />
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
