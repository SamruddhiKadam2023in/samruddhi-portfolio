import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToSection } from '../../utils/scroll';

/**
 * Scrolls to the hash target after a route change (e.g. `/#projects` from a case study),
 * or to the top of the page when there is no hash.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Lazy sections may not be in the DOM yet; retry briefly.
    let attempts = 0;
    let timer: number | undefined;
    const tryScroll = () => {
      if (scrollToSection(id) || attempts++ > 20) return;
      timer = window.setTimeout(tryScroll, 50);
    };
    tryScroll();
    return () => window.clearTimeout(timer);
  }, [pathname, hash, key]);

  return null;
}
