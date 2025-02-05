import { getAllResearchPosts } from "@/lib/research";
import { getAllTags, tagMetadata } from "@/lib/tags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TagIcon } from "@/components/ui/tag-icon";
import { notFound } from "next/navigation";

interface Props {
  params: {
    tag: string;
  };
}

// ビルド時に生成する必要があるすべてのタグページのパラメータを指定
export async function generateStaticParams() {
  const posts = getAllResearchPosts();
  const tags = getAllTags(posts);
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag.name),
  }));
}

export default async function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const posts = getAllResearchPosts();
  const tags = getAllTags(posts);
  const tag = tags.find((t) => t.name === decodedTag);

  if (!tag) {
    notFound();
  }



  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <TagIcon icon={tag.icon} className="text-primary" size={32} />
        <h1 className="text-4xl font-bold">{tag.name}</h1>
        <Badge variant="secondary" className="text-lg">{tag.posts.length}件</Badge>
      </div>
      {tag.description && (
        <p className="text-xl text-muted-foreground mb-8">{tag.description}</p>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {tag.posts.map((post) => (
          <Link key={post.slug} href={`/research/${post.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">
                    {new Date(post.date).toLocaleDateString('ja-JP')}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{post.summary}</p>
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((t) => (
                    <Badge 
                      key={t} 
                      variant={t === tag.name ? "default" : "secondary"}
                      className="hover:scale-105 transition-transform"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
