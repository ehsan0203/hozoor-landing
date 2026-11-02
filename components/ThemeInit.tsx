"use client";

import { useEffect } from "react";
import { applyTheme, getThemePreference } from "@/lib/theme";

/// تم را هنگام بارگذاری هماهنگ می‌کند (رنگ نوار مرورگر) و تا وقتی کاربر انتخابی نکرده،
/// با تغییر تنظیم روشن/تاریکِ دستگاه همگام می‌ماند.
export default function ThemeInit() {
  useEffect(() => {
    applyTheme(getThemePreference());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (getThemePreference() === "system") applyTheme("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return null;
}
