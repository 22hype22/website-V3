"use client";

import { site } from "@/config/site";

/* The legal line: copyright on the left, the three policies in the middle, the support address on the right.
   It is the last thing on the page and sticks to the bottom of the viewport while you scroll, then settles into
   its own spot under the footer once you get there. */
export default function LegalBar() {
  return (
    <div className="legal-bar">
      <div className="padding-global">
        <div className="container-large">
          <div className="legal-bar_row">
            <div className="legal-bar_copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</div>
            <nav className="legal-bar_links" aria-label="Legal">
              <a href={site.legal.privacy}>Privacy Policy</a>
              <a href={site.legal.terms}>Terms of Use</a>
              <a href={site.legal.refunds}>Sales and Refunds</a>
            </nav>
            <a href={`mailto:${site.email}`} className="legal-bar_mail">{site.email}</a>
          </div>
        </div>
      </div>
    </div>
  );
}
