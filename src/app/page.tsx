'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, HTMLMotionProps } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { IconBrain, IconRobot, IconCode } from "@tabler/icons-react";
import { FC } from "react";

type MotionDivProps = HTMLMotionProps<"div">;
type MotionSectionProps = HTMLMotionProps<"section">;

const MotionDiv: FC<MotionDivProps> = motion("div");
const MotionSection: FC<MotionSectionProps> = motion("section");

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      <MotionSection 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mx-auto flex max-w-[980px] flex-col items-center gap-8 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20"
      >
        <motion.h1 
          className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          探求する知能、<motion.span 

            className="text-primary"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >人間らしさ</motion.span>の本質を追い求めて
        </motion.h1>
        <motion.p 
          className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          人間らしく振舞う知能を実現し、人間とは何かという根源的な問いに挑戦し続けています。
        </motion.p>
        <MotionDiv 
          className="flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            size="lg" 
            asChild
            className="hover:scale-105 transition-transform"
          >
            <a href="/projects">プロジェクトを見る</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            asChild
            className="hover:scale-105 transition-transform"
          >
            <a href="/about">私について</a>
          </Button>
        </MotionDiv>
      </MotionSection>
      <MotionSection 
        ref={ref}
        variants={container}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl mx-auto px-4"
      >
        <MotionDiv variants={item}>
          <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <IconBrain className="w-6 h-6 text-primary" />
                <CardTitle>研究と探求</CardTitle>
              </div>
              <CardDescription>人工知能と人間知能の研究</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">人間らしい知能の実現に向けて、認知科学と人工知能の境界を探求しています。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="hover:scale-105 transition-transform">AI</Badge>
                <Badge className="hover:scale-105 transition-transform">認知科学</Badge>
                <Badge className="hover:scale-105 transition-transform">人間知能</Badge>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv variants={item}>
          <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <IconRobot className="w-6 h-6 text-primary" />
                <CardTitle>実験とプロトタイプ</CardTitle>
              </div>
              <CardDescription>アイデアの実装と検証</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">理論を実践に移すため、様々な実験的なウェブアプリケーションを開発しています。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="hover:scale-105 transition-transform">実験</Badge>
                <Badge className="hover:scale-105 transition-transform">プロトタイプ</Badge>
                <Badge className="hover:scale-105 transition-transform">Web開発</Badge>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv variants={item}>
          <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <IconCode className="w-6 h-6 text-primary" />
                <CardTitle>対話と共有</CardTitle>
              </div>
              <CardDescription>知見の共有とディスカッション</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">ポッドキャストや記事を通じて、研究の成果や考察を広く共有しています。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="hover:scale-105 transition-transform">ポッドキャスト</Badge>
                <Badge className="hover:scale-105 transition-transform">ブログ</Badge>
                <Badge className="hover:scale-105 transition-transform">コミュニティ</Badge>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv variants={item}>
          <Card className="hover:shadow-lg transition-shadow duration-300 h-full border-primary/20">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <IconBrain className="w-6 h-6 text-primary" />
                <CardTitle>AI生成リサーチ</CardTitle>
                <Badge variant="secondary" className="ml-2">AI生成</Badge>
              </div>
              <CardDescription>OpenAI DeepResearchによる解析と考察</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">最新のAI技術を活用して生成された、深い洞察と分析を含む研究記事コレクション。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge className="hover:scale-105 transition-transform">OpenAI</Badge>
                <Badge className="hover:scale-105 transition-transform">DeepResearch</Badge>
                <Badge className="hover:scale-105 transition-transform">AI分析</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <a href="/research">AI生成記事を読む</a>
              </Button>
            </CardContent>
          </Card>
        </MotionDiv>
      </MotionSection>
    </div>
  );
}
