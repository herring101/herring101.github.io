import { IconSource } from "@/components/ui/tag-icon";
import { ResearchPost } from "./research";

export interface Tag {
  name: string;
  icon?: IconSource;
  description?: string;
}

export interface TagWithPosts extends Tag {
  posts: ResearchPost[];
}

// タグのメタデータを定義（オプショナル）
export const tagMetadata: Record<string, Omit<Tag, "name">> = {
  "量子プログラミング": {
    icon: { type: "lucide", name: "cpu" },
    description: "量子コンピュータのプログラミングに関する話題"
  },
  "OpenAI": {
    icon: { type: "tabler", name: "Brain" },
    description: "OpenAIの技術や研究に関する話題"
  },
  "Deep Learning": {
    icon: { type: "lucide", name: "network" },
    description: "深層学習に関する話題"
  },
  "実験": {
    icon: { type: "emoji", symbol: "🧪" },
    description: "実験的な取り組みに関する話題"
  },
  "Computer Vision": {
    icon: { type: "lucide", name: "eye" },
    description: "コンピュータビジョンに関する話題"
  }
  // 他のタグは自動的に生成されます
};

export function getAllTags(posts: ResearchPost[]): TagWithPosts[] {
  const tagMap = new Map<string, ResearchPost[]>();
  
  // 全ての記事からタグを収集
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, []);
      }
      tagMap.get(tag)?.push(post);
    });
  });

  // タグとそれに関連する記事のリストを作成
  return Array.from(tagMap.entries()).map(([name, posts]) => ({
    name,
    posts,
    ...(tagMetadata[name] || {})
  }));
}
