export const guideLinks = [
  { text: 'Introduction', link: '/guides/introduction' },
  { text: 'Quickstart', link: '/guides/quickstart' },
  { text: 'Working with the File System', link: '/guides/working-with-the-file-system' },
  { text: 'Running Processes', link: '/guides/running-processes' },
  { text: 'Configuring Headers', link: '/guides/configuring-headers' },
  { text: 'Troubleshooting', link: '/guides/troubleshooting'},
  { text: 'Browser Support', link: '/guides/browser-support' },
  { text: 'Browser Configuration', link: '/guides/browser-config' },
  { text: 'Community Inspirations', link: '/guides/community-inspirations' },
];

export const tutorialLinks = [
  { text: '1. Build your first WebContainer app', link: '/tutorial/1-build-your-first-webcontainer-app' },
  { text: '2. Setting up WebContainers', link: '/tutorial/2-setting-up-webcontainers' },
  { text: '3. Installing dependencies', link: '/tutorial/3-installing-dependencies' },
  { text: '4. Running dev server', link: '/tutorial/4-running-dev-server' },
  { text: '5. Editing & saving a file', link: '/tutorial/5-editing-a-file-updating-the-iframe' },
];

export const homeExternalLinks = [
  {
    title: 'Community',
    description:
      'Join our supportive community on Discord, ask questions, and share your StackBlitz projects.',
    url: 'https://discord.com/invite/EQ7uJQxC',
    large: true,
    bgImgLight: '/img/theme/link-bg-squares-light.png',
    bgImgDark: '/img/theme/link-bg-squares-dark.png',
  },
];

export interface WCUsedBy {
  name: string;
  imgDark: string;
  imgLight: string;
}

export const wcUsedBy: WCUsedBy[] = [
  {
    name: 'StackBlitz',
    imgDark: '/img/logos/stackblitz-dark.svg',
    imgLight: '/img/logos/stackblitz-light.svg',
  },
  {
    name: 'Google',
    imgDark: '/img/logos/google-dark.svg',
    imgLight: '/img/logos/google-light.svg',
  },
  {
    name: 'Cloudflare',
    imgDark: '/img/logos/cloudflare-dark.svg',
    imgLight: '/img/logos/cloudflare-light.svg',
  },
  {
    name: 'Shopify',
    imgDark: '/img/logos/shopify-dark.svg',
    imgLight: '/img/logos/shopify-light.svg',
  },
  {
    name: 'Egghead',
    imgDark: '/img/logos/egghead-dark.svg',
    imgLight: '/img/logos/egghead-light.svg',
  },
]

export interface FeaturesCardData {
  title: string;
  description: string;
  bgImgDark: string;
  bgImgLight: string;
}

export const featuresCardData: FeaturesCardData[] = [
  {
    title: 'Run native package managers',
    description: 'Run the native versions of <code>npm</code>, <code>pnpm</code>, and <code>yarn</code>, all in the browser, all in your app, up to 10x faster than local.',
    bgImgDark: '/img/features/features-01-package_managers-dark.png',
    bgImgLight: '/img/features/features-01-package_managers-light.png',
  },
  {
    title: 'Full browser support',
    description: `Run WebContainer in all major browsers, from Chromium-based, to Firefox or Safari TP.`,
    bgImgDark: '/img/features/features-02-browsers-dark.png',
    bgImgLight: '/img/features/features-02-browsers-light.png',
  },
  {
    title: 'All major frameworks',
    description: 'Instantly spin up disposable environments running any major modern framework.',
    bgImgDark: '/img/features/features-03-frameworks-dark.png',
    bgImgLight: '/img/features/features-03-frameworks-light.png',

  },
  {
    title: 'Run Wasm out of the box',
    description: 'Port your favorite language or framework to Wasm to run it in WebContainers. Yes, really.',
    bgImgDark: '/img/features/features-04-webassembly-dark.png',
    bgImgLight: '/img/features/features-04-webassembly-light.png',
  },
];

export interface ProjectsUsingWCCardData {
  title: string;
  description: string;
  url?: string;
  urlTitle?: string;
  imgPath: {
    dark: string;
    light: string;
  };
}

