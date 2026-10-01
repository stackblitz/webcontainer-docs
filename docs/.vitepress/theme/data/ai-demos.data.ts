import { createContentLoader } from 'vitepress';

export interface AiDemo {
  url: string;
  title: string;
  description?: string;
}

declare const data: AiDemo[];
export { data };

// Each demo is a page at `docs/ai/demos/<demo-name>.md` (listed by its frontmatter `order`) with its code in
// `components/AiDemos/<DemoName>/`; pages are picked up automatically, so no shared file needs editing.
export default createContentLoader('ai/demos/*.md', {
  transform(pages): AiDemo[] {
    return pages
      .sort((a, b) => (a.frontmatter.order ?? Infinity) - (b.frontmatter.order ?? Infinity))
      .map(({ url, frontmatter }) => ({
        url,
        title: frontmatter.title ?? url,
        description: frontmatter.description,
      }));
  },
});
