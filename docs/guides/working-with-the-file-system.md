---
title: &title Working with the File System
description: &description WebContainer API gives you access to work with a virtual file system, right in memory. This page covers the mental model of how files are structured in WebContainers, how to load files and directories, as well as what file system operations are available in the API.
head:
  - ['meta', {property: 'og:title', content: *title}]
  - ['meta', {property: 'og:image', content: 'https://webcontainers.io/img/og/guide-working_with_the_file_system.png'}]
  - ['meta', {name: 'twitter:title', content: *title}]
  - ['meta', {name: 'twitter:description', content: *description}]
---
# Working with the File System

WebContainer API gives you access to work with a virtual file system, right in memory. This page covers the mental model of how files are structured in WebContainers, how to load files and directories, as well as what file system operations are available in the API.

## Mental model

A common `package.json` file in WebContainers is represented as a data structure of the following shape:

```js
const files = {
  // This is a file - provide its path as a key:
  'package.json': {
    // Because it's a file, add the "file" key
    file: {
      // Now add its contents
      contents: `
        {
          "name": "vite-starter",
          "private": true,
         // ...
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
};
```

It is a multiple-level nested object with the first key being the path, the second is called "file", and the third, which contains the actual contents of the file, is called "contents".

Similarly, a folder is represented in WebContainers as follows:

```js
const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // Here we will add files
    },
  },
};
```

Folder with a file is represented as follows:

```js
const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            console.log('Hello from WebContainers!')
          `,
        },
      },
    },
  },
};
```

## Loading files

Use the `mount` method to load a file into the WebContainer's file system. The method expects an object following the structure of `FileSystemTree`, a type exported from `@webcontainer/api`. If you're not a TypeScript user, you can still leverage this using JSDoc.

## Single file

To load a single file into a WebContainer instance, follow this format:

```js
/** @type {import('@webcontainer/api').FileSystemTree} */

const files = {
  'package.json': {
    file: {
      contents: `
        {
          "name": "vite-starter",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
};

await webcontainerInstance.mount(files);
```

This code loads a single file, `package.json`, at the root of your file system. Now you can read the file using `readFile` method:

```js
const file = await webcontainerInstance.fs.readFile('/package.json');
```

## Multiple files

To load multiple files to a WebContainer instance, add another key to the object you pass to `mount` method:

```js
/** @type {import('@webcontainer/api').FileSystemTree} */

const files = {
  'package.json': {
    file: {
      contents: `
        {
          "name": "vite-starter",
          "private": true,
          "version": "0.0.0",
          "type": "module",
          "scripts": {
            "dev": "vite",
            "build": "vite build",
            "preview": "vite preview"
          },
          "devDependencies": {
            "vite": "^4.0.4"
          }
        }`,
    },
  },
  'index.html': {
    file: {
      contents: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" type="image/svg+xml" href="/vite.svg" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Vite App</title>
          </head>
          <body>
            <div id="app"></div>
            <script type="module" src="/src/main.js"></script>
          </body>
        </html>`,
    },
  },
};

await webcontainerInstance.mount(files);
```

## Folders

Take a look at the `src` directory in this file tree:

```yaml
- src
  - main.js
  - main.css
- index.html
- package.json
```

In WebContainers, it will be reflected in the following format:

```js{4-29}
/** @type {import('@webcontainer/api').FileSystemTree} */

const files = {
  // This is a directory - provide its name as a key
  src: {
    // Because it's a directory, add the "directory" key
    directory: {
      // This is a file - provide its path as a key:
      'main.js': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            console.log('Hello from WebContainers!')
          `,
        },
      },
      // This is another file inside the same folder
      'main.css': {
        // Because it's a file, add the "file" key
        file: {
          contents: `
            body {
              margin: 0;
            }
          `,
        },
      },
    },
  },
  // This is a file outside the folder
  'package.json': {
    /* Omitted for brevity */
  },
  // This is another file outside the folder
  'index.html': {
    /* Omitted for brevity */
  },
};

