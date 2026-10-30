"use client";

import { Mark, Split } from "./primitives";

/* "DISCOVER. IMPROVE. RAISE." and the statement paragraph that brightens word by word as it comes into view. */
export default function Get() {
  return (
    <div className="section_get">
      <div className="padding-global is-100">
        <div className="container-large is-100">
          <div className="get_content">
            <div className="get_top">
              <Split className="text-block">DISCOVER. IMPROVE. RAISE.</Split>
              <div className="get_btn-wrap" />
            </div>
            <div className="get_center">
              <div className="get_icon"><Mark /></div>
              <Split as="h4" effect="animate-1" className="get_h">
                Turn any trading account into opportunity with our unique funding program.<br />Improve your trading with advanced analytics, or find verified track records on our leaderboards.
              </Split>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
