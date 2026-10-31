"use client";

import { useRef } from "react";
import { Split } from "./primitives";

/* "Powered by Managed Infrastructure, Always On": a plain dark band with just the headline. */
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
        </div>
      </div>
    </div>
  );
}
