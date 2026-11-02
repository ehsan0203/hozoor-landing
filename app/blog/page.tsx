"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { getBlogPosts, getBlogTags } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import { SiteNav, SiteFooter } from "../chrome";
import { BlogCard } from "../blog-card";
import "../landing.css";

const PAGE_SIZE = 9;

/// فهرست کامل مطالب بلاگ — همان زبان بصری صفحهٔ معرفی، روی همان بک‌اند حضور و غیاب.
export default function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  const load = useCallback(async (nextPage: number, activeTag: string | null) => {
    setLoading(true);
    try {
      const res = await getBlogPosts({ page: nextPage, pageSize: PAGE_SIZE, tag: activeTag ?? undefined });
      setPosts((prev) => (nextPage === 1 ? res.items : [...prev, ...res.items]));
      setTotal(res.total);
      setPage(nextPage);
      setFailed(false);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(1, null);
    getBlogTags()
      .then(setTags)
      .catch(() => {
        /* فیلتر دسته اختیاری است */
      });
  }, [load]);

  const pickTag = (next: string | null) => {
    setTag(next);
    setPosts([]);
    load(1, next);
  };

  const hasMore = posts.length < total;

  return (
    <div className="lp">
      <SiteNav />

      <header className="lp-pagehead">
        <div className="lp-wrap">
          <p className="lp-label">
            <b className="num">۰۱</b> بلاگ حضوریار
          </p>
          <h1 className="lp-h1">حضور و غیاب، آن‌طور که در ایران کار می‌کند.</h1>
          <p className="lp-lead">
            یادداشت‌هایی دربارهٔ ثبت تردد، دورکاری، شیفت و محاسبهٔ کارکرد — از تجربهٔ ساختن و
            راه‌اندازی همین سامانه.
          </p>
        </div>
      </header>

      <section className="lp-section">
        <div className="lp-wrap">
          {tags.length > 0 && (
            <div className="lp-tags" role="group" aria-label="فیلتر دسته">
              <button
                type="button"
                className={`lp-tag${tag === null ? " is-on" : ""}`}
                onClick={() => pickTag(null)}
              >
                همه
              </button>
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`lp-tag${tag === t ? " is-on" : ""}`}
                  onClick={() => pickTag(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}

          {failed && posts.length === 0 ? (
            <p className="lp-note">
              فهرست مطالب دریافت نشد. اتصال اینترنت را بررسی کنید و دوباره تلاش کنید.
            </p>
          ) : posts.length === 0 && !loading ? (
            <p className="lp-note">هنوز مطلبی در این دسته منتشر نشده است.</p>
          ) : (
            <div className="lp-posts">
              {posts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          )}

          {loading && <p className="lp-note" style={{ marginTop: 24 }}>در حال دریافت مطالب…</p>}

          {hasMore && !loading && (
            <div style={{ marginTop: 32, display: "flex", justifyContent: "center" }}>
              <button type="button" className="lp-btn lp-btn-line" onClick={() => load(page + 1, tag)}>
                مطالب بیشتر
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="lp-cta">
        <div className="lp-wrap lp-grid">
          <div className="lp-cta-type">
            <h2>می‌خواهید همین ماه شروع کنید؟</h2>
            <p>یک پلن انتخاب کنید؛ ساختن حساب و افزودن اولین کارمند چند دقیقه طول می‌کشد.</p>
          </div>
          <div className="lp-cta-act">
            <Link href="/#contact" className="lp-btn">
              درخواست تماس
            </Link>
            <a href="tel:09156201696" className="lp-cta-phone">
              <span className="num">۰۹۱۵۶۲۰۱۶۹۶</span>
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
