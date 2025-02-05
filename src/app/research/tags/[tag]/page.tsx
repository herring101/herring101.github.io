import { getAllResearchPosts } from "@/lib/research";
import { getAllTags, tagMetadata } from "@/lib/tags";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconTag, IconBrain, IconCode, IconNetwork } from "@tabler/icons-react";

const iconMap = {
  code: IconCode,
  brain: IconBrain,
  network: IconNetwork,
  tag: IconTag
} as const;
import { notFound } from "next/navigation";

interface Props {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllResearchPosts();
  const tags = getAllTags(posts);
  return tags.map((tag) => ({
    tag: tag.name,
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

  const IconComponent = tag.icon ? iconMap[tag.icon as keyof typeof iconMap] : IconTag;

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <IconComponent className="w-8 h-8 text-primary" />
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
