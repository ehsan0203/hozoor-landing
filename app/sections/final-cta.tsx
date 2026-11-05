"use client";

import { IconPhone } from "@/components/icons";
import { track } from "@/lib/analytics";
import { formatPhone } from "@/lib/site";
import { useSupportPhone } from "@/lib/site-hooks";
import { ContactForm } from "../contact-form";

/// ثبت‌نام عمومی حذف شده است: مشتری درخواست تماس می‌گذارد و نماینده/عامل فروش حساب شرکت
/// را می‌سازد و نام کاربری و رمز را تحویل می‌دهد.
export function FinalCta() {
  const phone = useSupportPhone();

  return (
    <section className="lp-cta" id="contact">
      <div className="lp-wrap lp-grid">
        <div className="lp-cta-type">
          <h2>ماه بعد، گزارش حقوق را از سامانه بگیرید.</h2>
          <p>
            نام و شماره‌تان را بگذارید؛ نمایندهٔ ما تماس می‌گیرد، سامانه را برایتان نشان می‌دهد،
            پلن مناسب را با شما انتخاب می‌کند و حساب شرکت را همراه نام کاربری و رمز ورود تحویلتان
            می‌دهد.
          </p>
          <ul className="lp-cta-assure">
            <li>مشاوره و نمایش سامانه بدون هیچ تعهدی</li>
            <li>بدون قرارداد بلندمدت</li>
            <li>راه‌اندازی از ثبت شرکت تا اولین تردد، زیر ۱۰ دقیقه</li>
          </ul>
        </div>
        <div className="lp-cta-act is-form">
          <ContactForm />
          <a
            href={`tel:${phone}`}
            className="lp-cta-phone"
            onClick={() => track("call_click", { place: "final_cta" })}
          >
            <IconPhone />
            <span className="num">{formatPhone(phone)}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
