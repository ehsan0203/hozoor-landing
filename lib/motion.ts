"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/// پیش از اولین نقاشی اجرا شود تا حالت اولیهٔ انیمیشن‌ها (مخفی/جابه‌جا) فلش نزند.
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const faNumber = (n: number) => Math.round(n).toLocaleString("fa-IR");

/// عنوان را کلمه‌به‌کلمه می‌شکند (نه حرف‌به‌حرف؛ شکستن حروف فارسی اتصال آن‌ها را خراب می‌کند).
/// هر کلمه در یک پوستهٔ overflow:hidden است تا از زیر خط بالا بیاید.
function splitWords(el: HTMLElement) {
  const original = el.textContent ?? "";
  const words = original.trim().split(/\s+/);
  el.textContent = "";
  const inners: HTMLElement[] = [];
  words.forEach((w, i) => {
    const outer = document.createElement("span");
    outer.className = "lp-w";
    const inner = document.createElement("span");
    inner.className = "lp-w-i";
    inner.textContent = w;
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    inners.push(inner);
  });
  el.setAttribute("aria-label", original);
  return {
    inners,
    restore() {
      el.textContent = original;
      el.removeAttribute("aria-label");
    },
  };
}

const q = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const qa = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  gsap.utils.toArray<T>(sel, root);

