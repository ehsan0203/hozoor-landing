import type { BlogPost, BlogPostDetail, PagedResult } from "./types";

/// فقط مسیرهای عمومی بک‌اند حضوریار: بلاگ و درخواست تماس. این سایت ورود و نشست ندارد.

interface ApiEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

const UNAVAILABLE = "سامانه فعلاً پاسخ نمی‌دهد. چند لحظه صبر کنید و دوباره امتحان کنید.";
const GENERIC_FAILURE = "کار انجام نشد. دوباره امتحان کنید.";

/// پیام‌های فارسی سرور به کاربر نشان داده می‌شوند؛ پیام‌های فنی خام نه.
function readable(message: string): string {
  return (message.match(/[\u0600-\u06FF]/g) ?? []).length >= 3 ? message : GENERIC_FAILURE;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${window.__API_BASE__ ?? ""}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    throw new Error("ارتباط با سرور برقرار نشد");
  }

  let body: ApiEnvelope<T>;
  try {
    body = (await res.json()) as ApiEnvelope<T>;
  } catch {
    throw new Error(UNAVAILABLE);
  }
  if (!res.ok || !body.success) {
    throw new Error(readable(body.errors?.join(" ") || body.message || ""));
  }
  return body.data as T;
}

export function submitContactRequest(dto: {
  fullName: string;
  phoneNumber: string;
  companyName?: string | null;
  note?: string | null;
}) {
  return request<object>("/api/contact-requests", { method: "POST", body: JSON.stringify(dto) });
}

export function getBlogPosts(params: { tag?: string; page?: number; pageSize?: number } = {}) {
  const q = new URLSearchParams();
  if (params.tag) q.set("tag", params.tag);
  q.set("page", String(params.page ?? 1));
  q.set("pageSize", String(params.pageSize ?? 9));
  return request<PagedResult<BlogPost>>(`/api/blog?${q.toString()}`);
}

export function getBlogTags() {
  return request<string[]>("/api/blog/tags");
}

export function getBlogPost(slug: string) {
  return request<BlogPostDetail>(`/api/blog/posts/${encodeURIComponent(slug)}`);
}
