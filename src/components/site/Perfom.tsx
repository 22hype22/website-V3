"use client";

import { useRef } from "react";
import { Split } from "./primitives";

/* "Powered by Managed Infrastructure, Always On": a plain section you scroll past. The headline sits above the
   GPU board, which is shown in colour with its four badges from the start (nothing pins or rides in). */
export default function Perfom() {
  const root = useRef<HTMLDivElement>(null);

  return (
    <div className="section_perfom" ref={root}>
      <div className="padding-global is-perfom">
        <div className="perfom_content">
          <div className="w-layout-vflex perfom_h-wrap">
            <Split className="perfom_h-1">Powered by Managed</Split>
            <Split className="perfom_h-2">Infrastructure, Always On</Split>
          </div>
          <div className="perfom_t-wrap"><div /><div /></div>
          <div className="perfom_wrap-scroll">
            <div className="perfom_badge is-1"><div className="perfom_title">Managed Hosting</div><div className="text-block-5">Nothing to self-host</div></div>
            <div className="perfom_badge is-2"><div className="perfom_title">Auto-Deploy</div><div>Live in under 60 seconds</div></div>
            <div className="perfom_badge is-3"><div className="perfom_title">Zero Downtime</div><div>Updates without restarts</div></div>
            <div className="perfom_badge is-4"><div className="perfom_title">Isolated Data</div><div>Permission-gated per server</div></div>
            <div className="perfom_wrap-img">
              <img src="/al/perf.webp" loading="lazy" alt="" className="perfom_img" />
              <img src="/al/Color_1.webp" loading="lazy" alt="" className="perfom_img is-color" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