export const projectsUsingWCCardData: ProjectsUsingWCCardData[] = [
  {
    title: 'Interactive tutorials',
    description: `Learn SvelteKit, a full stack framework, within their custom editor, running on WebContainers, all in the browser.`,
    url: 'https://learn.svelte.dev/tutorial/introducing-sveltekit',
    urlTitle: 'learn.svelte.dev',
    imgPath: {
      dark: `/img/svelte-screen-dark.png`,
      light: `/img/svelte-screen-light.png`,
    },
  },
  {
    title: 'Low code / no code',
    description: `A stress-free editor enabling non-technical contributors to make their own PRs with a live, disposable preview to confirm an error-free build.`,
    url: 'https://developer.stackblitz.com/codeflow/integrating-web-publisher#what-is-web-publisher',
    urlTitle: 'Web Publisher by StackBlitz',
    imgPath: {
      dark: `/img/web_publisher-screen-dark.png`,
      light: `/img/web_publisher-screen-light.png`,
    },
  },
  {
    title: 'AI applications',
    description: `re:tune is setting the stage for AI-native IDEs - with a copilot that can understand and operate in the full runtime context across server and client.`,
    url: 'https://retune.so/',
    urlTitle: 'retune.so',
    imgPath: {
      dark: `/img/retune-screen.png`,
      light: `/img/retune-screen.png`,
    },
  },
];

export interface TestimonialCardData {
  author: {
    name: string;
    title?: string;
  };
  imgPath?: {
    author?: string;
    logo?: string;
    logoDark?: string;
    logoLight?: string;
  };
  quote: string;
}

export const testimonialCardData: TestimonialCardData[] = [
  {
    author: {
      name: 'Rich Harris',
      title: 'Principal Software Engineer, Vercel',
    },
    imgPath: {
      author: '/img/testimonials/rich_harris.jpg',
      logo: '/img/theme/sveltekit-light.svg',
    },
    quote: `On the SvelteKit team, we've fantasized for years about being able to build fully interactive learning material for full stack frameworks.<strong><br/>With WebContainers it went from 'impossible' to 'easy' almost overnight.</strong>`,
  },
  {
    author: {
      name: 'Vojta Holik',
      title: 'Designer & Developer, Egghead.io',
    },
    imgPath: {
      author: '/img/testimonials/vojta_holik.png',
      logoDark: '/img/logos/egghead-dark.svg',
      logoLight: '/img/logos/egghead-light.svg',
    },
    quote: `<strong>As a team working on educational products, StackBlitz WebContainers has been an invaluable tool for us.</strong> The ability to embed full-stack applications with customisable, interactive coding environment directly into our products has greatly enhanced the learning experience for our users.`,
  },
  {
    author: {
      name: 'swyx',
      title: '',
    },
    imgPath: {
      author: '/img/testimonials/swyx_shawn_wang.jpg',
    },
    quote: `WebContainers solve the final frontier in JavaScript developer experience - making full-stack Node.js projects run in the browser as lightweight and disposable and secure as frontend REPLs. <br/><strong>Every PR, every npm library maintainer, every devtool company with a Node.js SDK, can benefit from this!</strong>`,
  },
  {
    author: {
      name: 'Abdellah Alaoui',
      title: 'Fullstack hacker, Scrimba',
    },
    imgPath: {
      author: '/img/testimonials/abdellah_alaoui.png',
      logo: '/img/testimonials/scrimba.svg',
    },
    quote: `I have worked with Web container API for a couple of weeks at Scrimba to make a pooc of backend support. And I can say it's a solid piece of technology. Things just work, and it's also quite fast. <strong>I'm super excited about the GA since it will unlock so much opportunities for OSS projects and the industry at large.</strong>`,
  },
  {
    author: {
      name: 'Atila Fassina',
      title: 'DX Engineer at Xata',
    },
    imgPath: {
      author: '/img/testimonials/atila_fassina.png',
      logoDark: '/img/testimonials/xata.png',
      logoLight: '/img/testimonials/xata.png',
    },
    quote: `<strong>The WebContainer API is a landmark on the way we think docs.</strong> Creating interactive docs and snippets just became so much more feasible! With Server-side code running on the browser, setting up a playground to securely learn Node.js SDKs and compilers  became feasible and even fun!`,
  },
  {
    author: {
      name: 'Nate Moore',
      title: 'Senior Software Engineer, The Astro Technology Company',
    },
    imgPath: {
      author: '/img/testimonials/nate_moore.jpg',
      logo: '/img/testimonials/astro-full-light.svg',
    },
    quote: `<strong>WebContainers represent a fundamental shift in what is possible in the browser. I'm incredibly excited about the potential this tech unlocks,</strong> from secure, browser-based development environments to highly interactive educational content. `,
  },
  {
    author: {
      name: 'Dan Jutan',
      title: 'Technical writer and frontend developer',
    },
    imgPath: {
      author: '/img/testimonials/dan_jutan.jpg',
    },
    quote: `The WebContainers API lets you use the magic behind Stackblitz to power your own experiments. <br/><strong>A huge step forward for dev education, documentation, and demos!</strong>`,
  },
  {
    author: {
      name: 'Ramón Huidobro',
      title: 'Developer Advocate at Suborbital Software Systems',
    },
    imgPath: {
      author: '/img/testimonials/ramon_huidobro.png',
      logoDark: '/img/testimonials/suborbital.svg',
      logoLight: '/img/testimonials/suborbital.svg',
    },
    quote: `For such a powerful piece of tech I was so impressed by how clear to use the API is. Also running WebContainers inside WebContainers had me 🤯`,
  },
  {
    author: {
      name: 'DJ',
      title: 'Founder & CEO @ <a href="https://retune.so/" target="_blank" rel="nofollow">re:tune</a>',
    },
    imgPath: {
      author: '/img/testimonials/retune-dj.jpg',
      logoDark: '/img/testimonials/retune.png',
      logoLight: '/img/testimonials/retune.png',
    },
    quote: `At re:tune, we have been building the missing frontend for GPT-3, on a mission to empower everyone to build AI-first software at the speed of thought. <strong>WebContainers set the stage for our AI-native IDE</strong> - with a copilot that can not only read and write code, but can also understand and operate in the full runtime context across server and client!`,
  },
  {
    author: {
      name: 'Manus Nijhoff',
      title: 'Co-founder at <a href="https://touchystudios.com/" target="_blank" rel="nofollow">Touchy Studios</a> & full-stack developer at <a href="https://100k.studio/" target="_blank" rel="nofollow">100k</a>',
    },
    imgPath: {
      author: '/img/testimonials/manus_nijhoff.png',
    },
    quote: `Running chess in a terminal, running a terminal in the browser, check mate!<br/><strong>The best position to be in is a creative one and the StackBlitz WebContainers allow that.</strong>`,
  },
];

