import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import type { BlogPostMeta } from '@/lib/blog';
import WavyUnderline from './WavyUnderline';

const COVER_COLORS: Record<BlogPostMeta['cover'], string> = {
  sage: 'var(--color-sage)',
  terracotta: 'var(--color-terracotta)',
  gold: 'var(--color-gold)',
};

export default function BlogSection({ posts }: { posts: BlogPostMeta[] }) {
  const t = useTranslations('blog');

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">{t('title')}</h2>
        <Link href="/blog" className="hand-underline font-body text-sm font-semibold text-terracotta">
          {t('viewAll')} →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {posts.slice(0, 3).map((post, i) => (
          <article
            key={post.slug}
            className="group"
            style={{ transform: i % 2 === 0 ? 'rotate(-0.4deg)' : 'rotate(0.4deg)' }}
          >
            <div
              className="mb-4 h-40 w-full rounded-xl"
              style={{ backgroundColor: COVER_COLORS[post.cover] + '33' }}
            />
            <p className="mb-2 font-hand text-sm text-terracotta">{post.category}</p>
            <h3 className="font-display text-xl font-bold leading-snug text-charcoal">
              <Link href={`/blog/${post.slug}`} className="transition group-hover:opacity-70">
                {post.title}
              </Link>
            </h3>
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
      </div>
    </section>
  );
}
