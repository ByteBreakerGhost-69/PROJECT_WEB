import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { portfolioItems } from '@/lib/portfolio-data';

const COLOR_MAP = {
  sage: 'var(--color-sage)',
  terracotta: 'var(--color-terracotta)',
  gold: 'var(--color-gold)',
};

export default function PortfolioGrid({ limit }: { limit?: number }) {
  const t = useTranslations('portfolio');
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-charcoal md:text-4xl">{t('title')}</h2>
        {limit && (
          <Link
            href="/portfolio"
            className="hand-underline font-body text-sm font-semibold text-terracotta"
          >
            {t('viewAll')} →
          </Link>
        )}
      </div>

      {/* Masonry non-simetris via CSS columns */}
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {items.map((item) => (
          <figure
            key={item.slug}
            className="group relative overflow-hidden rounded-2xl transition-transform duration-300 ease-reveal hover:-translate-y-2"
          >
            <div
              className={`w-full ${item.heightClass} rounded-2xl`}
              style={{ backgroundColor: COLOR_MAP[item.color] + '40' }}
            />
            <figcaption
              className="font-hand pointer-events-none absolute inset-x-3 bottom-3 rounded-lg bg-cream/95 px-3 py-2 text-sm text-charcoal opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100"
              style={{ transform: 'rotate(-1.2deg)' }}
            >
              {item.title} — {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
