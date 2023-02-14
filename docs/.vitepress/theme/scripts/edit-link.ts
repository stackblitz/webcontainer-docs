export {}; // required by TS --isolatedModules

if (typeof document === 'object') {
  document.body?.addEventListener('click', clickListener, true);
}

/**
 * Add initialPath attribute to Web Publisher links,
 * to render the correct page in the preview.
 */
function clickListener(event: MouseEvent) {
  const link = event.target instanceof HTMLAnchorElement ? event.target : null;
  if (
    link &&
    // only change edit link
    link.classList.contains('edit-link-button') &&
    // only change link once
    !link.href.includes('initialPath=')
  ) {
    link.href = `${link.href}?initialPath=${document.location.pathname}`;
  }
}
