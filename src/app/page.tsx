import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <section className="mx-auto flex max-w-[980px] flex-col items-center gap-8 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
        <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">探求する知能、<span className="text-primary">人間らしさ</span>の本質を追い求めて</h1>
        <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
          人間らしく振舞う知能を実現し、人間とは何かという根源的な問いに挑戦し続けています。
        </p>
        <div className="flex gap-4">
          <Button size="lg" asChild>
            <a href="/projects">プロジェクトを見る</a>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="/about">私について</a>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>研究と探求</CardTitle>
            <CardDescription>人工知能と人間知能の研究</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">人間らしい知能の実現に向けて、認知科学と人工知能の境界を探求しています。</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>AI</Badge>
              <Badge>認知科学</Badge>
              <Badge>人間知能</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>実験とプロトタイプ</CardTitle>
            <CardDescription>アイデアの実装と検証</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">理論を実践に移すため、様々な実験的なウェブアプリケーションを開発しています。</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>実験</Badge>
              <Badge>プロトタイプ</Badge>
              <Badge>Web開発</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>対話と共有</CardTitle>
            <CardDescription>知見の共有とディスカッション</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">ポッドキャストや記事を通じて、研究の成果や考察を広く共有しています。</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>ポッドキャスト</Badge>
              <Badge>ブログ</Badge>
              <Badge>コミュニティ</Badge>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
