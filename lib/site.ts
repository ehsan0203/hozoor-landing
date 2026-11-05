/// نشانی عمومی همین سایت (برای canonical، sitemap و داده‌های ساختاری). هنگام بیلد با
/// NEXT_PUBLIC_SITE_URL تنظیم می‌شود.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://hozoor.wshare.ir").replace(/\/$/, "");

export const SITE_NAME = "حضوریار";
export const SITE_TITLE = "حضوریار — سامانهٔ حضور و غیاب با موبایل، حتی وقتی GPS قطع است";
export const SITE_DESCRIPTION =
  "ثبت ورود و خروج کارکنان با موبایل، با راستی‌آزمایی مکان و وای‌فای؛ حتی در اختلال GPS. محاسبهٔ خودکار تأخیر، اضافه‌کاری و فیش حقوقی. بدون دستگاه اثر انگشت.";

/// همان مقداری که در public/config.js آمده؛ فقط پیش از mount نشان داده می‌شود.
export const DEFAULT_SUPPORT_PHONE = "09154824857";

const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export function faDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

/// «۰۹۱۵۴۸۲۴۸۵۷» برای نمایش (ارقام فارسی)؛ href همچنان ارقام لاتین است.
export function formatPhone(phone: string): string {
  return faDigits(phone);
}
