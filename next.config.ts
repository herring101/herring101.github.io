import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      [remarkGfm, { stringLength: true }],
      remarkMath
    ],
    rehypePlugins: [
      rehypeKatex
    ],
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
      jsx: true,
      development: process.env.NODE_ENV === 'development',
      providerImportSource: "@mdx-js/react",
    },
  },
});

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '',
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