/// همهٔ حرکت‌های صفحهٔ معرفی با GSAP. در حالت «کاهش حرکت» هیچ‌کدام اجرا نمی‌شود و صفحه
/// کاملاً ایستا و خوانا می‌ماند. افکت‌های ماوس‌محور فقط روی دستگاه‌های دارای ماوس و عرض دسکتاپ‌اند.
export function useLandingMotion() {
  useIsoLayoutEffect(() => {
    const restores: (() => void)[] = [];
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        fine: "(hover: hover) and (pointer: fine)",
        wide: "(min-width: 900px)",
      },
      (ctx) => {
        const { motion, fine, wide } = ctx.conditions as { motion: boolean; fine: boolean; wide: boolean };
        if (!motion) return;

        const once = (trigger: Element, start: string, run: () => void) =>
          ScrollTrigger.create({ trigger, start, once: true, onEnter: run });

        /* ---------- کمکی: شمارش از صفر تا مقدار ---------- */
        const countOnce = (els: HTMLElement[], trigger: Element, start: string) => {
          if (!els.length) return;
          els.forEach((el) => {
            const original = el.textContent ?? "";
            restores.push(() => (el.textContent = original));
            el.textContent = faNumber(0);
          });
          once(trigger, start, () =>
            els.forEach((el) => {
              const to = Number(el.dataset.count);
              const o = { v: 0 };
              gsap.to(o, {
                v: to,
                duration: 1.5,
                ease: "power2.out",
                onUpdate: () => (el.textContent = faNumber(o.v)),
                onComplete: () => (el.textContent = faNumber(to)),
              });
            }),
          );
        };
        /// حلقه‌های بی‌پایان فقط وقتی در دید هستند اجرا شوند (باتری و روانی اسکرول موبایل).
        const loopWhileVisible = (anim: gsap.core.Animation, trigger: Element) => {
          anim.pause();
          ScrollTrigger.create({
            trigger,
            start: "top bottom",
            end: "bottom top",
            onToggle: (st) => (st.isActive ? anim.play() : anim.pause()),
          });
        };

        /* ---------- نوار پیشرفت اسکرول ---------- */
        const bar = q(".lp-progress");
        if (bar) {
          gsap.set(bar, { scaleX: 0, transformOrigin: "100% 50%" });
          gsap.to(bar, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
          });
        }

        /* ---------- ناوبری: سایه بعد از شروع اسکرول ---------- */
        const nav = q(".lp-nav");
        if (nav) {
          ScrollTrigger.create({
            start: 24,
            end: "max",
            onToggle: (s) => nav.classList.toggle("is-scrolled", s.isActive),
          });
        }

        /* ---------- تیتر هیرو: کلمه‌به‌کلمه ---------- */
        const h1 = q("[data-hero-words]");
        if (h1) {
          const s = splitWords(h1);
          restores.push(s.restore);
          gsap.set(s.inners, { yPercent: 118, rotate: 4 });
          gsap.to(s.inners, {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.09,
            delay: 0.15,
          });
        }

        /* ---------- کارنامهٔ هیرو: نوار زمان و تردد‌ها ---------- */
        const sheet = q(".lp-sheet");
        if (sheet) {
          const tl = gsap.timeline({ delay: 0.75, defaults: { ease: "power3.out" } });
          tl.from(".lp-track-shift", { scaleX: 0, transformOrigin: "100% 50%", duration: 0.7 }, 0)
            .from(".lp-track-actual", { scaleX: 0, transformOrigin: "100% 50%", duration: 1.1, ease: "power3.inOut" }, 0.15)
            .from(".lp-track-late", { scale: 0, transformOrigin: "50% 50%", duration: 0.4, ease: "back.out(3)" }, 1.1)
            .from(".lp-punch", { y: 16, opacity: 0, duration: 0.55, stagger: 0.2 }, 0.45)
            .from(".lp-punch-verify svg", { scale: 0, rotate: -120, duration: 0.55, ease: "back.out(2.6)", stagger: 0.2 }, 0.8)
            .from(".lp-sheet-foot > div", { y: 12, opacity: 0, duration: 0.45, stagger: 0.1 }, 1)
            .from(".lp-sheet-foot b.is-ok", { scale: 1.35, color: "#22c55e", duration: 0.6, ease: "power2.out" }, 1.3);
        }

        /* ---------- نوار کلمات ---------- */
        const track = q(".lp-ticker-track");
        if (track) {
          const tween = gsap.to(track, { xPercent: 50, duration: 38, ease: "none", repeat: -1 });
          const wrap = track.parentElement!;
          const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.5 });
          const normal = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });
          wrap.addEventListener("pointerenter", slow);
          wrap.addEventListener("pointerleave", normal);
          restores.push(() => {
            wrap.removeEventListener("pointerenter", slow);
            wrap.removeEventListener("pointerleave", normal);
          });
        }

        /* ---------- عنوان بخش‌ها ---------- */
        qa(
          ".lp-pagehead .lp-h1, .lp-section-head .lp-h2, .lp-case-type .lp-h2, .lp-roi-type .lp-h2, .lp-mgr-type .lp-h2, .lp-faq-aside .lp-h2, .lp-cta h2",
        ).forEach((h) => {
          if (h.children.length) return;
          const s = splitWords(h);
          restores.push(s.restore);
          gsap.set(s.inners, { yPercent: 118, rotate: 3 });
          once(h, "top 90%", () =>
            gsap.to(s.inners, { yPercent: 0, rotate: 0, duration: 0.85, ease: "power4.out", stagger: 0.07 }),
          );
        });

        /* ---------- سه حالت ثبت تردد ---------- */
        qa(".lp-scn").forEach((card, i) => {
          const rows = qa(".lp-scn-rows li", card);
          const rowMarks = qa(".lp-scn-rows .lp-scn-mark", card);
          const result = q(".lp-scn-result", card);
          const resultMark = q(".lp-scn-result .lp-scn-mark", card);
          const flag = q(".lp-scn-flag", card);

          gsap.set(card, { opacity: 0, y: 46 });
          gsap.set(rows, { opacity: 0, x: 26 });
          gsap.set([...rowMarks, resultMark], { scale: 0 });
          gsap.set(result, { opacity: 0, y: 12 });

          const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
          tl.to(card, { opacity: 1, y: 0, duration: 0.7 })
            .to(rows, { opacity: 1, x: 0, duration: 0.5, stagger: 0.32 }, "-=0.3")
            .to(rowMarks, { scale: 1, duration: 0.55, ease: "back.out(2.6)", stagger: 0.32 }, "<0.12")
            .to(result, { opacity: 1, y: 0, duration: 0.45 }, ">-0.05")
            .to(resultMark, { scale: 1, duration: 0.6, ease: "back.out(3)" }, "<0.1");
          // علامت‌های رد کمی تکان می‌خورند تا «رد شد» حس شود
          card.querySelectorAll(".lp-scn-mark.is-fail").forEach((m) => {
            tl.to(m, { x: 3, duration: 0.06, repeat: 5, yoyo: true, ease: "none" }, ">");
          });

          once(card, "top 86%", () => {
            gsap.delayedCall(i * 0.14, () => tl.play());
            if (flag) gsap.to(flag, { scale: 1.06, duration: 1.1, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.4 });
          });
        });

        /* ---------- پنل مدیر ---------- */
        const mgr = q(".lp-mgr");
        if (mgr) {
          const rows = qa(".lp-mgr-list li", mgr);
          gsap.set(rows, { opacity: 0, x: 34 });
          const counts = qa<HTMLElement>("[data-count]", mgr);
          counts.forEach((el) => {
            const original = el.textContent ?? "";
            restores.push(() => (el.textContent = original));
            el.textContent = faNumber(0);
          });
          once(mgr, "top 80%", () => {
            gsap.to(rows, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.14, delay: 0.5 });

            // «زنده»: هر چند ثانیه یک ورود جدید می‌رسد و شمارنده‌ها به‌روز می‌شوند
            const toast = q(".lp-mgr-toast", mgr);
            const present = counts.find((c) => c.classList.contains("is-ok"));
            const missing = counts.find((c) => c.classList.contains("is-miss"));
            if (toast && present && missing) {
              const live = gsap.timeline({ repeat: -1, delay: 3.2, repeatDelay: 1.6 });
              live
                .fromTo(toast, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(2)" })
                .add(() => {
                  tweenNumber(present, 16, 17, faNumber);
                  tweenNumber(missing, 1, 0, faNumber);
                  gsap.fromTo([present, missing], { scale: 1.35 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
                }, "<0.25")
                .to(toast, { opacity: 0, y: -8, duration: 0.4 }, "+=2.6")
                .add(() => {
                  tweenNumber(present, 17, 16, faNumber);
                  tweenNumber(missing, 0, 1, faNumber);
                });
              loopWhileVisible(live, mgr);
            }
            counts.forEach((el) => {
              const to = Number(el.dataset.count);
              const o = { v: 0 };
              gsap.to(o, {
                v: to,
                duration: 1.4,
                ease: "power2.out",
                onUpdate: () => (el.textContent = faNumber(o.v)),
                onComplete: () => (el.textContent = faNumber(to)),
              });
            });
          });
        }

        /* ---------- جدول‌ها: ردیف‌ها و تیک‌ها ---------- */
        [".lp-report", ".lp-compare"].forEach((sel) => {
          const box = q(sel);
          if (!box) return;
          const rows = qa("tbody tr", box);
          const pops = qa(".is-us span", box);
          const bars = qa(".lp-wbar i", box);
          gsap.set(rows, { opacity: 0, y: 18 });
          if (bars.length) gsap.set(bars, { scaleX: 0 });
          if (pops.length) gsap.set(pops, { scale: 0 });
          once(box, "top 82%", () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.09 });
            if (pops.length) tl.to(pops, { scale: 1, duration: 0.5, ease: "back.out(3)", stagger: 0.09 }, 0.35);
            if (bars.length) tl.to(bars, { scaleX: 1, duration: 0.9, ease: "power3.out", stagger: 0.1 }, 0.3);
          });
        });

        /* ---------- گزارش: کارت‌های خلاصه ---------- */
        const rsum = q(".lp-rsum");
        if (rsum) {
          const cells = qa(".lp-rsum > div", rsum);
          gsap.set(cells, { opacity: 0, y: 22 });
          once(rsum, "top 88%", () =>
            gsap.to(cells, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }),
          );
        }

        /* ---------- راه‌اندازی: مسیر سه‌گامه ---------- */
        const path = q(".lp-path");
        if (path) {
          const steps = qa(".lp-path-step", path);
          const numbers = qa(".lp-path-n", path);
          const line = q(".lp-path-line i", path);
          gsap.set(steps, { opacity: 0, y: 34 });
          gsap.set(numbers, { scale: 0.5 });
          if (line) gsap.set(line, wide ? { scaleX: 0 } : { scaleY: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: path, start: "top 78%", end: "bottom 62%", scrub: 0.6 },
          });
          if (line) tl.to(line, wide ? { scaleX: 1, duration: 3 } : { scaleY: 1, duration: 3 }, 0);
          steps.forEach((st, i) => {
            const at = wide ? i * 1.3 : i * 1.2;
            tl.to(st, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, at);
            tl.to(numbers[i], { scale: 1, duration: 0.6, ease: "back.out(3)" }, at);
          });
        }

        /* ---------- تعرفه: قیمت از عددی بالاتر پایین می‌آید تا به قیمت واقعی برسد ---------- */
        const plans = q(".lp-plans");
        if (plans) {
          const prices = qa<HTMLElement>("[data-count]", plans);
          const START_FACTOR = 2.6;
          prices.forEach((el) => {
            const original = el.textContent ?? "";
            restores.push(() => (el.textContent = original));
            el.textContent = faNumber(Number(el.dataset.count) * START_FACTOR);
          });
          once(plans, "top 85%", () => {
            prices.forEach((el, i) => {
              const to = Number(el.dataset.count);
              const o = { v: to * START_FACTOR };
              gsap.to(o, {
                v: to,
                duration: 1.8,
                delay: 0.15 + i * 0.12,
                ease: "power3.out",
                onUpdate: () => (el.textContent = faNumber(o.v)),
                onComplete: () => (el.textContent = faNumber(to)),
              });
            });
            const main = q(".lp-plan.is-main", plans);
            if (main) gsap.fromTo(main, { scale: 0.96 }, { scale: 1, duration: 0.9, ease: "elastic.out(1,0.55)", delay: 0.5 });
          });
        }

        /* ---------- فراخوان نهایی ---------- */
        const assure = qa(".lp-cta-assure li");
        if (assure.length) {
          gsap.set(assure, { opacity: 0, x: 28 });
          once(assure[0], "top 90%", () =>
            gsap.to(assure, { opacity: 1, x: 0, duration: 0.55, ease: "power3.out", stagger: 0.14 }),
          );
        }

        /* ---------- پرسش‌ها: باز شدن نرم ---------- */
        qa<HTMLDetailsElement>(".lp-faq details").forEach((d) => {
          const body = q(".lp-faq-body", d);
          if (!body) return;
          const onToggle = () => {
            if (!d.open) return;
            gsap.fromTo(
              body,
              { height: 0, opacity: 0 },
              { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "height,opacity" },
            );
          };
          d.addEventListener("toggle", onToggle);
          restores.push(() => d.removeEventListener("toggle", onToggle));
        });

        /* ---------- امکانات: کاشی‌ها و ویژوال‌ها ---------- */
        const bento = q(".lp-bento");
        if (bento) {
          const tiles = qa(".lp-feat", bento);
          gsap.set(tiles, { opacity: 0, y: 44, scale: 0.96 });
          once(bento, "top 82%", () =>
            gsap.to(tiles, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: "power3.out",
              stagger: { each: 0.09, from: "start" },
              clearProps: "transform",
            }),
          );

          const rings = qa(".lp-viz-ring", bento);
          const wifiBox = q(".lp-viz-wifi", bento);
          if (rings.length && wifiBox) {
            loopWhileVisible(
              gsap.fromTo(
                rings,
                { scale: 1, opacity: 0.65 },
                { scale: 3, opacity: 0, duration: 2.2, ease: "power1.out", repeat: -1, stagger: 0.7 },
              ),
              wifiBox,
            );
          }

          const dots = qa(".lp-sync-dots i", bento);
          const syncBox = q(".lp-viz-sync", bento);
          if (dots.length && syncBox) {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
            tl.to(dots, { backgroundColor: "#16a34a", duration: 0.25, stagger: 0.3 })
              .to({}, { duration: 1 })
              .to(dots, { backgroundColor: "#c9a86a", duration: 0.2 })
              .set(dots, { clearProps: "backgroundColor" });
            loopWhileVisible(tl, syncBox);
          }

          const chips = qa(".lp-viz-branches span", bento);
          const chipBox = q(".lp-viz-branches", bento);
          if (chips.length && chipBox) {
            gsap.set(chips, { scale: 0, opacity: 0 });
            once(chipBox, "top 92%", () =>
              gsap.to(chips, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)", stagger: 0.15, delay: 0.3 }),
            );
          }

          const slip = q(".lp-viz-slip", bento);
          if (slip) {
            const rowsEl = qa(".lp-viz-slip dl > div", slip);
            gsap.set(rowsEl, { opacity: 0, x: 20 });
            once(slip, "top 90%", () =>
              gsap.to(rowsEl, { opacity: 1, x: 0, duration: 0.45, ease: "power3.out", stagger: 0.18, delay: 0.25 }),
            );
            countOnce(qa<HTMLElement>("[data-count]", slip), slip, "top 90%");
          }
        }

        /* ---------- مسئلهٔ واقعی: خط زمانی ---------- */
        const facts = q(".lp-case-facts");
        if (facts) countOnce(qa<HTMLElement>("[data-count]", facts), facts, "top 88%");

        const flow = q(".lp-flow");
        if (flow) {
          const nodes = qa(".lp-node", flow);
          const bodies = nodes.map((n) => n.querySelector<HTMLElement>(":scope > div")!);
          const segs = qa(".lp-seg i", flow);
          const keys = qa(".lp-node-key", flow);
          // فقط متنِ گره‌ها محو/جابه‌جا می‌شود؛ کلیدها همیشه مات می‌مانند تا خط از پشتشان پیدا نشود
          gsap.set(bodies, { opacity: 0.2, x: 30 });
          gsap.set(segs, { scaleY: 0 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: flow, start: "top 72%", end: "bottom 58%", scrub: 0.6 },
          });
          bodies.forEach((b, i) => {
            tl.to(b, { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" }, i * 1.2);
            if (segs[i]) tl.to(segs[i], { scaleY: 1, duration: 1.1 }, i * 1.2 + 0.3);
          });

          // گرهٔ اول: لرزش «ناموفق»
          once(nodes[0], "top 70%", () => {
            gsap.fromTo(keys[0], { x: -5 }, { x: 5, duration: 0.06, repeat: 9, yoyo: true, ease: "none", onComplete: () => void gsap.set(keys[0], { x: 0 }) });
          });

          // گرهٔ دوم: شناسهٔ مودم از نویز به مقدار واقعی می‌رسد
          const bssid = q(".lp-bssid", flow);
          if (bssid && nodes[1]) {
            const final = bssid.dataset.final ?? bssid.textContent ?? "";
            restores.push(() => (bssid.textContent = final));
            bssid.textContent = final.replace(/[0-9A-F]/g, "•");
            once(nodes[1], "top 66%", () => {
              const o = { p: 0 };
              const hex = "0123456789ABCDEF";
              gsap.to(o, {
                p: 1,
                duration: 1.5,
                ease: "power2.inOut",
                onUpdate: () => {
                  const done = Math.floor(o.p * final.length);
                  bssid.textContent = final
                    .split("")
                    .map((ch, i) => (ch === ":" || i < done ? ch : hex[Math.floor(Math.random() * 16)]))
                    .join("");
                },
                onComplete: () => (bssid.textContent = final),
              });
              gsap.fromTo(keys[1], { scale: 1 }, { scale: 1.18, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" });
            });
          }

          // گرهٔ آخر: تأیید با فنر
          if (nodes[2]) {
            once(nodes[2], "top 62%", () => {
              gsap.fromTo(keys[2], { scale: 0.4, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(3)" });
            });
          }
        }

        /* ---------- مقایسه: شمارش امتیازها ---------- */
        const cmp = q(".lp-compare");
        if (cmp) countOnce(qa<HTMLElement>(".lp-compare tfoot [data-count]"), cmp, "top 78%");

        /* ---------- تعرفهٔ فشرده ---------- */
        const mini = q(".lp-mini-plans");
        if (mini) {
          const cards = qa(".lp-mini-plan", mini);
          gsap.set(cards, { opacity: 0, y: 26 });
          once(mini, "top 88%", () =>
            gsap.to(cards, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.1 }),
          );
        }

        /* ---------- قاب‌های آیفون ---------- */
        const phoneRow = q(".lp-phones");
        if (phoneRow) {
          const items = qa(".lp-phone-item", phoneRow);
          gsap.set(items, { opacity: 0, y: 80, rotate: (i: number) => (i - 1) * 3 });
          once(phoneRow, "top 86%", () =>
            gsap.to(items, {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 1.05,
              ease: "power3.out",
              stagger: 0.16,
              clearProps: "transform",
            }),
          );

          // حلقهٔ «ثبت ورود» در صفحهٔ اول
          const pings = qa(".lp-app-ping", phoneRow);
          if (pings.length) {
            loopWhileVisible(
              gsap.fromTo(
                pings,
                { scale: 0.92, opacity: 0.55 },
                { scale: 1.9, opacity: 0, duration: 2.1, ease: "power1.out", repeat: -1, stagger: 1 },
              ),
              phoneRow,
            );
          }

          // صفحهٔ وسط: داستان قطعی GPS به‌صورت چرخه
          const oa = q(".lp-app-outage", phoneRow);
          if (oa) {
            const banner = q(".lp-oa-banner", oa);
            const gps = q(".lp-oa-gps", oa);
            const wifi = q(".lp-oa-wifi", oa);
            const busy = q(".lp-oa-wifi-busy", oa);
            const ok = q(".lp-oa-wifi-ok", oa);
            const res = q(".lp-oa-result", oa);
            const failDot = q(".lp-oa-gps .lp-app-dot", oa);
            const rows = [banner, gps, wifi, res].filter(Boolean) as HTMLElement[];
            if (rows.length === 4 && busy && ok && failDot) {
              const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, defaults: { ease: "power3.out" } });
              tl.set(rows, { opacity: 0, y: 12 })
                .set(ok, { scale: 0 })
                .set(busy, { opacity: 1, scale: 1 })
                .to(banner!, { opacity: 1, y: 0, duration: 0.5 })
                .to(gps!, { opacity: 1, y: 0, duration: 0.45 }, "+=0.2")
                .fromTo(failDot, { x: -3 }, { x: 3, duration: 0.06, repeat: 7, yoyo: true, ease: "none" })
                .set(failDot, { x: 0 })
                .to(wifi!, { opacity: 1, y: 0, duration: 0.45 }, "+=0.1")
                .to(busy, { scale: 1.35, duration: 0.22, repeat: 3, yoyo: true, ease: "sine.inOut" })
                .to(busy, { opacity: 0, duration: 0.15 })
                .to(ok, { scale: 1, duration: 0.5, ease: "back.out(3)" }, "<")
                .to(res!, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.6)" }, "+=0.1")
                .to(rows, { opacity: 0, duration: 0.5 }, "+=2.8");
              loopWhileVisible(tl, oa);
            }
          }

          // نمودار کارنامه
          const bars = qa(".lp-app-bars i", phoneRow);
          if (bars.length) {
            gsap.set(bars, { scaleY: 0 });
            once(phoneRow, "top 70%", () =>
              gsap.to(bars, { scaleY: 1, duration: 0.8, ease: "power3.out", stagger: 0.1, delay: 0.6 }),
            );
          }
        }

        /* ---------- صفحه‌های داخلی: گروه‌هایی که تک‌تک وارد می‌شوند ---------- */
        const GROUPS: [string, string][] = [
          [".lp-roles", ".lp-role"],
          [".lp-objs", ".lp-obj"],
          [".lp-channels", ".lp-channel"],
          [".lp-check", "li"],
          [".lp-picker-needs", "label"],
          [".lp-dd-rows", "li"],
          [".lp-dd-week", ":scope > div"],
          [".lp-dd-steps", "li"],
          [".lp-dd-formula", ":scope > div"],
          [".lp-dd-branches", ":scope > div"],
        ];
        GROUPS.forEach(([box, item]) => {
          qa(box).forEach((el) => {
            const kids = qa(item, el);
            if (!kids.length) return;
            gsap.set(kids, { opacity: 0, y: 26 });
            once(el, "top 88%", () =>
              gsap.to(kids, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.09, delay: 0.1 }),
            );
          });
        });

        // ستون‌های شیفت هفتگی از پایین بالا می‌آیند
        qa(".lp-dd-week").forEach((box) => {
          const bars = qa("i", box);
          gsap.set(bars, { scaleY: 0, transformOrigin: "50% 100%" });
          once(box, "top 88%", () => gsap.to(bars, { scaleY: 1, duration: 0.7, ease: "power3.out", stagger: 0.08, delay: 0.3 }));
        });

        // هزینهٔ هر کاربر: نوارها از راست پر می‌شوند
        const seat = q(".lp-seatbars");
        if (seat) {
          const rows = qa(".lp-seatbar", seat);
          const fills = qa(".lp-seatbar-track i", seat);
          gsap.set(rows, { opacity: 0, y: 18 });
          gsap.set(fills, { scaleX: 0 });
          once(seat, "top 86%", () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
            tl.to(rows, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }).to(
              fills,
              { scaleX: 1, duration: 0.9, stagger: 0.12 },
              0.15,
            );
          });
        }

        // خط‌لوله: خط عمودی با اسکرول پر می‌شود و گام‌ها پشت‌سرهم می‌آیند
        qa(".lp-pipe").forEach((pipe) => {
          const steps = qa(".lp-pipe-step", pipe);
          const nums = qa(".lp-pipe-n", pipe);
          const line = q(".lp-pipe-line i", pipe);
          gsap.set(steps, { opacity: 0.2, x: 30 });
          gsap.set(nums, { scale: 0.6 });
          if (line) gsap.set(line, { scaleY: 0 });
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: pipe, start: "top 72%", end: "bottom 62%", scrub: 0.6 },
          });
          if (line) tl.to(line, { scaleY: 1, duration: steps.length }, 0);
          steps.forEach((st, i) => {
            tl.to(st, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, i * 0.95);
            tl.to(nums[i], { scale: 1, duration: 0.5, ease: "back.out(3)" }, i * 0.95);
          });
        });

        /* ---------- نور دنبال‌کنندهٔ ماوس روی کاشی‌های امکانات ---------- */
        if (fine) {
          qa(".lp-feat").forEach((tile) => {
            const move = (e: PointerEvent) => {
              const r = tile.getBoundingClientRect();
              tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
              tile.style.setProperty("--my", `${e.clientY - r.top}px`);
            };
            tile.addEventListener("pointermove", move);
            restores.push(() => tile.removeEventListener("pointermove", move));
          });
        }

        /* ---------- افکت‌های ماوس‌محور (فقط دسکتاپ) ---------- */
        if (fine && wide) {
          const hero = q(".lp-hero");
          const spot = q(".lp-spot");
          const art = q(".lp-hero-art");
          if (hero && spot) {
            gsap.set(spot, { xPercent: -50, yPercent: -50, x: hero.clientWidth * 0.6, y: hero.clientHeight * 0.4 });
            const sx = gsap.quickTo(spot, "x", { duration: 0.8, ease: "power3.out" });
            const sy = gsap.quickTo(spot, "y", { duration: 0.8, ease: "power3.out" });
            const rotY = sheet ? gsap.quickTo(sheet, "rotationY", { duration: 0.7, ease: "power3.out" }) : null;
            const rotX = sheet ? gsap.quickTo(sheet, "rotationX", { duration: 0.7, ease: "power3.out" }) : null;
            if (sheet) gsap.set(sheet, { transformPerspective: 1000 });

            const onMove = (e: PointerEvent) => {
              const r = hero.getBoundingClientRect();
              sx(e.clientX - r.left);
              sy(e.clientY - r.top);
              rotY?.(((e.clientX / window.innerWidth) - 0.5) * -12);
              rotX?.(((e.clientY / window.innerHeight) - 0.5) * 8);
            };
            const onLeave = () => {
              rotY?.(0);
              rotX?.(0);
            };
            hero.addEventListener("pointermove", onMove);
            hero.addEventListener("pointerleave", onLeave);
            restores.push(() => {
              hero.removeEventListener("pointermove", onMove);
              hero.removeEventListener("pointerleave", onLeave);
            });
          }

          // پارالکس نرم کارنامه هنگام خروج از هیرو
          if (art) {
            gsap.to(art, {
              yPercent: -12,
              ease: "none",
              scrollTrigger: { trigger: ".lp-hero", start: "top top", end: "bottom top", scrub: true },
            });
          }

          // پارالکس نرم گوشی‌ها (هر کدام با سرعتی متفاوت)
          qa(".lp-phone").forEach((ph, i) => {
            gsap.to(ph, {
              yPercent: i === 1 ? -7 : 5,
              ease: "none",
              scrollTrigger: { trigger: ".lp-phones", start: "top bottom", end: "bottom top", scrub: true },
            });
          });

          // دکمه‌های مغناطیسی
          qa(".lp-hero .lp-btn, .lp-cta .lp-btn, .lp-roi .lp-btn").forEach((btn) => {
            btn.style.transition = "box-shadow 220ms ease-out, background-color 180ms ease-out";
            const mx = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
            const my = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = btn.getBoundingClientRect();
              mx((e.clientX - (r.left + r.width / 2)) * 0.22);
              my((e.clientY - (r.top + r.height / 2)) * 0.32);
            };
            const leave = () => {
              mx(0);
              my(0);
            };
            btn.addEventListener("pointermove", move);
            btn.addEventListener("pointerleave", leave);
            restores.push(() => {
              btn.removeEventListener("pointermove", move);
              btn.removeEventListener("pointerleave", leave);
              btn.style.transition = "";
            });
          });
        }
      },
    );

    return () => {
      mm.revert();
      restores.forEach((fn) => fn());
    };
  }, []);
}

/// اسکرول نرمِ چرخ ماوس/ترک‌پد با Lenis، هماهنگ با ScrollTrigger. روی صفحهٔ لمسی عمداً اسکرول
/// بومیِ دستگاه می‌ماند (اینرسی و ۱۲۰هرتز خودِ سیستم‌عامل)؛ بازنویسی آن روی iOS/Android لرزش می‌آورد.
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // لنگرها (#pricing و …) هم با همان حرکتِ نرم و با فاصلهٔ ناوبری بروند
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      const id = a?.getAttribute("href");
      if (!a || !id || id.length < 2) return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -72, duration: 1.5 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/// عددی که هنگام تغییر مقدار، نرم به عدد جدید می‌رسد (ماشین‌حساب).
export function tweenNumber(el: HTMLElement, from: number, to: number, format: (n: number) => string) {
  const o = { v: from };
  gsap.to(o, {
    v: to,
    duration: 0.6,
    ease: "power2.out",
    overwrite: true,
    onUpdate: () => (el.textContent = format(o.v)),
    onComplete: () => (el.textContent = format(to)),
  });
}
