// https://developers.google.com/tag-platform/gtagjs/reference
interface GtagEvent {
    eventName: string;
    pagePath: string;
    value: string;
  }
  
  export function sendEvent({ eventName, pagePath, value }: GtagEvent) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        page_path: pagePath,
        value,
      });
    }
  }
