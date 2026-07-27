'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import WavyUnderline from './WavyUnderline';

const COVER_COLORS: Record<BlogPostMeta['cover'], string> = {
  sage: 'var(--color-sage)',
  terracotta: 'var(--color-terracotta)',
  gold: 'var(--color-gold)',
};

export default function BlogList({
  posts,
  categories,
}: {
  posts: BlogPostMeta[];
  categories: string[];
}) {
  const t = useTranslations('blog');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      const matchesQuery =
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'all' || post.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('search')}
          aria-label={t('search')}
          className="w-full max-w-xs rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label={t('allCategories')}
          className="w-full max-w-xs rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-sm outline-none focus-visible:border-terracotta"
        >
          <option value="all">{t('allCategories')}</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filtered.map((post) => (
          <article key={post.slug}>
            <div
              className="mb-4 h-36 w-full rounded-xl"
              style={{ backgroundColor: COVER_COLORS[post.cover] + '33' }}
            />
            <p className="mb-1 font-hand text-sm text-terracotta">{post.category}</p>
            <h2 className="font-display text-xl font-bold text-charcoal">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <WavyUnderline color={COVER_COLORS[post.cover]} />
            <p className="mt-3 text-sm text-charcoal/70">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="hand-underline mt-3 inline-block text-sm font-semibold text-charcoal"
            >
              {t('readArticle')}
            </Link>
          </article>
        ))}

        {filtered.length === 0 && (
          <p className="col-span-full text-sm text-charcoal/50">
            Tidak ada artikel yang cocok.
          </p>
        )}
      </div>
    </div>
  );
}
