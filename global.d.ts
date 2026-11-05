declare global {
  interface Window {
    /// آدرس سرور بک‌اند؛ از public/config.js خوانده می‌شود.
    __API_BASE__?: string;
    /// آدرس اپ اصلی برای دکمه‌های «ورود»؛ از public/config.js خوانده می‌شود.
    __APP_URL__?: string;
    /// شمارهٔ تماس پشتیبانی؛ از public/config.js خوانده می‌شود تا تغییرش نیاز به بیلد نداشته باشد.
    __SUPPORT_PHONE__?: string;
    /// شمارهٔ واتساپ به‌شکل بین‌المللی بدون + (مثلاً 989154824857). خالی باشد دکمهٔ واتساپ نمایش داده نمی‌شود.
    __WHATSAPP__?: string;
    /// ردیاب‌های اختیاری؛ هر کدام که روی صفحه لود شده باشد رویدادها را می‌گیرد.
    gtag?: (...args: unknown[]) => void;
    plausible?: (name: string, opts?: { props?: Record<string, unknown> }) => void;
    umami?: { track: (name: string, data?: Record<string, unknown>) => void };
  }
}

export {};
