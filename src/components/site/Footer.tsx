"use client";

import { site } from "@/config/site";
import { Brand } from "./primitives";
import { rel } from "./Navbar";

const LINKS: [string, string, string?][] = [["/", "Home", "w--current"], ["#process", "Our Process"], ["#fleet", "Discord"], [site.botsUrl, "ER:LC"], [site.botsUrl, "FiveM"], ["#faq", "FAQ"]];

/* The footer: link column, centred brand with the Discord, TikTok and YouTube icons, and back-to-top. The legal line below it is
   its own component (LegalBar) so it can stick to the bottom of the screen. */
export default function Footer({ sub = false }: { sub?: boolean }) {
  return (
    <div id="contact" className="section_footer">
      <div className="padding-global">
        <div className="container-large">
          <div className="footer_content">
            <div className="w-layout-vflex footer_menu">
              {LINKS.map(([href, label, cur]) => (
                <div className="link-wrapper" key={label}>
                  <a href={rel(href, sub)} className={`nav-link is-footer${cur && !sub ? " " + cur : ""}`}>{label}</a>
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
                <a href={site.tiktokUrl} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="TikTok">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M11.2 1h-2.3v9.3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.2 0 .4 0 .6.1V6c-.2 0-.4 0-.6 0-2.4 0-4.3 1.9-4.3 4.3S4.5 14.6 6.9 14.6s4.3-1.9 4.3-4.3V5.6c.9.7 2 1.1 3.2 1.1V4.4c-1.8 0-3.2-1.5-3.2-3.4Z" fill="currentColor"/></svg>
                  </div>
                </a>
                <a href={site.youtubeUrl} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="YouTube">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M15.1 4.4a1.9 1.9 0 0 0-1.3-1.3C12.6 2.8 8 2.8 8 2.8s-4.6 0-5.8.3A1.9 1.9 0 0 0 .9 4.4C.6 5.6.6 8 .6 8s0 2.4.3 3.6a1.9 1.9 0 0 0 1.3 1.3c1.2.3 5.8.3 5.8.3s4.6 0 5.8-.3a1.9 1.9 0 0 0 1.3-1.3c.3-1.2.3-3.6.3-3.6s0-2.4-.3-3.6ZM6.5 10.2V5.8L10.4 8l-3.9 2.2Z" fill="currentColor"/></svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="w-layout-vflex footer_right">
              <a href="#top" className="btn-top w-inline-block"><img src="/al/Arrow_Icon.svg" loading="lazy" alt="" className="arrow-icon" style={{ transform: "rotate(180deg)" }} /></a>
              <div className="link">Not affiliated with Discord Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
