"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useAppUrl } from "@/lib/app-url";

const DEFAULT_SUPPORT_PHONE = "09156201696";

/// سربرگ و پاورقی مشترکِ سایت عمومی (صفحهٔ معرفی + بلاگ).
/// عمداً از page.tsx بیرون کشیده شده تا صفحات بلاگ همان ناوبری را داشته باشند، نه یک کپی.

const SECTIONS = [
  { hash: "gps", label: "اختلال GPS" },
  { hash: "features", label: "امکانات" },
  { hash: "report", label: "گزارش" },
  { hash: "pricing", label: "تعرفه" },
  { hash: "faq", label: "پرسش‌ها" },
];

/// روی خودِ صفحهٔ معرفی، پیوندها لنگرِ همان صفحه‌اند؛ در بقیهٔ صفحات باید اول به
/// صفحهٔ معرفی بروند. برای همین onLanding لازم است.
export function SiteNav({ onLanding = false }: { onLanding?: boolean }) {
  const appUrl = useAppUrl();

  return (
    <nav className="lp-nav" aria-label="ناوبری اصلی">
      <div className="lp-wrap lp-nav-inner">
        <Link href="/" className="lp-wordmark">
          <span className="lp-mark" aria-hidden="true">
            <IconMark />
          </span>
          حضوریار
        </Link>

        <div className="lp-nav-links">
          {SECTIONS.map((s) =>
            onLanding ? (
              <a key={s.hash} href={`#${s.hash}`}>
                {s.label}
              </a>
            ) : (
              <Link key={s.hash} href={`/#${s.hash}`}>
                {s.label}
              </Link>
            ),
          )}
          <Link href="/blog">بلاگ</Link>
        </div>

        <div className="lp-nav-cta">
          <ThemeToggle className="lp-theme-btn" />
          <a href={`${appUrl}/login/`} className="lp-nav-signin">
            ورود
          </a>
          {onLanding ? (
            <a href="#contact" className="lp-btn lp-btn-sm">
              درخواست تماس
            </a>
          ) : (
            <Link href="/#contact" className="lp-btn lp-btn-sm">
              درخواست تماس
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter({ onLanding = false }: { onLanding?: boolean }) {
  const href = (hash: string) => (onLanding ? `#${hash}` : `/#${hash}`);
  const appUrl = useAppUrl();

  // از public/config.js خوانده می‌شود تا تغییرش نیاز به بیلد نداشته باشد؛ قبل از mount
  // مقدار پیش‌فرض نشان داده می‌شود (هایدریشن‌میسمتچ ندارد چون همان مقدار سرور است).
  const [supportPhone, setSupportPhone] = useState(DEFAULT_SUPPORT_PHONE);
  useEffect(() => {
    if (window.__SUPPORT_PHONE__) setSupportPhone(window.__SUPPORT_PHONE__);
  }, []);

  return (
    <footer className="lp-footer">
      <div className="lp-wrap lp-footer-inner">
        <span className="lp-wordmark">
          <span className="lp-mark" aria-hidden="true">
            <IconMark />
          </span>
          حضوریار
        </span>

        <nav className="lp-footer-links" aria-label="پیوندهای پاورقی">
          <a href={href("gps")}>اختلال GPS</a>
          <a href={href("features")}>امکانات</a>
          <a href={href("pricing")}>تعرفه</a>
          <a href={href("faq")}>پرسش‌ها</a>
          <Link href="/blog">بلاگ</Link>
          <a href={`${appUrl}/login/`}>ورود</a>
        </nav>

        <p className="lp-footer-note">
          حضوریار — سامانهٔ حضور و غیاب مبتنی بر موقعیت مکانی و وای‌فای. پشتیبانی{" "}
          <a className="num" href={`tel:${supportPhone}`} dir="ltr">
            {supportPhone}
          </a>
        </p>
      </div>
    </footer>
  );
}

export function IconMark() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 6.5V12l4 2.4" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  );
}
