import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAllResearchPosts } from "@/lib/research";
import Link from "next/link";

export default async function ResearchPage() {
  const posts = getAllResearchPosts();

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">AI生成リサーチ記事</h1>
        <Badge variant="secondary" className="text-lg">AI生成コンテンツ</Badge>
      </div>
      <p className="text-xl text-muted-foreground mb-8">OpenAI DeepResearchを活用して生成された、深い洞察と分析を含む研究記事コレクション</p>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
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
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
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
