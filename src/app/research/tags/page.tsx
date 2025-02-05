import { getAllResearchPosts } from "@/lib/research";
import { getAllTags } from "@/lib/tags";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { IconTag, IconBrain, IconCode, IconNetwork } from "@tabler/icons-react";

const iconMap = {
  code: IconCode,
  brain: IconBrain,
  network: IconNetwork,
  tag: IconTag
} as const;

export default async function TagsPage() {
  const posts = getAllResearchPosts();
  const tags = getAllTags(posts);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">タグ一覧</h1>
        <Badge variant="secondary" className="text-lg">AI生成コンテンツ</Badge>
      </div>
      <p className="text-xl text-muted-foreground mb-8">
        研究記事のタグ別インデックス
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => {
          const IconComponent = tag.icon ? iconMap[tag.icon as keyof typeof iconMap] : IconTag;

          return (
            <Link key={tag.name} href={`/research/tags/${encodeURIComponent(tag.name)}`}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-6 h-6 text-primary" />
                    <CardTitle>{tag.name}</CardTitle>
                    <Badge variant="secondary">{tag.posts.length}</Badge>
                  </div>
                  {tag.description && (
                    <CardDescription>{tag.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    最新の記事:
                    {tag.posts.slice(0, 2).map((post) => (
                      <div key={post.slug} className="mt-2 hover:text-primary">
                        {post.title}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
