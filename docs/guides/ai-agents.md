# Runtime Test Cases For AI Agents

To help developers validate whether WebContainer is right for their use case, we've compiled a suite of test cases that you can independently run on any runtime of your choosing (serverless, VMs, WebContainers, etc). These tests represent the most common patterns, libraries, tools, commands and environments that developers and toolchains rely on in the Node.js ecosystem, and thus serve as a good baseline for what capabilities LLM generated code would require.

## Evaluating in-browser versus server runtimes

When building AI agents you often need to execute arbitrary code. The most ideal place to do this tends to be inside the user's browser tab, as it is secure, long lived, scales infinitely, is cost effective, and boots instantly which provides an extremely fast user experience.

While creating a simple in-browser proof-of-concept is straightforward, compatibility is usually the main issue with in-browser runtimes, and this is especially the case for AI agents where you need to execute the arbitrary code LLMs produce.

Inversely, using servers (whether VMs or serverless solutions) often provide compatibility guarantees but at the expense of being short lived, expensive to scale, difficult to secure, and suffering from increased latency and cold starts.

WebContainers is the first technology that has merged the best of both these worlds by bringing the entire Node.js runtime, ecosystem and tooling into the browser with excellent compatibility — no servers required. To validate this, we encourage developers to run real world test cases like the ones below both in WebContainer as well as any other runtime they are evaluating.


## Test Cases
The following test cases cover a broad spectrum of essential tools and frameworks in web development, ensuring AI agents are versatile, efficient, and capable of handling *real-world* coding tasks. These tools, frameworks, and runtime features are driven by real world data observed via real world usage of over 3 million developers on StackBlitz.com every month and npm trends.

**To run these test cases**: First, download the files from the StackBlitz example and have the environment arbitrarily install the npm packages, execute the dev or start command, when applicable check the server is booted properly, and validate the results are expected.

### NodeJS 
*Multiple processes, Async promises, FS Operations, Built-ins, Http Server, Streams, Child processes, Inter, process, communication, timers, Event Emitter*

[View test cases](https://stackblitz.com/edit/stackblitz-starters-9ozakx)

NodeJS is crucial because it evaluates the agent's ability to handle concurrency, manage child processes, and ensure performance efficiency. NodeJS's event-driven architecture makes it ideal for I/O-heavy tasks, and by leveraging multiple processes, the agent's proficiency in creating robust, performant applications is tested.

### Package managers
*NPM, Yarn, PNPM*

[View test cases](https://stackblitz.com/edit/node-yahmwv?file=package.json)

Handling package managers ensures the ability to manage dependencies, resolve version conflicts, and execute scripts. It also demonstrates adaptability to different package management systems and optimizes for faster, more efficient builds.

### Command Line (CLI)
[View test case](https://stackblitz.com/edit/node-xrxygh?file=.stackblitzrc)

CLI operations assess the capability to interact with the system shell, execute commands, and handle various command-line tools. It also tests the ability to parse command-line arguments and provide meaningful outputs or perform actions based on those commands.

### Vite 
[NPM trend](https://npmtrends.com/vite) - [View test case](https://vite.new)

Using Vite evaluates the ability to configure and optimize modern development environments. It also assesses proficiency in handling hot module replacement, faster builds, and leveraging Vite's advanced features to enhance developer productivity.

### Next.js
[NPM trend](https://npmtrends.com/next) - [View test case](https://stackblitz.com/edit/nextjs-lsmwnd?file=README.md)

NextJS assesses the capability to manage both client-side and server-side code, handle complex routing, and optimize performance for SEO. It also tests the ability to integrate with various APIs and manage state in a universal JavaScript application.

### shadcn-ui
[NPM trend](https://npmtrends.com/shadcn-ui) - [View test case](https://stackblitz.com/edit/vitejs-vite-7g7gcc)

Using Shadcn ensures effective integration and utilization of CLI-driven component architectures. It also assesses the ability to customize and extend the library to meet specific project requirements.

### React Router
[NPM trend](https://npmtrends.com/react-router) - [View test case](https://stackblitz.com/github/remix-run/react-router/tree/dev/examples/basic)

React Router evaluates the ability to manage complex navigation structures, handle dynamic routing, and ensure seamless transitions between different parts of an application. It also tests proficiency in managing route parameters, query strings, and nested routes.

### Nuxt
[NPM trend](https://npmtrends.com/nuxt) - [View test case](https://stackblitz.com/github/nuxt/starter/tree/v3)

NuxtJS assesses the ability to handle server-side rendering, auto-imports, file system conventions, and zero config TypeScript support. It also tests the capability to work with Nuxt's automation with conventions methodology.

### LibSQL
[NPM trend](https://npmtrends.com/@libsql/client) - [View test case](https://stackblitz.com/edit/node-ox2oqu) 

Using LibSQL evaluates the ability to perform database operations such as querying, updating, and managing transactions. It also tests proficiency in handling database connections, optimizing queries, and ensuring data integrity and security.

### Drizzle ORM
[NPM trend](https://npmtrends.com/drizzle-orm) - [View test case](https://stackblitz.com/edit/github-9wp31h-ghh5jl?file=readme.md)

Drizzle ORM assesses the ability to map database tables to objects, handle complex relationships, and perform CRUD operations efficiently. It also tests the ability to optimize database access and integrate with other parts of the application seamlessly.
