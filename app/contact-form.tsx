"use client";

import { useState } from "react";
import { submitContactRequest } from "@/lib/api";

/// فرم «درخواست تماس» — جایگزین ثبت‌نام عمومی. مشتری فقط نام و شماره‌اش را می‌گذارد؛
/// نماینده یا عامل فروش تماس می‌گیرد، شرکت را می‌سازد و نام کاربری و رمز را تحویل می‌دهد.
export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const normalizedPhone = phone.trim();
    if (!/^09\d{9}$/.test(normalizedPhone)) {
      setError("شمارهٔ موبایل را با ۰۹ و ۱۱ رقم وارد کنید.");
      return;
    }
    setBusy(true);
    try {
      await submitContactRequest({
        fullName: fullName.trim(),
        phoneNumber: normalizedPhone,
        companyName: companyName.trim() || null,
        note: note.trim() || null,
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "ارسال درخواست انجام نشد؛ دوباره تلاش کنید.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="lp-contact-done" role="status">
        <strong>درخواست شما ثبت شد.</strong>
        <p>همکاران ما به‌زودی با شمارهٔ {phone.trim()} تماس می‌گیرند و حساب شرکت شما را راه‌اندازی می‌کنند.</p>
      </div>
    );
  }

  return (
    <form className="lp-contact-form" onSubmit={submit} noValidate>
      <label htmlFor="lp-contact-name">نام و نام خانوادگی</label>
      <input
        id="lp-contact-name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        autoComplete="name"
        required
      />

      <label htmlFor="lp-contact-phone">شمارهٔ موبایل</label>
      <input
        id="lp-contact-phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        inputMode="numeric"
        autoComplete="tel"
        dir="ltr"
        placeholder="09120000000"
        required
      />

      <label htmlFor="lp-contact-company">نام شرکت (اختیاری)</label>
      <input
        id="lp-contact-company"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        autoComplete="organization"
      />

      <label htmlFor="lp-contact-note">توضیح (اختیاری)</label>
      <textarea
        id="lp-contact-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="مثلاً تعداد کارکنان یا زمان مناسب تماس"
      />

      {error && (
        <p className="lp-contact-error" role="alert">
          {error}
        </p>
      )}

      <button className="lp-btn" disabled={busy || !fullName.trim() || !phone.trim()}>
        {busy ? "در حال ارسال…" : "درخواست تماس"}
      </button>
    </form>
  );
}
