"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { getBlogPosts } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import { BlogCard } from "../blog-card";

/// تازه‌ترین مطالب بلاگ — از همان بک‌اند حضور و غیاب خوانده می‌شود.
/// اگر سرور در دسترس نباشد یا هنوز مطلبی منتشر نشده باشد، بخش اصلاً رندر نمی‌شود
/// تا صفحهٔ معرفی هیچ‌وقت یک بلوک خالی یا پیام خطا نشان ندهد.
export function BlogTeaser() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    getBlogPosts({ pageSize: 3 })
      .then((r) => {
        if (!cancelled) setPosts(r.items);
      })
      .catch(() => {
        /* بلاگ اختیاری است: خطای شبکه نباید صفحهٔ معرفی را خراب کند */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // کارت‌ها بعد از پاسخ سرور می‌آیند، پس از مسیر lp-reveal (که فقط یک‌بار هنگام
  // mount اجرا می‌شود) رد نمی‌شوند و انیمیشن ظهورشان همین‌جاست.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !posts.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from(grid.children, { opacity: 0, y: 24, duration: 0.6, ease: "power3.out", stagger: 0.08 });
    }, grid);
    return () => ctx.revert();
  }, [posts]);

  if (!posts.length) return null;

  return (
    <section className="lp-section" id="blog">
      <div className="lp-wrap">
        <div className="lp-section-head lp-blog-head">
          <div>
            <p className="lp-label">
              بلاگ
            </p>
            <h2 className="lp-h2">آنچه پیش از خرید سامانه خوب است بدانید.</h2>
            <p className="lp-lead">
              تجربهٔ عملی از حضور و غیاب در ایران — از اختلال GPS تا دورکاری و محاسبهٔ کارکرد.
            </p>
          </div>
          <Link href="/blog" className="lp-btn lp-btn-line lp-btn-sm">
            همهٔ مطالب
          </Link>
        </div>

        <div className="lp-posts" ref={gridRef}>
          {posts.map((p) => (
            <BlogCard key={p.id} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
