"use client";

import { SiteNav, SiteFooter, FloatingContact } from "./chrome";
import { useRevealOnScroll } from "@/lib/reveal";
import { useLandingMotion, useSmoothScroll } from "@/lib/motion";
import "./landing.css";

/// پوستهٔ مشترک هر صفحهٔ عمومی: ناوبری، پاورقی، دکمهٔ شناور و همهٔ حرکت‌های GSAP/Lenis.
/// خودِ صفحه‌ها سرور‌کامپوننت می‌مانند (متادیتا و JSON-LD)، و فقط همین پوسته کلاینتی است.
export function PageShell({ children }: { children: React.ReactNode }) {
  useRevealOnScroll();
  useSmoothScroll();
  useLandingMotion();

  return (
    <div className="lp">
      {/* بدون جاوااسکریپت، ظهور تدریجی هرگز فعال نمی‌شود و محتوا نامرئی می‌ماند. */}
      <noscript
        dangerouslySetInnerHTML={{
          __html:
            "<style>.lp-reveal,.lp-plans .lp-plan,.lp-faq details,[data-hero-item]{opacity:1 !important;transform:none !important}</style>",
        }}
      />
      <div className="lp-progress" aria-hidden="true" />
      <SiteNav />
      {children}
      <FloatingContact />
      <SiteFooter />
    </div>
  );
}
