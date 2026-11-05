/// حالت نمایش برنامه: روشن، تاریک یا «خودکار» (مطابق تنظیم دستگاه). پیش‌فرض سایت «روشن» است.
/// انتخاب کاربر در localStorage می‌ماند و روی <html data-theme="light|dark"> اعمال می‌شود.
/// همین منطق به‌صورت اسکریپت درون‌خطی (THEME_INIT_SCRIPT) هم قبل از اولین رندر اجرا می‌شود تا
/// هنگام بارگذاری صفحه‌ی تاریک، لحظه‌ای فلش سفید دیده نشود.
export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

const STORAGE_KEY = "hozoor-theme";
export const THEME_CHANGE_EVENT = "hozoor-theme-change";
const THEME_COLORS: Record<ResolvedTheme, string> = { light: "#f7f5f0", dark: "#10160f" };

export function getThemePreference(): ThemePreference {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* localStorage در دسترس نیست */
  }
  return "light";
}

export function resolveTheme(pref: ThemePreference): ResolvedTheme {
  if (pref === "system") {
    return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return pref;
}

export function applyTheme(pref: ThemePreference): ResolvedTheme {
  const resolved = resolveTheme(pref);
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  // رنگ نوار وضعیت/آدرس مرورگر هم با تم هماهنگ شود.
  const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
  if (metas.length === 0) {
    const meta = document.createElement("meta");
    meta.name = "theme-color";
    meta.content = THEME_COLORS[resolved];
    document.head.appendChild(meta);
  } else {
    metas.forEach((m) => {
      m.removeAttribute("media");
      m.content = THEME_COLORS[resolved];
    });
  }
  return resolved;
}

export function setThemePreference(pref: ThemePreference): ResolvedTheme {
  try {
    if (pref === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, pref);
  } catch {
    /* ذخیره نشد؛ فقط برای همین نشست اعمال می‌شود */
  }
  const resolved = applyTheme(pref);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  return resolved;
}

/// اسکریپتی که در <head> قبل از رندر اجرا می‌شود (باید مستقل و بدون import باشد).
export const THEME_INIT_SCRIPT = `(function(){try{var p=null;try{p=localStorage.getItem("${STORAGE_KEY}")}catch(e){}var d=p==="dark";document.documentElement.setAttribute("data-theme",d?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;
