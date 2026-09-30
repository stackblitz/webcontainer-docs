import { WebContainer, type BootOptions } from '@webcontainer/api';

/**
 * Only one WebContainer can be booted per page. Every component boots through here so that
 * opening a new one tears down whatever instance is currently running (VitePress navigates
 * client-side, so a previous page's instance is otherwise still alive).
 */

interface Owner {
  instance: Promise<WebContainer>;
  onTeardown?: () => void;
}

let current: Owner | undefined;

// serializes teardown/boot so a boot never races a pending teardown
let settled: Promise<unknown> = Promise.resolve();

export function acquireWebContainer(options?: BootOptions, onTeardown?: () => void) {
  const previous = current;

  const instance = settled.then(async () => {
    if (previous) {
      await release(previous);
    }

    return WebContainer.boot(options);
  });

  current = { instance, onTeardown };
  settled = instance.catch(() => {});

  return instance;
}

export function releaseWebContainer(instance: Promise<WebContainer>) {
  if (current?.instance !== instance) {
    return;
  }

  const owner = current;

  current = undefined;
  settled = settled.then(() => release(owner));
}

async function release(owner: Owner) {
  owner.onTeardown?.();

  try {
    (await owner.instance).teardown();
  } catch {
    // boot failed, nothing to tear down
  }
}
