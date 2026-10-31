import type { Metadata } from "next";
import Legal from "@/components/site/Legal";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = { title: "Sales & Refund Policy — Oversite" };

export default function Page() {
  return <Legal doc={LEGAL.find((d) => d.slug === "refunds")!} />;
}
