"use client";

import { IconPhone } from "@/components/icons";
import { track } from "@/lib/analytics";
import { formatPhone } from "@/lib/site";
import { useSupportPhone, useWhatsapp } from "@/lib/site-hooks";
import { useAppUrl } from "@/lib/app-url";

/// راه‌های ارتباطی. واتساپ فقط وقتی در public/config.js شماره‌اش تنظیم شده باشد نمایش داده می‌شود.
export function ContactChannels() {
  const phone = useSupportPhone();
  const whatsapp = useWhatsapp();
  const appUrl = useAppUrl();

  return (
    <section className="lp-section">
      <div className="lp-wrap">
        <div className="lp-section-head lp-reveal">
          <p className="lp-label">راه‌های ارتباطی</p>
          <h2 className="lp-h2">هر راهی که راحت‌تر است.</h2>
        </div>

        <div className="lp-channels">
          <a
            className="lp-channel"
            href={`tel:${phone}`}
            onClick={() => track("call_click", { place: "contact_page" })}
          >
            <span className="lp-channel-ico">
              <IconPhone />
            </span>
            <b>تماس تلفنی</b>
            <span className="num" dir="ltr">
              {formatPhone(phone)}
            </span>
            <small>برای مشاورهٔ قبل از خرید و پشتیبانی</small>
          </a>

          {whatsapp && (
            <a
              className="lp-channel is-wa"
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { place: "contact_page" })}
            >
              <span className="lp-channel-ico">W</span>
              <b>واتساپ</b>
              <span>پیام بدهید</span>
              <small>برای سؤال‌های کوتاه</small>
            </a>
          )}

          <a className="lp-channel" href="#contact">
            <span className="lp-channel-ico">✎</span>
            <b>فرم درخواست مشاوره</b>
            <span>نام و شماره را بگذارید</span>
            <small>نمایندهٔ ما تماس می‌گیرد</small>
          </a>

          <a className="lp-channel" href={`${appUrl}/login/`}>
            <span className="lp-channel-ico">→</span>
            <b>ورود به سامانه</b>
            <span>مخصوص مشتریان فعلی</span>
            <small>با نام کاربری و رمزی که تحویل گرفته‌اید</small>
          </a>
        </div>
      </div>
    </section>
  );
}
