export type CardLinkType = 'article'|'podcast'|'repositoryGithub'|'video';

export type CommunityProjectCategory = 'ai'|'game'|'ide'|'lowCode'|'tutorial';
export type CommunityProjectCategories = { [project in CommunityProjectCategory]: {
  rgb: string;
  title: string;
  titlePlural?: string;
}};

export const communityProjectCategories: CommunityProjectCategories = {
  ai: {
    rgb: '255, 140, 0',
    title: 'AI',
  },
  game: {
    rgb: '188, 94, 255',
    title: 'Game',
    titlePlural: 'Games',
  },
  ide: {
    rgb: '31, 143, 255',
    title: 'Browser IDE',
    titlePlural: 'Browser IDEs',
  },
  lowCode: {
    rgb: '255, 9, 255',
    title: 'Low-Code',
  },
  tutorial: {
    rgb: '0, 188, 185',
    title: 'Tutorial',
    titlePlural: 'Tutorials',
  },
};

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
    itemUrl: '/community-projects/sveltekit',
    thumbnailUrl: '/img/svelte-screen-light.png',
  },
  {
    category: 'ide',
    title: 'Codeflow',
    description: 'Codeflow IDE</a> is a full-featured version of the desktop Visual Studio Code IDE supporting git commands, desktop extensions and a Node.js development server with terminal.',
    itemUrl: '/community-projects/stackblitz-codeflow',
    thumbnailUrl: '/img/community/codeflow.png',
  },
  {
    category: 'ai',
    title: 're:tune',
    description: `The missing frontend for GPT-3, on a mission to empower everyone to build AI-first software at the speed of thought.`,
    itemUrl: '/community-projects/retune',
    thumbnailUrl: '/img/community/re_tune.png',
  },
  {
    category: 'game',
    title: 'schachnovelle',
    description: `A command line chess game written in Node.js.`,
    itemUrl: '/community-projects/schachnovelle',
    thumbnailUrl: '/img/community/chess.png',
  },
  {
    category: 'lowCode',
    title: 'Web Publisher',
    description: `A publishing tool which makes editing docs, blogs and other markdown-driven projects more pleasant for developers, and inviting for non-developers.`,
    itemUrl: '/community-projects/stackblitz-web-publisher',
    thumbnailUrl: '/img/community/web_publisher.png',
  },
  {
    category: 'tutorial',
    title: `Tech Educator's Toolkit`,
    description: `Tech Educator's Toolkit is an early exploration of WebContainer API and of a new way to write interactive tutorials.`,
    itemUrl: '/community-projects/tech-educators-toolkit',
    thumbnailUrl: '/img/community/dan_jutan_talk.png',
  }
];
