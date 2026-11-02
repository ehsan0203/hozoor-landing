export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tag: string | null;
  authorName: string;
  readMinutes: number;
  publishedAt: string | null;
  isPublished: boolean;
  viewCount: number;
}

/// همان مطلب با متن کامل، برای صفحهٔ جزئیات.
export interface BlogPostDetail extends BlogPost {
  content: string;
}

export interface PagedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
