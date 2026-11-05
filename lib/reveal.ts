"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/// گروه‌هایی که به‌جای ظاهرشدنِ یک‌جا، تک‌تک کارت‌هایشان با فاصلهٔ کم ظاهر می‌شوند
/// (پلن‌ها، ردیف امکانات، پرسش‌های متداول) — همان بلوکِ lp-reveal، فقط فرزندانش پشت‌سرهم.
const STAGGER_GROUPS: { container: string; items: string }[] = [
  { container: ".lp-plans", items: ".lp-plan" },
  { container: ".lp-faq", items: "details" },
];

/// ظهور تدریجی هنگام اسکرول با GSAP ScrollTrigger؛ در حالت «کاهش حرکت» اجرا نمی‌شود.
export function useRevealOnScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const allReveal = gsap.utils.toArray<HTMLElement>(".lp-reveal");

    if (reduced) {
      gsap.set(allReveal, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const staggeredBlocks = new Set<HTMLElement>();

      STAGGER_GROUPS.forEach(({ container, items }) => {
        document.querySelectorAll<HTMLElement>(container).forEach((containerEl) => {
          const block = containerEl.closest<HTMLElement>(".lp-reveal") ?? containerEl;
          staggeredBlocks.add(block);
          // خودِ بلوک فوراً از حالت مخفیِ اولیهٔ CSS خارج می‌شود؛ انیمیشن روی فرزندانش اجرا می‌شود.
          gsap.set(block, { opacity: 1, y: 0 });
          const children = gsap.utils.toArray<HTMLElement>(items, containerEl);
          if (!children.length) return;
          gsap.set(children, { opacity: 0, y: 24 });
          ScrollTrigger.create({
            trigger: block,
            start: "top 88%",
            once: true,
            onEnter: () =>
              gsap.to(children, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.08 }),
          });
        });
      });

      allReveal
        .filter((el) => !staggeredBlocks.has(el))
        .forEach((el) => {
          gsap.set(el, { opacity: 0, y: 24 });
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            once: true,
            onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }),
          });
        });
    });

    return () => ctx.revert();
  }, []);
}
