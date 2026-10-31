"use client";

import { Mark, Split } from "./primitives";

/* "CONNECT. CONFIGURE. DEPLOY." and the statement paragraph that brightens word by word as it comes into view. */
export default function Get() {
  return (
    <div className="section_get">
      <div className="padding-global is-100">
        <div className="container-large is-100">
          <div className="get_content">
            <div className="get_top">
              <Split className="text-block">CONNECT. CONFIGURE. DEPLOY.</Split>
              <div className="get_btn-wrap" />
            </div>
            <div className="get_center">
              <div className="get_icon"><Mark /></div>
              <Split as="h4" effect="animate-1" className="get_h">
                Fully managed Discord bots built for serious communities. No hosting, coding, or complicated setup required.<br />Connect your server, customize your features, and manage everything through one centralized dashboard. Get up and running in under a minute.
              </Split>
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}
