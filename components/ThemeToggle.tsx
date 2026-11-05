"use client";

import { useEffect, useState } from "react";
import { getThemePreference, resolveTheme, setThemePreference, THEME_CHANGE_EVENT, type ResolvedTheme } from "@/lib/theme";

/// سوییچ کشوییِ روشن/تاریک (خورشید و ماه). تا وقتی کاربر چیزی انتخاب نکرده، تم از تنظیم
/// دستگاه پیروی می‌کند و با تغییر آن به‌روز می‌شود؛ با اولین کلیک انتخاب کاربر ذخیره می‌شود.
export default function ThemeToggle({ className = "icon-btn" }: { className?: string }) {
  const [theme, setTheme] = useState<ResolvedTheme | null>(null);

  useEffect(() => {
    setTheme(resolveTheme(getThemePreference()));
    const sync = () => setTheme(resolveTheme(getThemePreference()));
    window.addEventListener("storage", sync);
    window.addEventListener(THEME_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(THEME_CHANGE_EVENT, sync);
    };
  }, []);

  // پیش از mount همان ابعاد سوییچ را نگه می‌دارد تا ناوبری نپرد.
  if (!theme) return <span className={`${className} lp-ts`} style={{ visibility: "hidden" }} aria-hidden="true" />;

  const dark = theme === "dark";
  const next: ResolvedTheme = dark ? "light" : "dark";
  const label = next === "dark" ? "حالت تاریک" : "حالت روشن";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      className={`${className} lp-ts${dark ? " is-dark" : ""}`}
      aria-label={`تغییر به ${label}`}
      title={label}
      onClick={() => {
        setTheme(setThemePreference(next));
      }}
    >
      <span className="lp-ts-ico is-sun" aria-hidden="true">
        <SunIcon />
      </span>
      <span className="lp-ts-ico is-moon" aria-hidden="true">
        <MoonIcon />
      </span>
      <span className="lp-ts-thumb" aria-hidden="true">
        {dark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}
