import type { Metadata } from 'next';
import PortfolioGallery from '@/components/PortfolioGallery';

export const metadata: Metadata = {
  title: 'Portofolio',
  description: 'Kumpulan proyek yang pernah dikerjakan.',
};

export default function PortfolioPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <h1 className="mb-10 text-4xl font-bold text-charcoal">Portofolio</h1>
      <PortfolioGallery />
    </main>
  );
}
