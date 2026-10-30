import { site } from "@/config/site";

/* The badge card with the brand name, a brushed diagonal texture and the mark: the small one sits in the
   funding product card, the large one is the centrepiece of the feature grid. */
export default function Shield({ size = "sm", className = "" }: { size?: "sm" | "lg"; className?: string }) {
  return (
    <div className={`shield shield-${size} ${className}`}>
      <span className="shield-name">{site.name}</span>
      <img src="/assets/oversite-mark-white.png" alt="" />
    </div>
  );
}
