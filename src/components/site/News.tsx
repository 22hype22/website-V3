"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionTemplate } from "motion/react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/hooks";
import { site } from "@/config/site";

const POSTS = [
  { title: "Trading Innovation Success", text: "Explore how innovative tools and strategies are shaping the future of trading, providing traders with cutting-edge solutions for maximizing performance and staying ahead of the competition." },
  { title: "Explore Lucrative\nInvestment Opportunities", text: "Discover diverse and profitable avenues to grow your wealth with carefully vetted investment options." },
  { title: "Trade Anytime, Anywhere\nwith Confidence", text: "Empower your trading journey with a flexible platform that allows you to access markets globally, ensuring you never miss an opportunity, regardless of your location or schedule." },
  { title: "Boost Security with\nCutting-Edge Technology", text: "Explore the latest innovations in data protection and how they safeguard your trading activities." },
];

const GAP = 14;

/* The news carousel: the arrows move the row one card at a time on a spring (Framer Motion),
   and the thin bar underneath shows where you are. */
export default function News() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const x = useSpring(0, { stiffness: 160, damping: 24 });
  const transform = useMotionTemplate`translateX(${x}px)`;
  useReveal(root);

  useEffect(() => {
    const measure = () => {
      const el = track.current; if (!el) return;
      const card = el.firstElementChild as HTMLElement;
      setPerView(Math.max(1, Math.floor(el.parentElement!.clientWidth / (card.offsetWidth + GAP))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const max = Math.max(0, POSTS.length - perView);
  useEffect(() => {
    const el = track.current; if (!el) return;
    const card = el.firstElementChild as HTMLElement;
    x.set(-Math.min(index, max) * (card.offsetWidth + GAP));
  }, [index, max, x]);

  const seg = 100 / (max + 1);

  return (
    <section className="news" id="news" ref={root}>
      <div className="rule-row rule-row-thin">
        <span>{site.name.toUpperCase()} NEWS</span>
        <ArrowUpRight className="rule-arrow" size={10} strokeWidth={2.5} />
      </div>
      <div className="news-head">
        <h2 data-fade>Stories and Trends Shaping<br />the Future of Finance</h2>
        <div className="news-arrows">
          <button className="arrow-prev" onClick={() => setIndex((i) => Math.max(0, i - 1))} aria-label="Previous"><ArrowLeft size={12} strokeWidth={2} /></button>
          <motion.button className="arrow-next" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} onClick={() => setIndex((i) => Math.min(max, i + 1))} aria-label="Next"><ArrowRight size={12} strokeWidth={2} /></motion.button>
        </div>
      </div>
      <motion.div className="news-track" ref={track} style={{ transform }}>
        {POSTS.map((p, i) => (
          <article key={i} className="ncard" data-fade>
            <div className={`nimg nimg-${i + 1}`}><Art i={i} /></div>
            <div className="nmeta"><span>8 min read</span><i>•</i><span>2024-20-10</span></div>
            <h3>{p.title.split("\n").map((l, k) => <span key={k}>{l}{k === 0 && p.title.includes("\n") ? <br /> : null}</span>)}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </motion.div>
      <div className="news-progress"><motion.i animate={{ width: `${seg}%`, left: `${Math.min(index, max) * seg}%` }} transition={{ type: "spring", stiffness: 160, damping: 24 }} /></div>
    </section>
  );
}

/* The four card images, rebuilt in CSS: a tilted billboard on tiles, two posters, a subway door with a poster, a red train. */
function Art({ i }: { i: number }) {
  if (i === 0) return <div className="poster poster-wide"><span>Take control of<br />your investments</span><b>53</b><i>Total profit</i><em><img src="/assets/oversite-mark-white.png" alt="" />{site.name}</em></div>;
  if (i === 1) return <><div className="poster poster-a"><span>Seamless<br />Investment</span><b className="tri" /><em>Today, we proudly<br />achieved a profit<br />of $18.3M</em></div><div className="poster poster-b"><span>$150K</span><b className="orb-shape" /></div></>;
  if (i === 2) return <div className="subway"><div className="subway-poster"><span>Lead Trading<br />Forward</span><b className="tri tri-lg" /></div><div className="subway-door" /><div className="subway-stripe" /></div>;
  return <div className="billboard"><em><img src="/assets/oversite-mark-white.png" alt="" />{site.name}</em><span>$150K <b>+123.7%</b></span></div>;
}
