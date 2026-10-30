"use client";

import { useRef } from "react";
import { useReveal, useCountUp, thousands } from "@/lib/hooks";

function Stat({ to, format, label }: { to: number; format: (v: number) => string; label: string }) {
  const ref = useCountUp<HTMLElement>(to, format);
  return (
    <div className="stat">
      <strong ref={ref}>{format(0)}</strong>
      <span>{label}</span>
    </div>
  );
}

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="experience" id="experience" ref={root}>
      <h2 className="section-title" data-fade>Trading Experience</h2>
      <p className="stats-label" data-fade>Statistics:</p>
      <div className="stats" data-fade>
        <Stat to={50000} format={thousands("k+", 1000)} label="Accounts" />
        <Stat to={250000} format={thousands("k+", 1000)} label="Pro Traders" />
        <Stat to={1000000} format={thousands("M+", 1000000)} label="Trading Capital" />
      </div>
    </section>
  );
}
