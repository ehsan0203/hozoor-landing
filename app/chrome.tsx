"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ThemeToggle from "@/components/ThemeToggle";
import { useAppUrl } from "@/lib/app-url";
import { track } from "@/lib/analytics";
import { NAV_PAGES } from "@/lib/nav";
import { formatPhone } from "@/lib/site";
import { useSupportPhone, useWhatsapp } from "@/lib/site-hooks";
import { IconPhone } from "@/components/icons";

/// سربرگ و پاورقی مشترکِ همهٔ صفحات سایت عمومی (معرفی، امکانات، تعرفه، اختلال GPS، پرسش‌ها، تماس، بلاگ).

const normalize = (p: string) => p.replace(/\/+$/, "") || "/";

export function SiteNav() {
  const appUrl = useAppUrl();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // روی صفحهٔ بلاگ فرم تماس نیست؛ دکمهٔ ناوبری به صفحهٔ تماس می‌رود.
  const ctaHref = pathname.startsWith("/blog") ? "/contact/" : "#contact";
  const current = normalize(pathname);

  // با عوض‌شدن صفحه منو بسته شود
  useEffect(() => setOpen(false), [pathname]);

  // باز شدن منوی موبایل با GSAP
  useEffect(() => {
    const el = menuRef.current;
    if (!open || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = el.querySelectorAll("a");
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.45, ease: "power3.out" });
      gsap.fromTo(items, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.05, delay: 0.1 });
    }, el);
    return () => ctx.revert();
  }, [open]);

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
          {NAV_PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              aria-current={normalize(p.href) === current ? "page" : undefined}
            >
              {p.label}
            </Link>
          ))}
        </div>

        <div className="lp-nav-cta">
          <span className="lp-nav-theme">
            <ThemeToggle className="lp-theme-btn" />
          </span>
          <a href={`${appUrl}/login/`} className="lp-nav-signin">
            ورود
          </a>
          <Link href={ctaHref} className="lp-btn lp-btn-sm" onClick={() => track("cta_click", { place: "nav" })}>
            مشاورهٔ رایگان
          </Link>
          <button
            type="button"
            className={`lp-burger${open ? " is-open" : ""}`}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            aria-controls="lp-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div id="lp-menu" className="lp-menu" ref={menuRef}>
          <div className="lp-wrap">
            {NAV_PAGES.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                aria-current={normalize(p.href) === current ? "page" : undefined}
              >
                {p.label}
              </Link>
            ))}
            <a href={`${appUrl}/login/`} className="lp-menu-login">
              ورود به سامانه
            </a>
            {/* در عرض‌های کم، سوییچ تم از نوار بالا به این‌جا می‌آید */}
            <div className="lp-menu-theme">
              <span>حالت نمایش</span>
              <ThemeToggle className="lp-theme-btn" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export function SiteFooter() {
  const appUrl = useAppUrl();
  const supportPhone = useSupportPhone();

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
          {NAV_PAGES.map((p) => (
            <Link key={p.href} href={p.href}>
              {p.label}
            </Link>
          ))}
          <a href={`${appUrl}/login/`}>ورود</a>
        </nav>

        <p className="lp-footer-note">
          حضوریار — سامانهٔ حضور و غیاب مبتنی بر موقعیت مکانی و وای‌فای. پشتیبانی{" "}
          <a className="num" href={`tel:${supportPhone}`} dir="ltr">
            {formatPhone(supportPhone)}
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

/// دکمهٔ شناور تماس (و واتساپ اگر در config.js تنظیم شده باشد). بعد از عبور از هیرو ظاهر می‌شود
/// و وقتی خودِ فرم تماس روی صفحه است پنهان می‌شود تا روی آن نیفتد.
export function FloatingContact() {
  const phone = useSupportPhone();
  const whatsapp = useWhatsapp();
  const [shown, setShown] = useState(false);
  const [atForm, setAtForm] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const form = document.getElementById("contact");
    let io: IntersectionObserver | undefined;
    if (form) {
      io = new IntersectionObserver(([entry]) => setAtForm(entry.isIntersecting), { threshold: 0.15 });
      io.observe(form);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = shown && !atForm;

  return (
    <div className={`lp-fab${visible ? " is-on" : ""}`} aria-hidden={!visible}>
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}`}
          className="lp-fab-btn is-wa"
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          onClick={() => track("whatsapp_click", { place: "fab" })}
        >
          واتساپ
        </a>
      )}
      <a
        href={`tel:${phone}`}
        className="lp-fab-btn"
        tabIndex={visible ? 0 : -1}
        aria-label={`تماس با ${formatPhone(phone)}`}
        onClick={() => track("call_click", { place: "fab" })}
      >
        <IconPhone />
        تماس
      </a>
    </div>
  );
}
