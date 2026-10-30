"use client";

import { site } from "@/config/site";
import { Brand, Split } from "./primitives";

const LINKS: [string, string, string?][] = [["/", "Home", "w--current"], ["#features", "Features"], ["#dashboard", "About"], ["#pricing", "Pricing"], [site.helpUrl, "Become an Affiliate"], [site.helpUrl, "Help Center"], ["#terms", "Terms of Service"], ["#privacy", "Privacy Policy"]];

/* The footer: link column, centred brand with socials, Launch App and back-to-top, the legal line, and the
   oversized name whose letters rise in as it scrolls into view. */
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
              <div>Dynamic solutions to elevate your trading success. Discover our unmatched performance, trusted by top traders worldwide.</div>
              <div className="w-layout-hflex footer_socia">
                <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="LinkedIn">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M4.66699 6.66602V11.3327" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /><path d="M7.33301 8.66602V11.3327M7.33301 8.66602C7.33301 7.56145 8.22844 6.66602 9.33301 6.66602C10.4376 6.66602 11.333 7.56145 11.333 8.66602V11.3327M7.33301 8.66602V6.66602" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" /><path d="M4.672 4.66602L4.66602 4.66602" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /><path d="M1.66699 7.99935C1.66699 5.01379 1.66699 3.52101 2.59449 2.59351C3.52198 1.66602 5.01476 1.66602 8.00033 1.66602C10.9859 1.66602 12.4787 1.66602 13.4062 2.59351C14.3337 3.52101 14.3337 5.01379 14.3337 7.99935C14.3337 10.9849 14.3337 12.4777 13.4062 13.4052C12.4787 14.3327 10.9859 14.3327 8.00033 14.3327C5.01476 14.3327 3.52198 14.3327 2.59449 13.4052C1.66699 12.4777 1.66699 10.9849 1.66699 7.99935Z" stroke="currentColor" strokeLinejoin="round" /></svg>
                  </div>
                </a>
                <a href={site.social.instagram} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="Instagram">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M1.66699 7.99935C1.66699 5.01379 1.66699 3.52101 2.59449 2.59351C3.52198 1.66602 5.01476 1.66602 8.00033 1.66602C10.9859 1.66602 12.4787 1.66602 13.4062 2.59351C14.3337 3.52101 14.3337 5.01379 14.3337 7.99935C14.3337 10.9849 14.3337 12.4777 13.4062 13.4052C12.4787 14.3327 10.9859 14.3327 8.00033 14.3327C5.01476 14.3327 3.52198 14.3327 2.59449 13.4052C1.66699 12.4777 1.66699 10.9849 1.66699 7.99935Z" stroke="currentColor" strokeLinejoin="round" /><path d="M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z" stroke="currentColor" /><path d="M11.6719 4.33203L11.6651 4.33203" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </a>
                <a href={site.social.x} target="_blank" rel="noreferrer" className="footer_soc w-inline-block" aria-label="X">
                  <div className="icon-16 w-embed">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16" fill="none"><path d="M9.29712 6.928L14.3601 1H13.1601L8.76513 6.147L5.25313 1H1.20312L6.51313 8.784L1.20312 15H2.40313L7.04513 9.564L10.7541 15H14.8041L9.29712 6.928ZM7.65413 8.852L7.11613 8.077L2.83512 1.91H4.67813L8.13212 6.887L8.67013 7.662L13.1611 14.132H11.3181L7.65413 8.852Z" fill="currentColor" /></svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="w-layout-vflex footer_right">
              <a href={site.appUrl} className="button w-button">Launch App</a>
              <a href="#top" className="btn-top w-inline-block"><img src="/al/Arrow_Icon.svg" loading="lazy" alt="" className="arrow-icon" style={{ transform: "rotate(180deg)" }} /></a>
              <a href="#" className="link">Website by eloqwnt</a>
            </div>
          </div>
          <div className="footer_btm">
            <div className="footer_btm-content">
              <Split>© All rights reserved. 2026 {site.name}</Split>
              <a href={`mailto:${site.email}`} className="footer_link is-mail">{site.email}</a>
            </div>
            <Split effect="letters-up" className="footer_text">{site.name}</Split>
          </div>
        </div>
      </div>
    </div>
  );
}
