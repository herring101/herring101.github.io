import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ResearchPost {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  slug: string;
  content: string;
}

const researchDirectory = path.join(process.cwd(), 'src/content/research');

export function getAllResearchPosts(): ResearchPost[] {
  const fileNames = fs.readdirSync(researchDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(researchDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as Omit<ResearchPost, 'slug' | 'content'>),
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getResearchPost(slug: string): ResearchPost | null {
  try {
    const fullPath = path.join(researchDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      content,
      ...(data as Omit<ResearchPost, 'slug' | 'content'>),
    };
  } catch {
    return null;
  }
}
