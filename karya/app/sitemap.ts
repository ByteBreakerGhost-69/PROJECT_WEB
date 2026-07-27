import type { MetadataRoute } from 'next';
import { routing } from '@/lib/i18n/routing';
import { getAllPosts } from '@/lib/blog';
import { portfolioItems } from '@/lib/portfolio-data';

const BASE_URL = 'https://karya.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: `${BASE_URL}/${locale}`, changeFrequency: 'weekly', priority: 1 },
      { url: `${BASE_URL}/${locale}/blog`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${BASE_URL}/${locale}/portfolio`, changeFrequency: 'monthly', priority: 0.8 }
    );

    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }

    for (const item of portfolioItems) {
      entries.push({
        url: `${BASE_URL}/${locale}/portfolio#${item.slug}`,
        changeFrequency: 'yearly',
        priority: 0.4,
      });
    }
  }

  return entries;
}
