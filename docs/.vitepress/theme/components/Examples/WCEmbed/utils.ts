/**
 * Checks if WebContainer is supported on the current browser.
 */
export function isWebContainerSupported() {
  const hasSharedArrayBuffer = 'SharedArrayBuffer' in window;
  const looksLikeChrome = navigator.userAgent.toLowerCase().includes('chrome');
  const looksLikeFirefox = navigator.userAgent.includes('Firefox');

  if (hasSharedArrayBuffer && (looksLikeChrome || looksLikeFirefox)) {
    return true;
  }

  // Allow overriding the support check with localStorage.webcontainer_any_ua = 1
  try {
    return Boolean(localStorage.getItem('webcontainer_any_ua'));
  } catch {
    return false;
  }
}

/**
 * Wraps the provided `text` taking the number of max length into account.
 * 
 * @param text - The text to wrap.
 * @param maxLength - The maximum length per line.
 */
export function wordWrap(text: string, maxLength: number) {
  const lines = text.split('\n');

  const result: string[] = [];

  for (const line of lines) {
    if (line.length <= maxLength) {
      result.push(line);

      continue;
    }

    // find the first occurence of a space while going back in the sentence starting at the max length position
    let index = maxLength;

    while (index > 0 && line.charAt(index) !== ' ') {
      index--;
    }

    if (index === 0) {
      // if no space was found, just push the entire line as we can't wrap
      result.push(line);
    } else {
      // if a space was found, grab the first part of the line and wrap the second part again
      result.push(
        line.slice(0, index), 
        wordWrap(line.slice(index + 1), maxLength)
      );
    }
  }

  return result.join('\n');
}
