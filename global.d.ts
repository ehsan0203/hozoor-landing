declare global {
  interface Window {
    /// آدرس سرور بک‌اند؛ از public/config.js خوانده می‌شود.
    __API_BASE__?: string;
    /// آدرس اپ اصلی برای دکمه‌های «ورود»؛ از public/config.js خوانده می‌شود.
    __APP_URL__?: string;
    /// شمارهٔ تماس پشتیبانی؛ از public/config.js خوانده می‌شود تا تغییرش نیاز به بیلد نداشته باشد.
    __SUPPORT_PHONE__?: string;
  }
}

export {};