export type CommunityProjectCategory = 'ai'|'game'|'ide'|'lowCode'|'tutorial';
// export type CommunityProjectDescriptionType = 'image'|'text'|'video';

// export interface CommunityProjectDescriptionItem {
//   type: CommunityProjectDescriptionType;
//   content: string;
//   itemUrl?: string;
//   thumbnailUrl?: string;
// }

export interface CommunityProjectCardData {
  category: CommunityProjectCategory;
  description: string;
  title: string;
  itemUrl: string;
  thumbnailUrl: string;
}

export const communityProjectCardData: CommunityProjectCardData[] = [
  {
    category: 'tutorial',
    title: 'SvelteKit',
    description: 'A full educational experience of learning Svelte in the browser.',
    itemUrl: 'https://learn.svelte.dev/tutorial/welcome-to-svelte',
    thumbnailUrl: '/img/svelte-screen-light.png',
  },
  {
    category: 'ide',
    title: 'Codeflow',
    description: 'Codeflow IDE</a> is a full-featured version of the desktop Visual Studio Code IDE supporting git commands, desktop extensions and a Node.js development server with terminal.',
    itemUrl: 'https://developers.stackblitz.com/codeflow',
    thumbnailUrl: '/img/community/codeflow.png',
  },
  {
    category: 'ai',
    title: 're:tune',
    description: `The missing frontend for GPT-3, on a mission to empower everyone to build AI-first software at the speed of thought.`,
    itemUrl: 'https://retune.so/',
    thumbnailUrl: '/img/community/re_tune.png',
  },
  {
    category: 'game',
    title: 'schachnovelle',
    description: `A command line chess game written in Node.js.`,
    itemUrl: 'https://www.npmjs.com/package/schachnovelle',
    thumbnailUrl: '/img/community/chess.png',
  },
  {
    category: 'lowCode',
    title: 'Web Publisher',
    description: `A publishing tool that makes editing docs or blogs pleasant thanks to a realtime preview of the changes.`,
    itemUrl: 'https://stackblitz.com/~/github.com/stackblitz/webcontainer-docs/edit/main/docs/guides/community-inspirations.md?initialPath=%2Fguides%2Fcommunity-inspirations',
    thumbnailUrl: '/img/community/web_publisher.png',
  },
  {
    category: 'tutorial',
    title: `Tech Educator's Toolkit`,
    description: `Tech Educator's Toolkit is an early exploration of WebContainer API and of a new way to write interactive tutorials.`,
    itemUrl: 'https://www.youtube.com/watch?v=R-1y3Ti3ng4',
    thumbnailUrl: '/img/community/dan_jutan_talk.png',
  }
];

