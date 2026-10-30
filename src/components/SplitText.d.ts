/* Types for the React Bits SplitText component (JS + CSS variant). Every prop has a default in the component. */
import type { ComponentType } from "react";

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars" | string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  tag?: keyof React.JSX.IntrinsicElements;
  staggerFrom?: "start" | "center" | "end" | "edges" | "random" | number;
  mask?: boolean;
  effect?: "rise" | "fade" | "blur" | "flip" | "pop" | "skew" | "wave";
  trigger?: "view" | "load" | "hover" | "click";
  loop?: boolean;
  loopDelay?: number;
  hoverEffect?: "none" | "lift" | "wave";
  color?: string;
  accentColor?: string;
  onLetterAnimationComplete?: () => void;
}

declare const SplitText: ComponentType<SplitTextProps>;
export default SplitText;
