type IconType = "code" | "brain" | "network" | "tag";
import { ResearchPost } from "./research";

export interface Tag {
  name: string;
  icon?: IconType;
  description?: string;
}

export interface TagWithPosts extends Tag {
  posts: ResearchPost[];
}

// タグのメタデータを定義（オプショナル）
export const tagMetadata: Record<string, Omit<Tag, "name">> = {
  "量子プログラミング": {
    icon: "code",
    description: "量子コンピュータのプログラミングに関する話題"
  },
  "OpenAI": {
    icon: "brain",
    description: "OpenAIの技術や研究に関する話題"
  },
  "Deep Learning": {
    icon: "network",
    description: "深層学習に関する話題"
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