// export type CommunityProjectCategory = 'ai'|'game'|'ide'|'lowCode'|'tutorial';
// export type CommunityProjectDescriptionType = 'image'|'text'|'video';

// export interface CommunityProjectDescriptionItem {
//   type: CommunityProjectDescriptionType;
//   content: string;
//   itemUrl?: string;
//   thumbnailUrl?: string;
// }

// export interface CommunityProject {
//   category: CommunityProjectCategory;
//   descriptionItems: CommunityProjectDescriptionItem[];
//   title: string;
// }

// export const communityProjects: CommunityProject[] = [
//   {
//     category: 'tutorial',
//     title: 'SvelteKit',
//     descriptionItems: [
//       {
//         type: 'text',
//         content: 'A full educational experience of learning Svelte in the browser. <a href="https://learn.svelte.dev/tutorial/welcome-to-svelte" target="_blank" rel="nofollow">Try it yourself!</a>',
//         itemUrl: 'https://learn.svelte.dev/tutorial/welcome-to-svelte',
//         thumbnailUrl: '/img/svelte-screen-light.png',
//       },
//       {
//         type: 'video',
//         content: 'Curious why Svelte decided to go full-in with WebContainers? Hear <a href="https://twitter.com/Rich_Harris" target="_blank" rel="nofollow">Rich Harris</a> explain it in his talk <a href="https://www.youtube.com/watch?v=RwBolXX9Pis&t=578s" target="_blank" rel="nofollow">"Fullstack Documentation"</a> delivered at JSNation 2022:',
//         itemUrl: 'https://www.youtube.com/watch?v=RwBolXX9Pis&t=578s',
//         thumbnailUrl: '/img/community/rich_harris_talk.png',
//       },
//     ],
//   },
//   {
//     category: 'ide',
//     title: 'Codeflow',
//     descriptionItems: [
//       {
//         type: 'image',
//         content: '<a href="https://developers.stackblitz.com/codeflow" target="_blank" rel="nofollow">Codeflow IDE</a> is a full-featured version of the desktop Visual Studio Code IDE supporting git commands, desktop extensions and a Node.js development server with terminal. This docs site was built entirely in <a href="https://developers.stackblitz.com/codeflow" target="_blank" rel="nofollow">Codeflow IDE</a>.',
//         itemUrl: 'https://developers.stackblitz.com/codeflow',
//         thumbnailUrl: '/img/community/codeflow.png',
//       },
//       {
//         type: 'video',
//         content: `Here's a Keynote from <a href="https://twitter.com/ericsimons40" target="_blank" rel="nofollow">Eric Simons</a>, the CEO of StackBlitz, <a href="https://www.youtube.com/watch?v=Ea1zJD5uQRg" target="_blank" rel="nofollow">announcing Codeflow</a> at ViteConf 2022:`,
//         itemUrl: 'https://www.youtube.com/watch?v=Ea1zJD5uQRg',
//         thumbnailUrl: '/img/community/eric_simons_talk.png',
//       },
//       {
//         type: 'text',
//         content: `Read more about StackBlitz and Codeflow in this Newstack article: <a href="https://thenewstack.io/stackblitz-launches-codeflow-and-announces-figma-investment/" target="_blank" rel="nofollow">"StackBlitz Launches Codeflow and Announces Figma Investment"</a>`,
//       },
//     ],    
//   },
//   {
//     category: 'ai',
//     title: 're:tune',
//     descriptionItems: [
//       {
//         type: 'image',
//         content: `The missing frontend for GPT-3, on a mission to empower everyone to build AI-first software at the speed of thought. <a href="https://retune.so/" target="_blank" rel="nofollow">re:tune</a> is on a mission to set the stage for AI-native IDEs - building GPT-3 powered apps, without writing any code.`,
//         itemUrl: 'https://retune.so/',
//         thumbnailUrl: '/img/community/re_tune.png',

