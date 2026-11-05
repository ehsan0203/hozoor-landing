"use client";

import { useEffect, useState } from "react";
import { submitContactRequest } from "@/lib/api";
import { track } from "@/lib/analytics";
import { PLAN_SELECT_EVENT } from "@/lib/leads";

/// فرم «درخواست تماس» — جایگزین ثبت‌نام عمومی. مشتری فقط نام و شماره‌اش را می‌گذارد؛
/// نماینده یا عامل فروش تماس می‌گیرد، شرکت را می‌سازد و نام کاربری و رمز را تحویل می‌دهد.
/// فقط دو فیلد اجباری است؛ بقیه پشت «افزودن توضیح» می‌ماند تا اصطکاک ارسال کم باشد.
export function ContactForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [note, setNote] = useState("");
  const [plan, setPlan] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  // انتخاب پلن در بخش تعرفه یا ماشین‌حساب
  useEffect(() => {
    const onPlan = (e: Event) => setPlan(String((e as CustomEvent).detail ?? ""));
    window.addEventListener(PLAN_SELECT_EVENT, onPlan);
    return () => window.removeEventListener(PLAN_SELECT_EVENT, onPlan);
  }, []);

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
      const body = [plan && `پلن مورد نظر: ${plan}`, note.trim()].filter(Boolean).join(" — ");
      await submitContactRequest({
        fullName: fullName.trim(),
        phoneNumber: normalizedPhone,
        companyName: companyName.trim() || null,
        note: body || null,
      });
      track("lead_submit", plan ? { plan } : {});
      setDone(true);
    } catch (err) {
      track("lead_error");
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
      {plan && (
        <p className="lp-contact-plan">
          پلن مورد نظر: <b>{plan}</b>
          <button type="button" onClick={() => setPlan("")} aria-label="حذف پلن انتخاب‌شده">
            ×
          </button>
        </p>
      )}

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

      {showMore ? (
        <>
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
        </>
      ) : (
        <button type="button" className="lp-contact-more" onClick={() => setShowMore(true)}>
          + افزودن نام شرکت و توضیح
        </button>
      )}

      {error && (
        <p className="lp-contact-error" role="alert">
          {error}
        </p>
      )}

      <button className="lp-btn" disabled={busy || !fullName.trim() || !phone.trim()}>
        {busy ? "در حال ارسال…" : "درخواست مشاوره و دمو"}
      </button>
    </form>
  );
}
