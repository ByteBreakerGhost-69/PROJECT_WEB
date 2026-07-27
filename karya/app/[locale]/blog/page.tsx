import type { Metadata } from 'next';
import { getAllPosts, getCategories } from '@/lib/blog';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tulisan tentang produktivitas, mindset, dan desain dari Karya.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getCategories();

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <h1 className="mb-10 text-4xl font-bold text-charcoal">Blog</h1>
      <BlogList posts={posts} categories={categories} />
    </main>
  );
}
