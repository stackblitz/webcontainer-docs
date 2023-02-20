---
title: &title Configuring Headers
description: &description This guide provides an overview on how to configure COOP/COEP headers, including hosting platform configuration.
head:
  - ['meta', { property: 'og:title', content: *title }]
  - [
      'meta',
      {
        property: 'og:image',
        content: 'https://webcontainers.io/img/og/guide-configuring_headers.png',
      },
    ]
  - ['meta', { name: 'twitter:title', content: *title }]
  - ['meta', { name: 'twitter:description', content: *description }]
---

# Configuring Headers

This guide provides an overview on how to configure COOP/COEP headers, including hosting platform configuration.

WebContainers require that your page, even in development, be served with these two headers:

```yaml
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
```

These headers are needed because WebContainer _requires_ SharedArrayBuffer, which, in turn, requires your website to be cross-origin isolated.

::: info Deep Dive: cross-origin isolation
Here are a few helpful resources if you'd like to learn more about these topics:

- MDN page on [SharedArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer)
- MDN page on [cross-origin isolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements)
- our [primer on COOP/COEP](https://blog.stackblitz.com/posts/cross-browser-with-coop-coep/)
- StackBlitz [docs page on browser support](https://developer.stackblitz.com/docs/platform/browser-support)
  :::

## Cloudflare

### All pages

You can configure headers for all pages in your `_headers` file:

```yaml
/*
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
```

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `_headers` file:

```yaml
/tutorial
  Cross-Origin-Embedder-Policy: require-corp
  Cross-Origin-Opener-Policy: same-origin
```

## Netlify

### All pages

You can configure headers for all pages in your `netlify.toml` file:

```yaml
[[headers]]
  for = "/*"
  [headers.values]
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
```

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `netlify.toml` file:

```yaml
[[headers]]
  for = "/tutorial"
  [headers.values]
    Cross-Origin-Embedder-Policy = "require-corp"
    Cross-Origin-Opener-Policy = "same-origin"
```

Read more here about [headers on Netlify](https://docs.netlify.com/routing/headers/).

## Vercel

### All pages

You can configure headers for all pages in your `vercel.json` file:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `vercel.json` file:

```json
{
  "headers": [
    {
      "source": "/tutorial",
      "headers": [
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        },
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        }
      ]
    }
  ]
}
```

Read more here about [headers on Vercel](https://vercel.com/docs/concepts/projects/project-configuration#headers).

# Configuring across popular meta-frameworks

## SvelteKit

### All pages

You can configure headers for all pages in your `hooks.server.js` file:

::: code-group

```js [hooks.server.js]
export const handle = async ({ request, resolve }) => {
  const response = await resolve(request);

  response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');

  return response;
};
```

:::

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `hooks.server.js` file:

::: code-group

```js [hooks.server.js]
export const handle = async ({ request, resolve }) => {
  const response = await resolve(request);

  if (request.path === '/tutorial') {
    response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  }

  return response;
};
```

:::

You can also do this in specific page's `+page.server.js` file:

::: code-group

```js [tutorial/+page.server.js]
/** @type {import('./$types').PageServerLoad} */
export const load = ({ setHeaders }) => {
  setHeaders({
    'Cross-Origin-Embedder-Policy': 'require-corp',
    'Cross-Origin-Opener-Policy': 'same-origin',
  });
};
```

:::

## Nuxt 3

### All pages

You can configure headers for all pages in your `nuxt.config.js` file:

```js{5-10}
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '**': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
});
```

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `nuxt.config.js` file:

```js{5-10}
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    routeRules: {
      '/tutorial': {
        headers: {
          'Cross-Origin-Embedder-Policy': 'require-corp',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      },
    },
  },
});
```

## NextJS

### All pages

You can configure headers for all pages in your `next.config.js` file:

```js [next.config.js]
// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};
```

### Specific page

You can configure headers for a specific page(`/tutorial` in this case) in your `next.config.js` file:

```js [next.config.js]
// https://nextjs.org/docs/api-reference/next.config.js/introduction
module.exports = {
  async headers() {
    return [
      {
        source: '/tutorial',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
};
```
