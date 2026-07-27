import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import AnnotatedParagraph from '@/components/AnnotatedParagraph';

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <p className="font-hand mb-2 text-sm text-terracotta">{post.category}</p>
      <h1 className="mb-4 text-3xl font-bold text-charcoal md:text-4xl">{post.title}</h1>
      <p className="mb-10 text-sm text-charcoal/50">{post.date}</p>

      <div
        className="mx-auto text-charcoal/90"
        style={{ maxWidth: '720px', lineHeight: 1.8 }}
      >
        <MDXRemote
          source={post.content}
          components={{
            p: AnnotatedParagraph,
          }}
        />
      </div>
    </main>
  );
}
