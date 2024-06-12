import dotenv from 'dotenv';
import mdFootnote from 'markdown-it-footnote';
import { defineConfig, type HeadConfig } from 'vitepress';
import * as links from './theme/data/links';
// @ts-check
/** @type {import('vitepress').UserConfig} */

dotenv.config();

const SIDEBAR_DEFAULT = [
  {
    text: 'Guides',
    collapsible: true,
    collapsed: false,
    items: links.guideLinks,
  },
  {
    text: 'Tutorial',
    collapsible: true,
    collapsed: false,
    items: links.tutorialLinks,
  },
  {
    items: [{ text: 'API Reference', link: '/api' }],
  },
  {
    items: [{ text: 'Changelog', link: '/changelog' }],
  },
  {
    items: [{ text: 'Commercial Usage', link: '/enterprise' }],
  },
  {
    text: 'Community Projects',
    collapsible: true,
    collapsed: true,
    items: links.communityProjectsLinks,
  },
  {
    items: [{ text: 'Contact', link: '/contact' }],
  },
];

export default defineConfig({
  // add CORS headers for WebContainer to run
  vite: {
    plugins: [
      {
        name: "cross-origin-isolated-plugin",
        configureServer: (server) => {
          server.middlewares.use((_, res, next) => {
            res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
            res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
            next();
          });
        },
      },
    ],
  },
  
  srcDir: '.',
  outDir: 'build',

  // Generate files as `/path/to/page.html` and URLs as `/path/to/page`
  cleanUrls: 'without-subfolders',

  // Prevent builds when content has dead links
  ignoreDeadLinks: true,

  // Metadata
  lang: 'en-US',
  title: 'WebContainers',
  description:
    'Build the future of web based coding experiences, from interactive tutorials to instant production-ready dev environments.',
  head: getHeadTags(process.env),
  // See docs: https://vitepress.vuejs.org/guides/theme-nav
  
  // Sitemap
  lastUpdated: true,
  sitemap: {
    hostname: 'https://webcontainers.io'
  },

  // Theme
  themeConfig: {
    siteTitle: false,
    logo: {
      light: '/img/theme/webcontainer_api-logo-light-blackwhite.svg',
      dark: '/img/theme/webcontainer_api-logo-dark-blackwhite.svg',
    },
    nav: [
      { text: 'Guides', link: '/guides/introduction' },
      { text: 'Tutorial', link: '/tutorial/1-build-your-first-webcontainer-app' },
      { text: 'API Reference', link: '/api' },
      { text: 'AI', link: '/ai' },
      { text: 'Pricing', link: '/enterprise' },
    ],
    sidebar: {
      '/guides/': SIDEBAR_DEFAULT,
      '/tutorial/': SIDEBAR_DEFAULT,
      '/api': SIDEBAR_DEFAULT,
      '/changelog': SIDEBAR_DEFAULT,
      '/enterprise': SIDEBAR_DEFAULT,
      '/contact': SIDEBAR_DEFAULT,
      '/community-projects': SIDEBAR_DEFAULT,
    },
    editLink: {
      pattern: 'https://pr.new/stackblitz/webcontainer-docs/edit/main/docs/:path',
      text: 'Edit this page',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/stackblitz/' },
      { icon: 'twitter', link: 'https://twitter.com/stackblitz' },
      { icon: 'discord', link: 'https://discord.gg/stackblitz' }
    ],
    search: {
      provider: 'algolia',
      options: getAlgoliaConfig(process.env),
    },
  },

  markdown: {
    config: (md) => {
      md.use(mdFootnote);
    },
  },
});

function getHeadTags(env: NodeJS.ProcessEnv): HeadConfig[] {
  const tags: HeadConfig[] = [
    ['link', { rel: 'icon', type: 'image/png', href: '/img/theme/favicon.png' }],
    ['link', { rel: 'icon', type: 'image/svg', href: '/img/theme/favicon.svg' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'WebContainer API Docs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'WebContainer API Docs' }],
    ['meta', { name: 'twitter:site', content: '@StackBlitz' }],
  ];

  if (env.VITE_GTM_ID) {
    tags.push(['script', { src: `https://www.googletagmanager.com/gtag/js?id=${env.VITE_GTM_ID}`, async: '' }]);
    tags.push([
      'script',
      {},
      `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag('js',new Date),gtag('config','${env.VITE_GTM_ID}',{anonymize_ip:true})`,
    ]);
  }

  return tags;
}

function getAlgoliaConfig(env: NodeJS.ProcessEnv) {
  if (env.VITE_ALGOLIA_ID && env.VITE_ALGOLIA_KEY) {
    return {
      indexName: 'webcontainers',
      appId: env.VITE_ALGOLIA_ID,
      apiKey: env.VITE_ALGOLIA_KEY,
    };
  }
  return {
    indexName: '',
    appId: '',
    apiKey: '',
  };
}