//       },
//     ],
//   },
//   {
//     category: 'game',
//     title: 'schachnovelle',
//     descriptionItems: [
//       {
//         type: 'image',
//         content: `A command line chess game written in Node.js. <a href="https://gitlab.com/manegame/schachnovelle" target="_blank" rel="nofollow">Explore it yourself!</a><br/>As Manus Nijhoff, the author of this chess game, puts it, “If you've got nothing better to do than waste time in the terminal, StackBlitz is there with you!”`,
//         itemUrl: 'https://www.npmjs.com/package/schachnovelle',
//         thumbnailUrl: '/img/community/chess.png',
//       },
//     ],
//   },
//   {
//     category: 'lowCode',
//     title: 'Web Publisher',
//     descriptionItems: [
//       {
//         type: 'image',
//         content: `A publishing tool that makes editing docs or blogs pleasant thanks to a realtime preview of the changes. In fact, you can try it yourself by <a href="https://stackblitz.com/~/github.com/stackblitz/webcontainer-docs/edit/main/docs/guides/community-inspirations.md?initialPath=%2Fguides%2Fcommunity-inspirations" target="_blank" rel="nofollow">editing this page!</a>`,
//         itemUrl: 'https://stackblitz.com/~/github.com/stackblitz/webcontainer-docs/edit/main/docs/guides/community-inspirations.md?initialPath=%2Fguides%2Fcommunity-inspirations',
//         thumbnailUrl: '/img/community/web_publisher.png',
//       },
//       {
//         type: 'video',
//         content: `Here's a talk from 2022 Next.js Conf by <a href="https://twitter.com/sylwiavargas" target="_blank" rel="nofollow">Sylwia Vargas</a>, a Developer Advocate at StackBlitz, about <a href="http://localhost:5173/guides/www.youtube.com/watch?v=B4rqK-o1QZw" target="_blank" rel="nofollow">making your docs editing experience easier</a> at ViteConf 2022:`,
//         itemUrl: 'https://www.youtube.com/watch?v=B4rqK-o1QZw',
//         thumbnailUrl: '/img/community/sylwia_vargas_talk.png',
//       },
//     ],
//   },
//   {
//     category: 'tutorial',
//     title: `Tech Educator's Toolkit`,
//     descriptionItems: [
//       {
//         type: 'image',
//         content: `Tech Educator's Toolkit is an early exploration of WebContainer API and of a new way to write interactive tutorials. Watch this talk from <a href="https://twitter.com/jutanium" target="_blank" rel="nofollow">Dan Jutan</a> from ViteConf 2022 to see it in action:`,
//         itemUrl: 'https://www.youtube.com/watch?v=R-1y3Ti3ng4',
//         thumbnailUrl: '/img/community/dan_jutan_talk.png',
//       },
//     ],
//   },
// ];

export const footerSections = [
  {
    title: 'Workspaces',
    items: [
      { text: 'Popular', link: 'https://stackblitz.com/?starters=popular' },
      { text: 'Frontend', link: 'https://stackblitz.com/?starters=frontend' },
      { text: 'Backend', link: 'https://stackblitz.com/?starters=backend' },
      { text: 'Fullstack', link: 'https://stackblitz.com/?starters=fullstack' },
      { text: 'Vite', link: 'https://stackblitz.com/?starters=vite' },
      { text: 'Docs, Blogs & Slides', link: 'https://stackblitz.com/?starters=docs' },
      { text: 'Vanilla', link: 'https://stackblitz.com/?starters=vanilla' },
    ],
  },
  {
    title: 'Start a new Project',
    items: [
      { text: 'From a Workspace', link: 'https://stackblitz.com/?starters=popular' },
      {
        text: 'From a GitHub Repo',
        link: 'https://developer.stackblitz.com/guides/user-guide/importing-projects#import-from-github',
      },
      {
        text: 'From your computer',
        link: 'https://developer.stackblitz.com/guides/user-guide/importing-projects#upload-from-your-computer',
      },
    ],
  },
  {
    title: 'Product',
    items: [
      { text: 'Docs', link: 'https://developer.stackblitz.com/' },
      { text: 'Enterprise', link: 'https://stackblitz.com/enterprise' },
      { text: 'Pricing', link: 'https://stackblitz.com/membership' },
      { text: 'Case Studies', link: 'https://stackblitz.com/case-studies/google' },
    ],
  },
  {
    title: 'Company',
    items: [
      { text: 'Blog', link: 'https://blog.stackblitz.com/' },
      { text: 'Careers', link: 'https://stackblitz.com/careers' },
      { text: 'Community', link: 'https://discord.gg/stackblitz' },
      { text: 'Enterprise Sales', link: 'https://stackblitz.com/enterprise-contact' },
      { text: 'Privacy', link: 'https://stackblitz.com/privacy-policy' },
      { text: 'Terms of Service', link: 'https://stackblitz.com/terms-of-service' },
    ],
  },
  {
    title: 'Connect',
    items: [
      { text: 'GitHub', link: 'https://github.com/stackblitz/' },
      { text: 'Twitter', link: 'https://twitter.com/stackblitz' },
      { text: 'Discord', link: 'https://discord.gg/stackblitz' },
    ],
  },
];
