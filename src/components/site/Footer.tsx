"use client";

import { site } from "@/config/site";
import { Brand } from "./primitives";

const LINKS: [string, string, string?][] = [["/", "Home", "w--current"], ["#why", "Why Oversite"], ["#process", "Our Process"], ["#fleet", "Bots"], ["#pricing", "Pricing"], [site.erlcUrl, "ER:LC Design"], ["#faq", "FAQ"]];

/* The footer: link column, centred brand with the Discord, Deploy now and back-to-top. The legal line below it is
   its own component (LegalBar) so it can stick to the bottom of the screen. */
export default function Footer() {
  return (
    <div id="contact" className="section_footer">
      <div className="padding-global">
        <div className="container-large">
          <div className="footer_content">
            <div className="w-layout-vflex footer_menu">
              {LINKS.map(([href, label, cur]) => (
                <div className="link-wrapper" key={label}>
                  <a href={href} className={`nav-link is-footer${cur ? " " + cur : ""}`}>{label}</a>
                  <div className="hover-line" />
                </div>
              ))}
            </div>
            <div className="w-layout-vflex footer_center">
              <div className="brand is-footer w-nav-brand"><Brand footer /></div>
              <div>Managed Discord bots for serious servers. Nothing to host, no tokens, no code. Remote-first, est. {site.founded}.</div>
              <div className="w-layout-hflex footer_socia">
                <a href={site.discordUrl} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="Discord">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M13.3 3.4a12.5 12.5 0 0 0-3.1-1 8.7 8.7 0 0 0-.4.8 11.6 11.6 0 0 0-3.5 0 8.6 8.6 0 0 0-.4-.8 12.4 12.4 0 0 0-3.1 1C.8 6.4.3 9.3.5 12.2a12.6 12.6 0 0 0 3.8 1.9c.3-.4.6-.9.8-1.3-.5-.2-.9-.4-1.3-.7l.3-.2a9 9 0 0 0 7.8 0l.3.2c-.4.3-.8.5-1.3.7.2.5.5.9.8 1.3a12.5 12.5 0 0 0 3.8-1.9c.3-3.3-.5-6.2-2.2-8.8ZM5.6 10.4c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5c.8 0 1.4.7 1.3 1.5 0 .8-.5 1.5-1.3 1.5Zm4.8 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5c.8 0 1.4.7 1.3 1.5 0 .8-.5 1.5-1.3 1.5Z" fill="currentColor" /></svg>
                  </div>
                </a>
                <a href={site.discordUrl} target="_blank" rel="noreferrer" className="footer_link">{site.discordHandle}</a>
              </div>
            </div>
            <div className="w-layout-vflex footer_right">
              <a href={site.appUrl} className="button w-button">Deploy now</a>
              <a href="#top" className="btn-top w-inline-block"><img src="/al/Arrow_Icon.svg" loading="lazy" alt="" className="arrow-icon" style={{ transform: "rotate(180deg)" }} /></a>
              <div className="link">Not affiliated with Discord Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
