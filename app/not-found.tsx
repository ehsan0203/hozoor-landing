import Link from "next/link";
import "./landing.css";

export const metadata = { title: "صفحه پیدا نشد", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="lp">
      <div className="lp-wrap lp-404">
        <p className="lp-label">۴۰۴</p>
        <h1 className="lp-h2">این صفحه پیدا نشد.</h1>
        <p className="lp-lead">نشانی را اشتباه وارد کرده‌اید یا صفحه جابه‌جا شده است.</p>
        <Link href="/" className="lp-btn">
          بازگشت به صفحهٔ اصلی
        </Link>
      </div>
    </div>
  );
}
