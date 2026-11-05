import type { Metadata } from "next";
import { BlogPostView } from "./blog-post";

/// عنوان هر مطلب بعد از دریافت از سرور روی کلاینت گذاشته می‌شود؛ این‌ها پیش‌فرضِ خروجی استاتیک‌اند.
export const metadata: Metadata = {
  title: "مطلب بلاگ",
  alternates: { canonical: "/blog/" },
};

export default function Page() {
  return <BlogPostView />;
}
