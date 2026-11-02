"use client";

import Link from "next/link";
import type { BlogPost } from "@/lib/types";

/// کارت یک مطلب — هم در بخش بلاگِ صفحهٔ معرفی و هم در فهرست کامل بلاگ.
/// نشانی صفحهٔ جزئیات با پارامتر slug ساخته می‌شود، چون خروجی سایت کاملاً استاتیک است
/// و مسیر پویا (/blog/[slug]) در زمان بیلد قابل تولید نیست.
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="lp-post">
      <div className="lp-post-meta">
        {post.tag && <span className="lp-post-tag">{post.tag}</span>}
        <span className="num">{formatPostDate(post.publishedAt)}</span>
        <span aria-hidden="true">·</span>
        <span>
          <span className="num">{post.readMinutes.toLocaleString("fa-IR")}</span> دقیقه مطالعه
        </span>
      </div>

      <h3 className="lp-h3">
        <Link href={postHref(post.slug)}>{post.title}</Link>
      </h3>

      <p>{post.summary}</p>

      <Link href={postHref(post.slug)} className="lp-post-more">
        ادامهٔ مطلب
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="square" />
        </svg>
      </Link>
    </article>
  );
}

export function postHref(slug: string) {
  return `/blog/post/?slug=${encodeURIComponent(slug)}`;
}

export function formatPostDate(iso: string | null) {
  if (!iso) return "پیش‌نویس";
  return new Date(iso).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" });
}
