---
title: &title API Reference
description: &description The public WebContainer API allows you to build custom applications on top of an in-browser Node.js runtime.
outline: [2, 3]
head:
  - ['meta', { property: 'og:title', content: *title }]
  - [
      'meta',
      { property: 'og:image', content: 'https://webcontainers.io/img/og/api.png' },
    ]
  - ['meta', { name: 'twitter:title', content: *title }]
  - ['meta', { name: 'twitter:description', content: *description }]
---

# {{ $frontmatter.title }}

The public WebContainer API allows you to build custom applications on top of an in-browser Node.js runtime. Its main entry point is the `WebContainer` class.

---

## `WebContainer`

The main export of this library. An instance of `WebContainer` represents a runtime ready to be used.

### `WebContainer` Properties

<br />

#### <code>fs: <a href="#filesystemapi">FileSystemAPI</a></code>

Gives access to the underlying file system.

### `WebContainer` Methods

### ▸ `boot`

Boots a [WebContainer](#webcontainer). Only a single instance of WebContainer can be booted.

<h4 id="boot-signature">
  <a id="boot-signature">Signature</a>
  <a href="#boot-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`static boot(): Promise<WebContainer>`

<h4 id="boot-return">
  <a id="boot-return">Return</a>
  <a href="#boot-return" class="header-anchor" aria-hidden="true">#</a>
</h4>

Returns a [`WebContainer`](#webcontainer) instance.

### ▸ `mount`

Mounts a [`FileSystemTree`](#filesystemtree) into the file system.

<h4 id="filesystemtree-signature">
  <a id="filesystemtree-signature">Signature</a>
  <a href="#filesystemtree-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

<code>mount(tree: <a href="#filesystemtree">FileSystemTree</a>, options?: Options): Promise<void\></code>

<h4 id="filesystemtree-options">
  <a id="filesystemtree-options"><code>Options</code></a>
  <a href="#filesystemtree-options" class="header-anchor" aria-hidden="true">#</a>
</h4>

```ts
interface Options {
  mountPoint?: string;
}
```

### ▸ `on`

Listens for an `event`. The `listener` is called every time the `event` gets emitted.

<h4 id="on-signature">
  <a id="on-signature">Signature</a>
  <a href="#on-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

<br />

<h4 id="on-signature">
  <code>on(event: 'port' | 'error' | 'server-ready', listener: <a href="#portlistener">PortListener</a> | <a href="#">ErrorListener</a> | <a href="#">ServerReadyListener</a>): () => void</code>
</h4>

<br />

<h4 id="on-returns">
  <a id="on-returns">Returns</a>
  <a href="#on-returns" class="header-anchor" aria-hidden="true">#</a>
</h4>

Returns a function to unsubscribe from the events. Once unsubscribed, the `listener` will no longer be called.

<br />

<h4 id="on-overloads">
  <a id="on-overloads">Overloads</a>
  <a href="#on-overloads" class="header-anchor" aria-hidden="true">#</a>
</h4>

<br />

<h4>
  ▸ <code>on(event: 'port', listener: <a href="#portlistener">PortListener</a>): () => void</code>
</h4>

Listens for `port` events, which are emitted when a port is opened or closed by some process.

<span id="portlistener">`PortListener` (Function)</span>

```ts
(port: number, type: "open" | "close", url: string): void
```

<br />

<h4>
  ▸ <code>on(event: 'error', listener: <a href="#errorlistener">ErrorListener</a>): () => void</code>
</h4>

Listens for `error` events, emitted when an internal error is triggered.

<span id="errorlistener">`ErrorListener` (Function)</span>

```ts
(error: { message: string }): void
```

<br />

<h4>
  ▸ <code>on(event: 'server-ready', listener: <a href="#serverreadylistener">ServerReadyListener</a>): () => void</code>
</h4>

Listens for `server-ready` events, emitted when a server was started and ready to receive traffic.

<span id="serverreadylistener">`ServerReadyListener` (Function)</span>

```ts
(port: number, url: string): void
```

### ▸ `spawn`

Spawns a process. When no `args` are provided, spawns a process without command-line arguments.

<h4 id="wc-spawn-signature">
  <a id="wc-spawn-signature">Signature</a>
  <a href="#wc-spawn-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

<code>spawn(command: string, args: string[], options?: <a href="#spawnoptions">SpawnOptions</a>): Promise<<a href="#webcontainerprocess">WebContainerProcess</a>></code>

<h4 id="wc-spawn-example">
  <a id="wc-spawn-example">Example</a>
  <a href="#wc-spawn-example" class="header-anchor" aria-hidden="true">#</a>
</h4>

With `args`:

```js
const install = await webcontainerInstance.spawn('npm', ['i']);
```

Without `args`:

```js
const install = await webcontainerInstance.spawn('yarn');
```

<h4 id="wc-spawn-returns">
  <a id="wc-spawn-returns">Returns</a>
  <a href="#wc-spawn-returns" class="header-anchor" aria-hidden="true">#</a>
</h4>

Returns a [`WebContainerProcess`](#webcontainerprocess).

<br />

<h4 id="spawn-overloads">
  <a id="spawn-overloads">Overloads</a>
  <a href="#spawn-overloads" class="header-anchor" aria-hidden="true">#</a>
</h4>

<br />

<h4>
  ▸ <code>spawn(command: string, args: string[], options?:  <a href="#spawnoptions">SpawnOptions</a>): () => void</code>
</h4>

Spawns a process with additional arguments.

<h4>
  ▸ <code>spawn(command: string, options?:  <a href="#spawnoptions">SpawnOptions</a>): () => void</code>
</h4>

Spawns a process without additional arguments.

### ▸ `teardown`

Destroys a [`WebContainer`](#webcontainer) instance and releases its resources.

<h4 id="teardown-signature">
  <a id="teardown-signature">Signature</a>
  <a href="#teardown-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`teardown(): void`

---

## `DirEnt`

A representation of a directory entry, see [the Node.js API](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#class-fsdirent).

### `DirEnt` Properties

<br />

#### ▸ `name`

The name of the file or directory.

<h4 id="dirent-signature">
  <a id="dirent-signature">Signature</a>
  <a href="#dirent-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`name`: `string | Uint8Array`

### `DirEnt` Methods

### ▸ `isDirectory`

Whether the entry is a directory.

<h4 id="isdirectory-signature">
  <a id="isdirectory-signature">Signature</a>
  <a href="#isdirectory-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`isDirectory(): boolean`

### ▸ `isFile`

Whether the entry is a file.

<h4 id="isfile-signature">
  <a id="isfile-signature">Signature</a>
  <a href="#isfile-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`isFile(): boolean`

---

## `FileSystemAPI`

Interface to interact directly with the WebContainer file system. Modeled after [`fs.promises`](https://nodejs.org/dist/latest-v16.x/docs/api/fs.html#promises-api) in Node.

### `FileSystemAPI` Methods

### ▸ `mkdir`

Creates a new directory. If the directory already exists, it will throw an error.

<h4 id="mkdir-signature">
  <a id="mkdir-signature">Signature</a>
  <a href="#mkdir-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`mkdir(path: String, options?: Options): Promise<void>`

<h4 id="mkdir-options">
  <a id="mkdir-options"><code>Options</code></a>
  <a href="#mkdir-options" class="header-anchor" aria-hidden="true">#</a>
</h4>

When `recursive` is set to `true`, it will create any missing folders in the path.

```ts
interface Options {
  recursive?: boolean;
}
```

### ▸ `readdir`

Reads a given directory and returns an array of its files and directories.

<h4 id="readdir-signature">
  <a id="readdir-signature">Signature</a>
  <a href="#readdir-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

<code>readdir(path: string, options?: Options): Promise\<Uint8Array[]\> | Promise\<string[]\> | Promise\<<a href="#dirent">DirEnt</a>\<Uint8Array\>[]\> | Promise\<<a href="#dirent">DirEnt</a><string\>[]\></code>

<h4 id="readdir-options">
  <a id="readdir-options"><code>Options</code></a>
  <a href="#readdir-options" class="header-anchor" aria-hidden="true">#</a>
</h4>

```ts
interface Options {
  encoding?: BufferEncoding;
  withFileTypes?: boolean;
}
```

<br />

#### `encoding: BufferEncoding`

The encoding (see [`BufferEncoding`](#bufferencoding)) can be any one of those accepted by [`Buffer`](https://nodejs.org/dist/latest-v16.x/docs/api/buffer.html#class-buffer).

<br />

#### `withFileTypes: boolean`

When set to `true`, the return value is an array of `Dirent` objects.

### ▸ `readFile`

Reads the file at the given path. If the file does not exist, it will throw an error.

<h4 id="readfile-signature">
  <a id="readfile-signature">Signature</a>
  <a href="#readfile-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`readFile(path: string, encoding?: BufferEncoding | null): Promise<Uint8Array> | Promise<string>`

By default, it returns a `UInt8Array`. A second argument can be passed as the [encoding](#bufferencoding).

<h4 id="readfile-example">
  <a id="readfile-example">Example</a>
  <a href="#readfile-example" class="header-anchor" aria-hidden="true">#</a>
</h4>

Without `encoding`:

```ts
const bytes = await webcontainerInstance.fs.readFile('/package.json');
```

With a specified `encoding`:

```ts
const content = await webcontainerInstance.fs.readFile('/package.json', 'utf-8');
```

<h4 id="readfile-returns">
  <a id="readfile-returns">Returns</a>
  <a href="#readfile-returns" class="header-anchor" aria-hidden="true">#</a>
</h4>

`Promise<Uint8Array>` or `Promise<string>`

### ▸ `rm`

Deletes a file or a directory. If the path is a file, it will delete the file. If the path is a directory, a second argument is needed with option `recursive` set to `true` to delete the directory and everything inside it, including nested folders.

<h4 id="rm-signature">
  <a id="rm-signature">Signature</a>
  <a href="#rm-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`rm(path: string, options?: Options): Promise<void>`

<h4 id="rm-options">
  <a id="rm-options"><code>Options</code></a>
  <a href="#rm-options" class="header-anchor" aria-hidden="true">#</a>
</h4>

```ts
interface Options {
  force?: boolean;
  recursive?: boolean;
}
```

<br />

#### `force?: boolean`

When `true`, exceptions will be ignored if the `path` does not exist.

#### `recursive?: boolean`

If `true`, it will recursively remove directories, including nested directories.

<h4 id="rm-example">
  <a id="rm-example">Example</a>
  <a href="#rm-example" class="header-anchor" aria-hidden="true">#</a>
</h4>

Deleting a file:

```js
await webcontainerInstance.fs.rm('/src/main.js');
```

Deleting a directory:

```js
await webcontainerInstance.fs.rm('/src', { recursive: true });
```

### ▸ `writeFile`

Writes a file to the given path. If the file does not exist, it will create a new one. If the file exists, it will overwrite the file.

<h4 id="writefile-signature">
  <a id="writefile-signature">Signature</a>
  <a href="#writefile-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`writeFile(path: string, data: string | Uint8Array, options?: string { encoding?: null | BufferEncoding } | null): Promise<void>`

<h4 id="writefile-example">
  <a id="writefile-example">Example</a>
  <a href="#writefile-example" class="header-anchor" aria-hidden="true">#</a>
</h4>

Default:

```js
await webcontainerInstance.fs.writeFile('/src/main.js', 'console.log("Hello from WebContainers!")');
```

With `encoding`:

```js
await webcontainerInstance.fs.writeFile(
  '/src/main.js',
  '\xE5\x8D\x83\xE8\x91\x89\xE5\xB8\x82\xE3\x83\x96\xE3\x83\xAB\xE3\x83\xBC\xE3\x82\xB9',
  { encoding: 'latin1' }
);
```

---

## `FileSystemTree`

A tree-like structure to describe the contents of a folder to be mounted.

```ts
interface FileSystemTree {
  [name: string]: FileNode | DirectoryNode;
}
```

Also see [`FileNode`](#filenode) and [`DirectoryNode`](#directorynode).

<h4 id="filesystemtree-example">
  <a id="filesystemtree-example">Example</a>
  <a href="#filesystemtree-example" class="header-anchor" aria-hidden="true">#</a>
</h4>

```js
const tree = {
  myproject: {
    directory: {
      'foo.js': {
        file: {
          contents: 'const x = 1;',
        },
      },
      .envrc: {
        file: {
          contents: 'ENVIRONMENT=staging'
        }
      },
    },
  },
  emptyFolder: {
    directory: {}
  },
};
```

---

## `FileNode`

```ts
interface FileNode {
  file: {
    contents: string | Uint8Array;
  };
}
```

### `FileNode` Properties

<br />

#### ▸ `file: { contents: string | Uint8Array }`

Represents a file with contents. Also see [`FileSystemTree`](#filesystemtree).

---

## `DirectoryNode`

```ts
interface DirectoryNode {
  directory: FileSystemTree;
}
```

### `DirectoryNode` Properties

<br />

#### ▸ <code>directory: <a href="#filesystemtree">FileSystemTree</a></code>

Represents a directory node. Also see [`FileSystemTree`](#filesystemtree).

---

## `SpawnOptions`

Options that control spawning a process.

```ts
export interface SpawnOptions {
  env?: Record<string, string | number | boolean>;
  output?: boolean;
  terminal?: { cols: number; rows: number };
}
```

### `SpawnOptions` Properties

<br />

#### ▸ `env?: Record<string, string | number | boolean>`

Environment variables to set for the process.

<br />

#### ▸ `output?: boolean`

When set to `false`, no terminal output is sent back to the process, and the `output` stream will never produce any chunks.

<br />

#### ▸ `terminal?: { cols: number; rows: number }`

The size of the attached terminal.

---

## `WebContainerProcess`

A running process spawned in a [WebContainer](#webcontainer) instance.

### `WebContainerProcess` Properties

<br />

#### ▸ `exit: Promise<number>`

A promise for the exit code of the process.

<br />

#### ▸ <code>input: <a href="https://developer.mozilla.org/en-US/docs/Web/API/WritableStream" target="_blank" rel="noreferrer">WritableStream</a>&lt;string&gt;</code>

An input stream for the attached pseudoterminal device.

<br />

#### ▸ <code>output: <a href="https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream" target="_blank" rel="noreferrer">ReadableStream</a>&lt;string&gt;</code>

A stream that receives all terminal output, including the stdout and stderr emitted by the spawned process
_and_ its descendants.

Can be disabled by setting `output` to `false` via [`spawn`](#▸-spawn).

<h4 id="webcontainerprocess-output-signature">
  <a id="webcontainerprocess-output-signature">Signature</a>
  <a href="#webcontainerprocess-output-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`output: ReadableStream<string>`

### `WebContainerProcess` Methods

### ▸ `kill`

Kills the process.

<h4 id="kill-signature">
  <a id="kill-signature">Signature</a>
  <a href="#kill-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`kill(): void`

### ▸ `resize`

Resizes the attached terminal.

<h4 id="resize-signature">
  <a id="resize-signature">Signature</a>
  <a href="#resize-signature" class="header-anchor" aria-hidden="true">#</a>
</h4>

`resize(dimensions: { cols: number, rows: number }): void`

---

## `BufferEncoding`

```ts
type BufferEncoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'base64url'
  | 'latin1'
  | 'binary'
  | 'hex'
  | 'buffer';
```
