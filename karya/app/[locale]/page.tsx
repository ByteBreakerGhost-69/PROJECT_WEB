import { Suspense } from 'react';
import Hero from '@/components/Hero';
import PortfolioGrid from '@/components/PortfolioGrid';
import BlogSection from '@/components/BlogSection';
import ContactEnvelope from '@/components/ContactEnvelope';
import AuthModal from '@/components/AuthModal';
import { getAllPosts } from '@/lib/blog';

export default function LandingPage() {
  const posts = getAllPosts();

  return (
    <main>
      <Hero />
      <PortfolioGrid limit={6} />
      <BlogSection posts={posts} />
      <ContactEnvelope />

      <Suspense fallback={null}>
        <AuthModal />
      </Suspense>
    </main>
  );
}
