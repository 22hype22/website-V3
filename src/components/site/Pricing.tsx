"use client";

import { useRef } from "react";
import { Shield, Zap, Trophy, CircleCheck } from "lucide-react";
import { useReveal } from "@/lib/hooks";

const PLANS = [
  { icon: Shield, price: "Free", name: "Light Plan", blurb: "Ideal for newcomers to trading who want to start with the basics without any financial commitment.", features: ["Basic trade tracking to monitor your investments", "Access to essential market data and trends", "User-friendly interface designed for beginners", "Community forum access for shared insights and strategies", "Educational resources, including tutorials and articles"] },
  { icon: Zap, price: "$6/month", name: "Standard Plan", featured: true, blurb: "Enhance your trading experience with advanced tools and insights to make informed decisions.", features: ["Advanced analytics tools to help you understand market movements", "Access to customizable charts and technical indicators", "Additional trading features, including limit orders and stop-loss options", "Integration with third-party trading platforms and APIs", "Participation in community challenges with rewards"] },
  { icon: Trophy, price: "$99/month", name: "Premium Plan", blurb: "Comprehensive solutions for professional traders and firms managing larger portfolios.", features: ["All features included from the Standard Plan", "Enhanced reporting options with real-time performance analytics", "Participation in our exclusive funding program (up to $1,000,000)", "Priority customer support with dedicated account managers", "Risk management tools to protect your investments"] },
];

export default function Pricing() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section className="pricing" id="pricing" ref={root}>
      <h2 data-fade>Discover Your <em>Perfect Trading Plan</em></h2>
      <p className="pricing-sub" data-fade>Find the perfect plan tailored to elevate your trading<br />experience and meet your specific needs.</p>
      <div className="plans">
        {PLANS.map((p) => (
          <div key={p.name} className={`plan${p.featured ? " plan-featured" : ""}`} data-fade>
            <div className="plan-top"><span className="plan-icon"><p.icon size={12} strokeWidth={2} fill={p.featured ? "currentColor" : "none"} /></span><strong>{p.price}</strong></div>
            <h3>{p.name}</h3>
            <p>{p.blurb}</p>
            <div className="plan-box">
              <a className={`btn ${p.featured ? "btn-light" : "btn-ghost"}`} href="#trial">Get Started</a>
              <span className="features-label">FEATURES:</span>
              <ul>{p.features.map((f) => <li key={f}><CircleCheck size={8} strokeWidth={2.5} fill="#e6e6e6" color="#0a0a0a" /> {f}</li>)}</ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
