"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { site } from "@/config/site";
import { Mark, Split, useFadeUps } from "./primitives";

const QA: [string, string][] = [
  ["What bots do you offer?", "Three core bots: Protection (anti-raid and moderation), Support (tickets) and Utilities (leveling, giveaways, live radio and more). There's also an All-in-One pack that fuses the three into a single bot, with ER:LC tools coming soon."],
  ["Do I have to host anything myself?", `No. Every bot runs on ${site.name}'s infrastructure. There's no VPS to rent, no process to keep alive, and no token to babysit. You connect your server and we run it.`],
  ["How fast can I get set up?", "Minutes. Authorize the bots, choose what you want enabled, and our auto-deploy pipeline has you live in under sixty seconds, all from the dashboard."],
  ["Can my moderators and staff get access?", "Yes. Invite your staff, assign roles to control what they can touch, and every change is written to an audit log so nothing happens off the record."],
  ["What happens if I cancel?", "Cancel anytime from your dashboard. Charges stop right away, you get a thirty-second undo, and then the bot is removed from your servers and its data is deleted. If something is wrong with your bot, tell us within fourteen days of buying and we will fix it or refund you where it is fair to."],
  ["Do my settings survive updates and restarts?", "Yes. Your configuration is saved and reloads automatically, so updates and restarts never wipe your setup. Everything stays exactly where you left it."],
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
              <div className="faq_sub"><div data-fade>Everything worth knowing before you deploy. Still curious? Open a ticket in the&nbsp;Discord and we'll sort you out.</div></div>
              <a href={site.discordUrl} target="_blank" rel="noreferrer" className="button w-button" data-fade>Join the Discord</a>
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
