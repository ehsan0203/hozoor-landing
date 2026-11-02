"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import { SiteNav, SiteFooter } from "./chrome";
import { ContactForm } from "./contact-form";
import { BlogCard } from "./blog-card";
import "./landing.css";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/// صفحهٔ معرفی محصول.
///
/// جهت‌گیری: رقبای این حوزه (اتنسی، آیرو، فینتو، کسرا) همه یک قالب دارند —
/// سفید + آبی شرکتی + کارت‌های آیکون‌دار + تیتر «بدون نیاز به دستگاه».
/// آن ادعا دیگر مزیت نیست، حداقلِ انتظار است. این صفحه روی چیزی می‌ایستد که
/// هیچ رقیبی نمی‌تواند بگوید: «وقتی GPS مختل است هم کار می‌کند».
///
/// زبان بصری: شبکهٔ سوئیسی، خطوط مویی مثل دفتر کارکرد، و خودِ دادهٔ محصول
/// (کارنامهٔ روز) به‌عنوان تصویر — نه ماکت گوشی و نه تصویرسازی تزئینی.
export default function LandingPage() {
  useRevealOnScroll();

  return (
    <div className="lp">
      {/* بدون جاوااسکریپت، ظهور تدریجی هرگز فعال نمی‌شود و محتوا نامرئی می‌ماند.
          dangerouslySetInnerHTML به‌جای فرزندِ JSX: با جاوااسکریپت روشن، مرورگر محتوای
          noscript را متن خام می‌بیند نه عنصر DOM — عنصر JSX داخل آن باعث ناهم‌خوانیِ
          هیدریشن بین سرور و کلاینت می‌شود. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.lp-reveal,.lp-plans .lp-plan,.lp-feat-rest .lp-row,.lp-faq details,[data-hero-item]{opacity:1 !important;transform:none !important}</style>",
        }}
      />

      <SiteNav onLanding />
      <Hero />
      <PunchStage />
      <Statement />
      <JammedGpsCase />
      <Features />
      <ReportSection />
      <Setup />
      <Pricing />
      <Faq />
      <BlogTeaser />
      <FinalCta />
      <SiteFooter onLanding />
    </div>
  );
}

/// تازه‌ترین مطالب بلاگ — از همان بک‌اند حضور و غیاب خوانده می‌شود.
/// اگر سرور در دسترس نباشد یا هنوز مطلبی منتشر نشده باشد، بخش اصلاً رندر نمی‌شود
/// تا صفحهٔ معرفی هیچ‌وقت یک بلوک خالی یا پیام خطا نشان ندهد.
function BlogTeaser() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    getBlogPosts({ pageSize: 3 })
      .then((r) => {
        if (!cancelled) setPosts(r.items);
      })
      .catch(() => {
        /* بلاگ اختیاری است: خطای شبکه نباید صفحهٔ معرفی را خراب کند */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // کارت‌ها بعد از پاسخ سرور می‌آیند، پس از مسیر lp-reveal (که فقط یک‌بار هنگام
  // mount اجرا می‌شود) رد نمی‌شوند و انیمیشن ظهورشان همین‌جاست.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !posts.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, { opacity: 0, y: 24, duration: 0.6, ease: "power3.out", stagger: 0.08 });
    }, grid);
    return () => ctx.revert();
  }, [posts]);

  if (!posts.length) return null;

  return (
    <section className="lp-section" id="blog">
      <div className="lp-wrap">
        <div className="lp-section-head lp-blog-head">
          <div>
            <p className="lp-label">
              <b className="num">۰۷</b> بلاگ
            </p>
            <h2 className="lp-h2">آنچه پیش از خرید سامانه خوب است بدانید.</h2>
            <p className="lp-lead">
              تجربهٔ عملی از حضور و غیاب در ایران — از اختلال GPS تا دورکاری و محاسبهٔ کارکرد.
            </p>
          </div>
          <Link href="/blog" className="lp-btn lp-btn-line lp-btn-sm">
            همهٔ مطالب
          </Link>
        </div>

        <div className="lp-posts" ref={gridRef}>
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Hero() {
  useHeroIntro();

  return (
    <header className="lp-hero">
      <div className="lp-wrap lp-grid">
        <div className="lp-hero-type">
          <p className="lp-kicker" data-hero-item>
            سامانهٔ حضور و غیاب <span>· نسخهٔ اندروید و وب</span>
          </p>

          <h1 className="lp-display" data-hero-item>
            ساعت کارِ واقعی، نه آنچه دفتر حضور و غیاب می‌گوید.
          </h1>

          <p className="lp-lead lp-hero-sub" data-hero-item>
            کارکنان با موبایل خودشان ورود و خروج می‌زنند. حضوریار مکان و شبکهٔ وای‌فای را
            راستی‌آزمایی می‌کند و کارکرد، تأخیر و اضافه‌کاری را تا لحظهٔ آخر ماه آمادهٔ حقوق
            نگه می‌دارد.
          </p>

          <div className="lp-hero-actions" data-hero-item>
            <a href="#contact" className="lp-btn">
              درخواست تماس و راه‌اندازی
            </a>
            <a href="#gps" className="lp-link">
              <IconArrow />
              چرا وقتی GPS قطع است هم کار می‌کند؟
            </a>
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

/// صحنهٔ ثبت ورود — روایتی که با اسکرول جلو می‌رود.
/// این بخش قلب صفحه است: به‌جای اینکه دربارهٔ «کار کردن بدون GPS» توضیح بدهیم،
/// کاربر آن را لحظه‌به‌لحظه تماشا می‌کند و مُهرِ ثبت در انتها فرود می‌آید.
function PunchStage() {
  const { ref, scene } = useScrollScene(SCENES.length);

  return (
    <section className="lp-stage" ref={ref} aria-labelledby="stage-title">
      <div className="lp-stage-pin" data-scene={scene}>
        <div className="lp-stage-top">
          <span id="stage-title">یک ورود، لحظه‌به‌لحظه</span>
          <span className="lp-rail" aria-hidden="true">
            {SCENES.map((s, i) => (
              <i key={s.time} className={i <= scene ? "is-done" : undefined} />
            ))}
          </span>
        </div>

        <div className="lp-stage-body">
          <div className="lp-scope">
            <span className="lp-ring r1" aria-hidden="true" />
            <span className="lp-ring r2" aria-hidden="true" />
            <span className="lp-ring r3" aria-hidden="true" />
            <span className="lp-sweep" aria-hidden="true" />

            <span className="lp-arcs" aria-hidden="true">
              <svg viewBox="0 0 120 90" fill="none">
                <path d="M12 40a70 70 0 0 1 96 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M30 56a44 44 0 0 1 60 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                <path d="M48 71a20 20 0 0 1 24 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>

            <span className="lp-fail" aria-hidden="true">
              <svg width="72" height="72" viewBox="0 0 24 24" fill="none">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
              </svg>
            </span>

            <time className="lp-clock">{SCENES[scene].time}</time>

            <span className="lp-stamp" aria-hidden="true">
              <b>ثبت شد</b>
              <span className="num">۰۸:۰۲</span>
            </span>
          </div>
        </div>

        <div className="lp-stage-foot">
          {SCENES.map((s, i) => (
            <div
              key={s.title}
              className={[
                "lp-caption",
                i === scene ? "is-on" : "",
                s.tone ? `is-${s.tone}` : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={i !== scene}
            >
              <b>{s.title}</b>
              <p>{s.text}</p>
            </div>
          ))}

          <span className="lp-scrollcue" aria-hidden="true">
            <i />
            اسکرول کنید
          </span>
        </div>
      </div>
    </section>
  );
}

/// پیشرفت اسکرول را به «شمارهٔ صحنه» تبدیل می‌کند.
/// عمداً فقط وقتی صحنه عوض می‌شود state را به‌روز می‌کند (نه هر فریم)، تا
/// اسکرول سبک بماند. در حالت کاهش حرکت مستقیم آخرین صحنه نشان داده می‌شود.
function useScrollScene(count: number) {
  const ref = useRef<HTMLElement>(null);
  const current = useRef(0);
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = count - 1;
      setScene(count - 1);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      // آخرین صحنه کمی زودتر شروع شود تا مُهر پیش از خروج از بخش دیده شود
      const next = Math.min(count - 1, Math.floor(progress * count * 1.06));
      if (next !== current.current) {
        current.current = next;
        setScene(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  return { ref, scene };
}

const SCENES = [
  {
    time: "۰۷:۵۸",
    title: "علی جلوی در دفتر است.",
    text: "گوشی را درمی‌آورد و اپ را باز می‌کند. تا این‌جا هیچ فرقی با هیچ سامانهٔ دیگری ندارد.",
    tone: "",
  },
  {
    time: "۰۷:۵۹",
    title: "جست‌وجوی موقعیت مکانی…",
    text: "اپ سراغ GPS می‌رود تا فاصلهٔ او تا محدودهٔ مجاز محل کار را اندازه بگیرد.",
    tone: "",
  },
  {
    time: "۰۸:۰۰",
    title: "سیگنال ماهواره‌ای در دسترس نیست.",
    text: "این‌جا همان نقطه‌ای است که سامانه‌های دیگر متوقف می‌شوند و کارمند باید به مدیر زنگ بزند. مختصات کهنه هم پذیرفته نمی‌شود.",
    tone: "fail",
  },
  {
    time: "۰۸:۰۱",
    title: "مسیر دوم: شناسهٔ مودم دفتر.",
    text: "به‌جای نام شبکه، شناسهٔ سخت‌افزاری اکسس‌پوینت خوانده می‌شود — چیزی که از خانه قابل جعل نیست.",
    tone: "",
  },
  {
    time: "۰۸:۰۲",
    title: "ورود ثبت شد.",
    text: "بدون تماس، بدون ثبت دستی. در گزارش هم می‌ماند که این تردد با وای‌فای تأیید شده، نه با مکان.",
    tone: "pass",
  },
];

function Statement() {
  return (
    <section className="lp-statement">
      <div className="lp-wrap">
        <p>
          هر سامانهٔ حضور و غیابی وقتی GPS سالم است کار می‌کند.{" "}
          <em>سؤال این است که وقتی نیست چه می‌شود.</em>
        </p>
      </div>
    </section>
  );
}

function JammedGpsCase() {
  return (
    <section className="lp-section" id="gps">
      <div className="lp-wrap lp-grid">
        <div className="lp-case-type lp-reveal">
          <p className="lp-label">
            <b className="num">۰۱</b> مسئلهٔ واقعی
          </p>
          <h2 className="lp-h2" style={{ marginTop: 24 }}>
            در ایران، GPS همیشه در دسترس نیست.
          </h2>
          <p className="lp-lead" style={{ marginTop: 16 }}>
            اختلال موقعیت‌یابی ماهواره‌ای در بسیاری از شهرها روزمره است. سامانه‌ای که فقط
            به GPS تکیه کند، آن روز از کار می‌افتد و کارمند باید به مدیر زنگ بزند تا ترددش
            دستی ثبت شود.
          </p>
          <p className="lp-note">
            حضوریار مسیر دوم دارد — و مسیر دوم سخت‌گیرتر است، نه سهل‌گیرتر.
          </p>
        </div>

        <div className="lp-case-art lp-reveal">
          <div className="lp-decision">
            <div className="lp-node is-fail">
              <span className="lp-node-key" aria-hidden="true">
                <IconCross />
              </span>
              <div>
                <p className="lp-node-title">
                  موقعیت مکانی
                  <span className="lp-node-verdict">در دسترس نیست</span>
                </p>
                <p>
                  GPS پاسخ نمی‌دهد. مختصات کهنه‌تر از ۴۵ ثانیه هم پذیرفته نمی‌شود تا موقعیتِ
                  ذخیره‌شدهٔ دیروز جای امروز را نگیرد.
                </p>
              </div>
            </div>

            <div className="lp-node">
              <span className="lp-node-key num" aria-hidden="true">
                ۲
              </span>
              <div>
                <p className="lp-node-title">شناسهٔ مودم محل کار</p>
                <p>
                  به‌جای نام شبکه، شناسهٔ سخت‌افزاری اکسس‌پوینت (BSSID) بررسی می‌شود. نام
                  شبکه را می‌شود روی هر مودمی گذاشت؛ شناسهٔ سخت‌افزاری را نه.
                </p>
              </div>
            </div>

            <div className="lp-node is-pass">
              <span className="lp-node-key" aria-hidden="true">
                <IconTick />
              </span>
              <div>
                <p className="lp-node-title">
                  ورود ثبت شد
                  <span className="lp-node-verdict">۰۸:۰۲</span>
                </p>
                <p>
                  بدون تماس با مدیر و بدون ثبت دستی. در گزارش هم مشخص است که این تردد با
                  وای‌فای تأیید شده، نه با مکان.
                </p>
              </div>
            </div>
          </div>

          <p className="lp-note">
            نکتهٔ مهم: اگر مکان معتبر باشد و کارمند بیرون از محدوده، وای‌فای نمی‌تواند آن را
            بپوشاند. تردد رد می‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="lp-section" id="features">
      <div className="lp-wrap lp-grid">
        <div className="lp-feat-lead lp-reveal">
          <p className="lp-label">
            <b className="num">۰۲</b> امکانات
          </p>
          <h2 className="lp-h3">
            محدودهٔ مجاز را روی نقشه می‌کشید. بقیه‌اش خودکار است.
          </h2>
          <p>
            برای هر محل کار یک نقطه و یک شعاع تعریف می‌کنید. ثبت تردد خارج از آن محدوده
            پذیرفته نمی‌شود و فاصلهٔ دقیق هر تردد در گزارش ثبت می‌ماند.
          </p>
        </div>

        <div className="lp-feat-rest lp-reveal">
          <div className="lp-rows">
            {FEATURES.map((f) => (
              <article className="lp-row" key={f.title}>
                <span className="lp-row-ico" aria-hidden="true">
                  {f.icon}
                </span>
                <h3 className="lp-h3">{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportSection() {
  return (
    <section className="lp-section" id="report">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            <b className="num">۰۳</b> خروجی
          </p>
          <h2 className="lp-h2">آخر ماه چیزی برای محاسبه‌کردن نمی‌ماند.</h2>
          <p className="lp-lead">
            تأخیر، تعجیل در خروج و اضافه‌کاری روزبه‌روز بر پایهٔ شیفتِ همان کارمند و تعطیلات
            رسمی محاسبه می‌شود. مرخصی و مأموریتِ تأییدشده هم غیبت حساب نمی‌شود.
          </p>
        </div>

        <div className="lp-report lp-reveal">
          <table>
            <caption className="sr-only">نمونهٔ گزارش تفصیلی هفتگی یک کارمند</caption>
            <thead>
              <tr>
                <th scope="col">روز</th>
                <th scope="col">شیفت</th>
                <th scope="col">ورود</th>
                <th scope="col">خروج</th>
                <th scope="col">کارکرد</th>
                <th scope="col">تأخیر</th>
                <th scope="col">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {REPORT_ROWS.map((r) => (
                <tr key={r.day}>
                  <td>{r.day}</td>
                  <td>{r.shift}</td>
                  <td>{r.in}</td>
                  <td>{r.out}</td>
                  <td>{r.worked}</td>
                  <td>{r.late}</td>
                  <td>
                    <span className={`lp-pill ${r.tone}`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>جمع هفته</td>
                <td>۴۴:۳۸</td>
                <td>۰:۱۲</td>
                <td>—</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

function Setup() {
  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            <b className="num">۰۴</b> راه‌اندازی
          </p>
          <h2 className="lp-h2">سه گام، یک بعدازظهر.</h2>
        </div>

        <div className="lp-steps">
          {SETUP.map((s) => (
            <article className="lp-step lp-reveal" key={s.n}>
              <span className="lp-step-n num" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="lp-h3">{s.t}</h3>
              <p>{s.p}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="lp-section" id="pricing">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            <b className="num">۰۵</b> تعرفه
          </p>
          <h2 className="lp-h2">هر پلن، همهٔ امکانات پلن قبل از خودش را هم دارد.</h2>
          <p className="lp-lead">
            چهار پلن سالانه بر اساس تعداد کاربر. با رشد تیم‌تان، فقط پلن را ارتقا می‌دهید —
            چیزی از دست نمی‌رود.
          </p>
        </div>

        <div className="lp-plans lp-reveal">
          {PLANS.map((p) => (
            <article className={`lp-plan${p.featured ? " is-main" : ""}`} key={p.name}>
              <div className="lp-plan-top">
                <h3 className="lp-h3">{p.name}</h3>
                {p.featured && <span className="lp-pill is-ok">پیشنهادی</span>}
              </div>
              <p className="lp-plan-price">
                <span className="num">{p.price}</span>
                <small>تومان / سال · تا {p.seats} کاربر</small>
              </p>
              <ul>
                {p.features.map((t) => (
                  <li key={t}>
                    <IconTick />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`lp-btn${p.featured ? "" : " lp-btn-line"}`} style={{ width: "100%" }}>
                انتخاب {p.name}
              </a>
            </article>
          ))}
        </div>

        <p className="lp-note" style={{ marginTop: 20 }}>
          نیاز به ظرفیت بیشتر دارید؟ روی هر پلنی می‌شود نیروی اضافه خرید و پلن چهار امکان
          افزودن شعبهٔ اضافه هم دارد. برای مشاوره تماس بگیرید:{" "}
          <a href="tel:09156201696" className="num">
            ۰۹۱۵۶۲۰۱۶۹۶
          </a>
        </p>
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: "پایه یک",
    seats: "۲",
    price: "۳٬۳۷۰٬۰۰۰",
    featured: false,
    features: [
      "ثبت ورود و خروج با مکان و وای‌فای",
      "شیفت هفتگی و تعطیلات",
      "گزارش کارکرد، تأخیر و اضافه‌کاری",
      "اپ اندروید و نسخهٔ وب",
    ],
  },
  {
    name: "پایه دو",
    seats: "۵",
    price: "۴٬۷۷۰٬۰۰۰",
    featured: true,
    features: [
      "همهٔ امکانات پایهٔ یک",
      "درخواست مرخصی و مأموریت با گردش تأیید",
    ],
  },
  {
    name: "پایه سه",
    seats: "۸",
    price: "۶٬۶۷۰٬۰۰۰",
    featured: false,
    features: [
      "همهٔ امکانات پایهٔ دو",
      "حقوق و دستمزد و فیش ماهانهٔ خودکار",
    ],
  },
  {
    name: "پایه چهار",
    seats: "۱۰",
    price: "۹٬۹۸۰٬۰۰۰",
    featured: false,
    features: [
      "همهٔ امکانات پایهٔ سه",
      "چند شعبه‌ای",
      "جریمهٔ پرسنل",
    ],
  },
];

function Faq() {
  return (
    <section className="lp-section" id="faq">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">
            <b className="num">۰۶</b> پرسش‌ها
          </p>
          <h2 className="lp-h2">آنچه معمولاً می‌پرسند.</h2>
        </div>

        <div className="lp-faq lp-reveal">
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="lp-plus" aria-hidden="true" />
              </summary>
              <p className="lp-faq-body">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/// ثبت‌نام عمومی حذف شده است: مشتری درخواست تماس می‌گذارد و نماینده/عامل فروش حساب شرکت
/// را می‌سازد و نام کاربری و رمز را تحویل می‌دهد.
function FinalCta() {
  return (
    <section className="lp-cta" id="contact">
      <div className="lp-wrap lp-grid">
        <div className="lp-cta-type">
          <h2>ماه بعد، گزارش حقوق را از سامانه بگیرید.</h2>
          <p>
            نام و شماره‌تان را بگذارید؛ نمایندهٔ فروش ما تماس می‌گیرد، پلن مناسب را با شما انتخاب
            می‌کند و حساب شرکت را همراه نام کاربری و رمز ورود تحویلتان می‌دهد.
          </p>
        </div>
        <div className="lp-cta-act is-form">
          <ContactForm />
          <a href="tel:09156201696" className="lp-cta-phone">
            <IconPhone />
            <span className="num">۰۹۱۵۶۲۰۱۶۹۶</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/// گروه‌هایی که به‌جای ظاهرشدنِ یک‌جا، تک‌تک کارت‌هایشان با فاصلهٔ کم ظاهر می‌شوند
/// (پلن‌ها، ردیف امکانات، پرسش‌های متداول) — همان بلوکِ lp-reveal، فقط فرزندانش پشت‌سرهم.
const STAGGER_GROUPS: { container: string; items: string }[] = [
  { container: ".lp-plans", items: ".lp-plan" },
  { container: ".lp-feat-rest .lp-rows", items: ".lp-row" },
  { container: ".lp-faq", items: "details" },
];

/// ظهور تدریجی هنگام اسکرول با GSAP ScrollTrigger؛ در حالت «کاهش حرکت» اجرا نمی‌شود.
function useRevealOnScroll() {
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

const FEATURES = [
  {
    icon: <IconWifi />,
    title: "تأیید با وای‌فای",
    text: "مسیر جایگزین وقتی GPS در دسترس نیست — بر پایهٔ شناسهٔ سخت‌افزاری مودم.",
  },
  {
    icon: <IconCamera />,
    title: "سلفی هنگام ورود",
    text: "برای محل‌های حساس، عکس زندهٔ دوربین جلو را اجباری کنید. عکس‌ها ۴۵ روز نگه‌داری می‌شوند.",
  },
  {
    icon: <IconGrid />,
    title: "شیفت و تعطیلات",
    text: "شیفت هفتگی هر کارمند، تعطیلات رسمی و تعطیلات داخلی شرکت.",
  },
  {
    icon: <IconInbox />,
    title: "مرخصی و مأموریت",
    text: "کارمند از موبایل درخواست می‌دهد، مدیر تأیید یا رد می‌کند و روزهای پوشش‌داده‌شده غیبت حساب نمی‌شوند.",
  },
  {
    icon: <IconReceipt />,
    title: "حقوق و دستمزد",
    text: "حقوق پایه، نرخ تأخیر و اضافه‌کاری هر کارمند را یک‌بار تعریف کنید؛ فیش ماهانه خودکار از روی تردد واقعی ساخته می‌شود و پیش از نهایی‌شدن قابل ویرایش است.",
  },
  {
    icon: <IconFlag />,
    title: "جریمهٔ پرسنل",
    text: "یک کاتالوگ جریمه بسازید و رخدادها را برای هر کارمند ثبت کنید؛ در فیش حقوقی همان ماه خودکار کسر می‌شود.",
  },
  {
    icon: <IconCloudOff />,
    title: "ثبت آفلاین",
    text: "قطعی اینترنت مانع ثبت نیست؛ تردد با زمان واقعی خودش بعداً همگام می‌شود.",
  },
  {
    icon: <IconUsers />,
    title: "چندشعبه‌ای",
    text: "هر شعبه محدوده، وای‌فای و قواعد خودش را دارد و کارکنان به یکی از آن‌ها تخصیص می‌یابند.",
  },
];

const REPORT_ROWS = [
  { day: "شنبه", shift: "۰۸–۱۷", in: "۰۷:۵۸", out: "۱۷:۱۴", worked: "۹:۱۶", late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
  { day: "یکشنبه", shift: "۰۸–۱۷", in: "۰۸:۱۲", out: "۱۷:۰۳", worked: "۸:۵۱", late: "۰:۱۲", status: "تأخیر", tone: "is-late" },
  { day: "دوشنبه", shift: "۰۸–۱۷", in: "۰۷:۵۵", out: "۱۷:۰۰", worked: "۹:۰۵", late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
  { day: "سه‌شنبه", shift: "۰۸–۱۷", in: "—", out: "—", worked: "۰:۰۰", late: "—", status: "مرخصی", tone: "is-off" },
  { day: "چهارشنبه", shift: "۰۸–۱۷", in: "۰۸:۰۲", out: "۱۷:۲۶", worked: "۹:۲۴", late: "۰:۰۰", status: "حاضر", tone: "is-ok" },
];

const SETUP = [
  {
    n: "۰۱",
    t: "شرکت را ثبت کنید",
    p: "با شمارهٔ موبایل خودتان حساب کارفرما می‌سازید و پلن مناسب تیم‌تان را انتخاب می‌کنید. هیچ قرارداد بلندمدتی لازم نیست.",
  },
  {
    n: "۰۲",
    t: "محل کار و کارکنان",
    p: "محدودهٔ مجاز را روی نقشه مشخص می‌کنید، شیفت‌ها را می‌سازید و کارکنان را با شمارهٔ موبایل اضافه می‌کنید.",
  },
  {
    n: "۰۳",
    t: "اپ را به تیم بدهید",
    p: "کارکنان با همان شماره وارد می‌شوند و از روز اول ثبت می‌کنند. گزارش از همان روز پر می‌شود.",
  },
];

const FAQ = [
  {
    q: "کارمند می‌تواند از خانه ورود بزند؟",
    a: "خیر. اگر موقعیت مکانی معتبر باشد و بیرون از محدودهٔ مجاز، تردد رد می‌شود و وای‌فای هم نمی‌تواند آن را بپوشاند. وای‌فای فقط وقتی وارد تصمیم می‌شود که مکانی در دست نباشد، و آن هم بر پایهٔ شناسهٔ سخت‌افزاری مودم است که از راه دور قابل جعل نیست.",
  },
  {
    q: "اگر GPS گوشی کار نکند چه می‌شود؟",
    a: "سامانه خودکار سراغ شبکهٔ وای‌فای محل کار می‌رود. اگر مودم شما شناسایی شود تردد ثبت می‌شود و در گزارش هم مشخص می‌ماند که این تردد با وای‌فای تأیید شده است.",
  },
  {
    q: "به دستگاه اثر انگشت یا کارت‌خوان نیاز دارم؟",
    a: "خیر. کارکنان با موبایل شخصی خودشان ثبت می‌کنند. برای ورود به خود برنامه هم می‌توانند اثر انگشت گوشی‌شان را فعال کنند.",
  },
  {
    q: "اگر اینترنت قطع باشد؟",
    a: "تردد روی گوشی ذخیره می‌شود و به‌محض برقراری اینترنت با زمان واقعی خودش به سرور می‌رود — نه زمان همگام‌سازی.",
  },
  {
    q: "روی آیفون هم کار می‌کند؟",
    a: "بله. علاوه بر اپ اندروید، نسخهٔ تحت وب روی مرورگر آیفون و رایانه کار می‌کند و می‌شود آن را به صفحهٔ اصلی اضافه کرد. تأیید وای‌فای روی آیفون در دسترس نیست و آن‌جا مبنا موقعیت مکانی است.",
  },
  {
    q: "داده‌ها کجا نگه‌داری می‌شوند؟",
    a: "روی سرور داخل ایران. عکس‌های سلفی هم پس از ۴۵ روز خودکار حذف می‌شوند.",
  },
];

/* ---------- آیکون‌ها: خطی، ضخامت یکسان ۱٫۶، بدون پرکردن ---------- */

function IconTick() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  );
}

function IconCross() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 3.5h3l1.5 4-2 1.4a12 12 0 0 0 5.6 5.6l1.4-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.5 5.7 2 2 0 0 1 7.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconWifi() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 9.2a13 13 0 0 1 17 0M6.6 12.6a8.4 8.4 0 0 1 10.8 0M9.7 16a4 4 0 0 1 4.6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M12 19.3h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function IconCamera() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3.5 8h3.2l1.4-2h7.8l1.4 2h3.2v11H3.5V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="13" r="3.1" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="14" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3.5 10h17M9 10v9.5M15 10v9.5M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconInbox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 13.5 6 5h12l2 8.5V19H4v-5.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M4 13.5h4a4 4 0 0 0 8 0h4" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconReceipt() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 3.5h12v17l-2.4-1.5-2.1 1.5-2-1.5-2.1 1.5L7 19l-1-.6V3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M9 8.5h6M9 12h6M9 15.3h3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconFlag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 20.5V4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 4.5h12l-2.7 4 2.7 4H6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

function IconCloudOff() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 18.5h9.2a3.8 3.8 0 0 0 .6-7.5 5.6 5.6 0 0 0-9.4-3" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.6 11.2a3.7 3.7 0 0 0-.1 7.3M4 4l16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20.5c4-4.2 6-7.4 6-9.9a6 6 0 1 0-12 0c0 2.5 2 5.7 6 9.9Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="10.3" r="2.3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
