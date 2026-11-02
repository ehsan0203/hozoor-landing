"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { getBlogPost, getBlogPosts } from "@/lib/api";
import type { BlogPost, BlogPostDetail } from "@/lib/types";
import { SiteNav, SiteFooter } from "../../chrome";
import { BlogCard, formatPostDate } from "../../blog-card";
import "../../landing.css";

/// صفحهٔ جزئیات یک مطلب.
/// نشانی مطلب از رشتهٔ پرس‌وجو (?slug=…) خوانده می‌شود نه از مسیر پویا، چون خروجی
/// سایت کاملاً استاتیک است و مسیر [slug] در زمان بیلد قابل تولید نیست.
export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const [more, setMore] = useState<BlogPost[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "missing" | "failed">("loading");

  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("slug");
    if (!slug) {
      setState("missing");
      return;
    }

    let cancelled = false;
    getBlogPost(slug)
      .then((p) => {
        if (cancelled) return;
        setPost(p);
        setState("ready");
        document.title = `${p.title} — بلاگ حضوریار`;
      })
      .catch((e) => {
        if (cancelled) return;
        // پیام «یافت نشد» سرور با خطای شبکه فرق دارد و کاربر باید تفاوتشان را ببیند.
        setState(e instanceof Error && e.message.includes("یافت نشد") ? "missing" : "failed");
      });

    getBlogPosts({ pageSize: 4 })
      .then((r) => {
        if (!cancelled) setMore(r.items.filter((p) => p.slug !== slug).slice(0, 3));
      })
      .catch(() => {
        /* بخش «مطالب دیگر» اختیاری است */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="lp">
      <SiteNav />

      {state === "loading" && (
        <section className="lp-section">
          <div className="lp-wrap">
            <p className="lp-note">در حال دریافت مطلب…</p>
          </div>
        </section>
      )}

      {(state === "missing" || state === "failed") && (
        <section className="lp-section">
          <div className="lp-wrap">
            <h1 className="lp-h2">{state === "missing" ? "این مطلب پیدا نشد." : "مطلب دریافت نشد."}</h1>
            <p className="lp-lead" style={{ marginTop: 16 }}>
              {state === "missing"
                ? "شاید نشانی صفحه اشتباه باشد یا مطلب حذف شده باشد."
                : "ارتباط با سرور برقرار نشد. لطفاً اتصال اینترنت را بررسی کنید."}
            </p>
            <Link href="/blog" className="lp-btn lp-btn-line" style={{ marginTop: 24 }}>
              بازگشت به بلاگ
            </Link>
          </div>
        </section>
      )}

      {state === "ready" && post && (
        <>
          <header className="lp-pagehead">
            <div className="lp-wrap">
              <p className="lp-crumb">
                <Link href="/blog">بلاگ</Link>
                <span aria-hidden="true">/</span>
                {post.tag ?? "مطلب"}
              </p>
              <h1 className="lp-h1">{post.title}</h1>
              <p className="lp-lead">{post.summary}</p>
              <div className="lp-post-meta" style={{ marginTop: 24 }}>
                <span>{post.authorName}</span>
                <span aria-hidden="true">·</span>
                <span className="num">{formatPostDate(post.publishedAt)}</span>
                <span aria-hidden="true">·</span>
                <span>
                  <span className="num">{post.readMinutes.toLocaleString("fa-IR")}</span> دقیقه مطالعه
                </span>
              </div>
            </div>
          </header>

          <section className="lp-section">
            <div className="lp-wrap">
              <article className="lp-article">
                <ArticleBody content={post.content} />
              </article>

              <div className="lp-article-foot">
                <Link href="/blog" className="lp-btn lp-btn-line lp-btn-sm">
                  بازگشت به فهرست مطالب
                </Link>
                <Link href="/#contact" className="lp-btn lp-btn-sm">
                  درخواست تماس
                </Link>
              </div>
            </div>
          </section>

          {more.length > 0 && (
            <section className="lp-section">
              <div className="lp-wrap">
                <div className="lp-section-head">
                  <p className="lp-label">مطالب دیگر</p>
                </div>
                <div className="lp-posts">
                  {more.map((p) => (
                    <BlogCard key={p.id} post={p} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      <SiteFooter />
    </div>
  );
}

/// متن مطلب با نشانه‌گذاری سبک رندر می‌شود: «## » تیتر، «- » بند فهرست، بقیه پاراگراف.
/// عمداً HTML خام تزریق نمی‌شود تا محتوای بلاگ هیچ‌وقت به اسکریپت روی صفحهٔ عمومی تبدیل نشود.
function ArticleBody({ content }: { content: string }) {
  const blocks: JSX.Element[] = [];
  let paragraph: string[] = [];
  let bullets: string[] = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    blocks.push(<p key={`p${blocks.length}`}>{paragraph.join(" ")}</p>);
    paragraph = [];
  };

  const flushBullets = () => {
    if (!bullets.length) return;
    blocks.push(
      <ul key={`u${blocks.length}`}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  for (const raw of content.split("\n")) {
    const line = raw.trim();

    if (!line) {
      flushBullets();
      flushParagraph();
      continue;
    }

    if (line.startsWith("## ")) {
      flushBullets();
      flushParagraph();
      blocks.push(
        <h2 key={`h${blocks.length}`} className="lp-h3">
          {line.slice(3).trim()}
        </h2>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      flushParagraph();
      bullets.push(line.slice(2).trim());
      continue;
    }

    flushBullets();
    paragraph.push(line);
  }

  flushBullets();
  flushParagraph();

  return <Fragment>{blocks}</Fragment>;
}