await webcontainerInstance.mount(files);
```

To sum up. If the file you're loading is a folder, add a key `directory` and then proceed with adding its files.

## Mounting to a different path

By default, the files are mounted into the file system to the root folder. However, you can mount them to a different path by using the `mountPoint` property:

```js
/** @type {import('@webcontainer/api').FileSystemTree} */

const files = {
  'package.json': {
    /* Omitted for brevity */
  },
  'index.html': {
    /* Omitted for brevity */
  },
};

await webcontainerInstance.mount(files, { mountPoint: 'my-mount-point' });
```

::: warning

Before you mount, make sure that the folder you are mounting to exists. If it doesn't, WebContainers will throw an error.

You can create a folder using `mkdir` method:

```js
await webcontainerInstance.fs.mkdir('my-mount-point');
await webcontainerInstance.mount(files, { mountPoint: 'my-mount-point' });
```

:::

## File System operations (`fs`)

WebContainers expose an `fs` property on the WebContainer instance (`webcontainerInstance`). Currently, `fs` supports a few methods:

- [`readFile`](#readfile)
- [`readdir`](#readdir)
- [`rm`](#rm)
- [`writeFile`](#writefile)
- [`mkdir`](#mkdir)

Let's take a closer look at them.

### `readFile`

Reads the file at the given path. If the file does not exist, it will throw an error.

```js
const file = await webcontainerInstance.fs.readFile('/package.json');
//    ^ it is a UInt8Array
```

By default, it returns a `UInt8Array`. You can pass a second argument to `readFile` to specify the encoding:

```js
const file = await webcontainerInstance.fs.readFile('/package.json', 'utf-8');
//    ^ it is a string
```

### `readdir`

Reads a given directory and returns an array of its files and directories.

```js
const files = await webcontainerInstance.fs.readdir('/src');
//    ^ is an array of strings
```

If the directory doesn't exist, it will throw an error.

The `readdir` method takes two options: [`withFileTypes`](#withfiletypes) and [`encoding`](#encoding).

#### `withFileTypes`

When `withFileTypes` is set to `true`, the return value is an array of `Dirent` objects. `Dirent` objects have the following properties:

- `name` - the name of the file or directory
- `isFile()` - whether the entry is a file
- `isDirectory()` - whether the entry is a directory

```js
const files = await webcontainerInstance.fs.readdir('/src', {
  withFileTypes: true,
});
```

#### `encoding`

By default, `readdir` returns an array of strings. You can pass `encoding` option to `readdir` to specify the encoding.

```js
const files = await webcontainerInstance.fs.readdir('/src', { encoding: 'buffer' });
//    ^ it is an array of UInt8Array
```

### `rm`

Deletes a file or a directory. If the path is a file, it will delete the file. If the path is a directory, you need to provide a second argument with options `recursive` set to `true` to delete the directory and everything inside it, including nested folders.

```js
// Delete a file
await webcontainerInstance.fs.rm('/src/main.js');

// Delete a directory
await webcontainerInstance.fs.rm('/src', { recursive: true });
```

You can also use `force` option to delete.

### `writeFile`

Writes a file to the given path. If the file does not exist, it will create a new one. If the file exists, it will overwrite the file.

```js
await webcontainerInstance.fs.writeFile('/src/main.js', 'console.log("Hello from WebContainers!")');
```

You can pass a third argument to `writeFile` to specify the encoding.

```js
await webcontainerInstance.fs.writeFile(
  '/src/main.js',
  '\xE5\x8D\x83\xE8\x91\x89\xE5\xB8\x82\xE3\x83\x96\xE3\x83\xAB\xE3\x83\xBC\xE3\x82\xB9',
  { encoding: 'latin1' }
);
```

### `mkdir`

Creates a directory at the given path. If the directory already exists, it will throw an error.

```js
await webcontainerInstance.fs.mkdir('src');
```

You can use `recursive` option to create a nested folder very easily.

```js
await webcontainerInstance.fs.mkdir('this/is/my/nested/folder', { recursive: true });
```

## Next steps

Explore WebContainer API in [our WebContainers starter](https://webcontainer.new), explore the [API Reference](../api) or follow [our tutorial](../tutorial/1-building-your-first-webcontainers-app.md) and build your first WebContainer app!
