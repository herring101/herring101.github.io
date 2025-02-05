import { getResearchPost, getAllResearchPosts } from "@/lib/research";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllResearchPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function ResearchPost({ params }: Props) {
  const post = getResearchPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 mb-4">
          <time className="text-muted-foreground">
            {new Date(post.date).toLocaleDateString('ja-JP')}
          </time>
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/research/tags/${encodeURIComponent(tag)}`}>
                <Badge variant="secondary" className="hover:scale-105 transition-transform">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-xl text-muted-foreground">{post.summary}</p>
      </div>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
