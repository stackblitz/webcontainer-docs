export interface Person {
  name: string;
  href: string;
  hrefAlias?: string;
  imgPath?: string;
  title?: string;
}

const PEOPLE = {
  DAN_JUTAN: 'DAN_JUTAN',
  ERIC_SIMONS: 'ERIC_SIMONS',
  RICH_HARRIS: 'RICH_HARRIS',
  SYLWIA_VARGAS: 'SYLWIA_VARGAS',
} as const;
type PeopleKeys = keyof typeof PEOPLE;

export const people: {[key in PeopleKeys]: Person} = {
  DAN_JUTAN: {
    name: 'Dan Jutan',
    href: 'https://twitter.com/jutanium',
    hrefAlias: 'jutanium',
    imgPath: '/img/people/dan_jutan.jpg',
    title: 'Technical writer and frontend developer'
  },
  ERIC_SIMONS: {
    name: 'Eric Simons',
    href: 'https://twitter.com/ericsimons40',
    hrefAlias: 'ericsimons40',
    imgPath: '/img/people/eric_simons.jpg',
    title: 'CEO, StackBlitz'
  },
  RICH_HARRIS: {
    name: 'Rich Harris',
    href: 'https://twitter.com/Rich_Harris',
    hrefAlias: 'Rich_Harris',
    imgPath: '/img/people/rich_harris.jpg',
    title: 'Principal Software Engineer, Vercel'
  },
  SYLWIA_VARGAS: {
    name: 'Sylwia Vargas',
    href: 'https://twitter.com/sylwiavargas',
    hrefAlias: 'sylwiavargas',
    imgPath: '/img/people/sylwia_vargas.jpg',
    title: 'Developer Advocate, StackBlitz'
  },
};
