import { useEffect, useState } from "react";

const DEFAULT_APP_URL = "https://hozoor.wshare.ir";

/// نشانی اپ اصلی (ورود کاربران) — بدون اسلش پایانی. مقدار از public/config.js خوانده می‌شود تا
/// تغییر دامنه نیاز به بیلد نداشته باشد؛ قبل از mount مقدار پیش‌فرض برمی‌گردد تا خروجی استاتیک
/// و هیدریشن یکی بماند.
export function useAppUrl(): string {
  const [url, setUrl] = useState(DEFAULT_APP_URL);
  useEffect(() => {
    if (window.__APP_URL__) setUrl(window.__APP_URL__);
  }, []);
  return url;
}
