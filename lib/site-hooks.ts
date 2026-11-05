"use client";

import { useEffect, useState } from "react";
import { DEFAULT_SUPPORT_PHONE } from "./site";

/// شمارهٔ پشتیبانی از public/config.js خوانده می‌شود تا تغییرش بیلد نخواهد؛ قبل از mount
/// مقدار پیش‌فرض برمی‌گردد تا خروجی استاتیک و هیدریشن یکی بماند.
export function useSupportPhone(): string {
  const [phone, setPhone] = useState(DEFAULT_SUPPORT_PHONE);
  useEffect(() => {
    if (window.__SUPPORT_PHONE__) setPhone(window.__SUPPORT_PHONE__);
  }, []);
  return phone;
}

export function useWhatsapp(): string {
  const [number, setNumber] = useState("");
  useEffect(() => {
    setNumber((window.__WHATSAPP__ ?? "").replace(/\D/g, ""));
  }, []);
  return number;
}
