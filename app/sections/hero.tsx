"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { track } from "@/lib/analytics";
import { IconArrow, IconTick, IconWifi } from "@/components/icons";

export function Hero() {
  useHeroIntro();

  return (
    <header className="lp-hero">
      <span className="lp-spot" aria-hidden="true" />
      <div className="lp-wrap lp-grid">
        <div className="lp-hero-type">
          <p className="lp-kicker" data-hero-item>
            سامانهٔ حضور و غیاب <span>· نسخهٔ اندروید و وب</span>
          </p>

          <h1 className="lp-display" data-hero-words>
            ساعت کارِ واقعی، نه آنچه دفتر حضور و غیاب می‌گوید.
          </h1>

          <p className="lp-lead lp-hero-sub" data-hero-item>
            کارکنان با موبایل خودشان ورود و خروج می‌زنند. حضوریار مکان و شبکهٔ وای‌فای را
            راستی‌آزمایی می‌کند و کارکرد، تأخیر و اضافه‌کاری را تا لحظهٔ آخر ماه آمادهٔ حقوق
            نگه می‌دارد.
          </p>

          <div className="lp-hero-actions" data-hero-item>
            <a href="#contact" className="lp-btn" onClick={() => track("cta_click", { place: "hero" })}>
              مشاورهٔ رایگان و دیدن سامانه
            </a>
            <Link href="/gps-outage/" className="lp-link">
              <IconArrow />
              چرا وقتی GPS قطع است هم کار می‌کند؟
            </Link>
          </div>

          <ul className="lp-facts">
            <li className="lp-fact" data-hero-item>
              <b>۴ پلن سالانه</b>
              <span>از ۲ تا ۱۰ کاربر، متناسب با اندازهٔ تیم شما</span>
            </li>
            <li className="lp-fact" data-hero-item>
              <b>بدون سخت‌افزار</b>
              <span>نه کارت‌خوان، نه دستگاه اثر انگشت</span>
            </li>
            <li className="lp-fact" data-hero-item>
              <b>راه‌اندازی امروز</b>
              <span>از ثبت شرکت تا اولین تردد، زیر ۱۰ دقیقه</span>
            </li>
          </ul>
        </div>

        <div className="lp-hero-art" data-hero-item>
          <DaySheet />
        </div>
      </div>
    </header>
  );
}

/// انیمیشن ورود هیرو با GSAP: عناصر یکی‌یکی با فاصلهٔ کم بالا می‌آیند و کارنامهٔ
/// نمونه در پایان با یک نوسان آرام و پیوسته شناور می‌ماند تا صفحه از همان لحظهٔ اول زنده به‌نظر برسد.
function useHeroIntro() {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
    if (!items.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ delay: 0.1 });
    tl.set(items, { opacity: 0, y: 26 }).to(items, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.09,
    });

    const art = document.querySelector<HTMLElement>(".lp-hero-art");
    let float: gsap.core.Tween | undefined;
    if (art) {
      float = gsap.to(art, {
        y: 10,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        paused: true,
      });
      tl.eventCallback("onComplete", () => float?.play());
    }

    return () => {
      tl.kill();
      float?.kill();
    };
  }, []);
}

/// کارنامهٔ یک روز کاری — تصویرِ اصلی صفحه.
/// به‌جای ماکت گوشی، خروجی واقعی محصول را نشان می‌دهد؛ چون همین خروجی است که خریدار
/// بابتش پول می‌دهد.
function DaySheet() {
  return (
    <figure
      className="lp-sheet"
      role="img"
      aria-label="نمونهٔ کارنامهٔ روزانه: علی رضایی، ورود ۰۷:۵۸ با تأیید مکان، خروج ۱۷:۱۴ با تأیید وای‌فای، کارکرد ۹ ساعت و ۱۶ دقیقه، بدون تأخیر."
    >
      <div className="lp-sheet-head">
        <b>کارنامهٔ روز</b>
        <span>شنبه ۱۸ مرداد</span>
      </div>

      <div className="lp-sheet-body">
        <div className="lp-sheet-person">
          <b>علی رضایی</b>
          <span>دفتر مرکزی · شیفت اداری</span>
        </div>

        <div className="lp-timeline">
          <div className="lp-timeline-scale" aria-hidden="true">
            <span className="num">۰۶</span>
            <span className="num">۰۹</span>
            <span className="num">۱۲</span>
            <span className="num">۱۵</span>
            <span className="num">۱۸</span>
          </div>
          <div className="lp-track" aria-hidden="true">
            <span className="lp-track-shift" />
            <span className="lp-track-actual" />
            <span className="lp-track-late" />
          </div>
          <div className="lp-track-legend" aria-hidden="true">
            <span className="lp-swatch is-shift">
              <i />
              شیفت
            </span>
            <span className="lp-swatch is-work">
              <i />
              کارکرد
            </span>
            <span className="lp-swatch is-extra">
              <i />
              اضافه‌کاری
            </span>
          </div>
        </div>

        <div className="lp-punches">
          <div className="lp-punch">
            <time className="lp-punch-time">۰۷:۵۸</time>
            <span className="lp-punch-what">ورود</span>
            <span className="lp-punch-verify">
              <IconTick />
              مکان تأیید شد · ۲۴ متر
            </span>
          </div>
          <div className="lp-punch">
            <time className="lp-punch-time">۱۷:۱۴</time>
            <span className="lp-punch-what">خروج</span>
            <span className="lp-punch-verify is-wifi">
              <IconWifi />
              وای‌فای دفتر · GPS مختل
            </span>
          </div>
        </div>

        <div className="lp-sheet-foot">
          <div>
            <span>کارکرد</span>
            <b className="num">۹:۱۶</b>
          </div>
          <div>
            <span>تأخیر</span>
            <b className="num">۰:۰۰</b>
          </div>
          <div>
            <span>اضافه‌کاری</span>
            <b className="num is-ok">۰:۱۶</b>
          </div>
        </div>
      </div>
    </figure>
  );
}
