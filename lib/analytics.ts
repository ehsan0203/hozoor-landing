/// رویدادهای قیف فروش. هر ردیاب اختیاری که روی صفحه لود شده باشد (GA، Plausible، Umami)
/// رویداد را می‌گیرد؛ اگر هیچ‌کدام نبود، بی‌صدا کاری نمی‌کند.
export type TrackEvent =
  | "cta_click"
  | "call_click"
  | "whatsapp_click"
  | "plan_select"
  | "lead_submit"
  | "lead_error"
  | "calc_use"
  | "faq_open";

export function track(name: TrackEvent, params: Record<string, string | number> = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", name, params);
    window.plausible?.(name, { props: params });
    window.umami?.track(name, params);
  } catch {
    /* ردیاب نباید تجربهٔ کاربر را خراب کند */
  }
}
