import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { scrollToSection } from '../../utils/scroll';

/** Scroll positions by history entry, so Back/Forward return to where the visitor was. */
const positions = new Map<string, number>();

/** Calls `attempt` until it returns true or ~1s passes (content may still be rendering). */
function retry(attempt: () => boolean): () => void {
  let tries = 0;
  let timer: number | undefined;
  const run = () => {
    if (attempt() || tries++ > 20) return;
    timer = window.setTimeout(run, 50);
  };
  run();
  return () => window.clearTimeout(timer);
}

/**
 * - Back/Forward: restores the saved scroll position for that history entry.
 * - New navigation with a hash (e.g. `/#projects`): scrolls to that section.
 * - Any other new navigation: starts at the top.
 */
export function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();

  // Remember this entry's position while the visitor scrolls.
  useEffect(() => {
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    // No save on cleanup: by then the next page is rendered and the value would be wrong.
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  useEffect(() => {
    const saved = positions.get(key);
    if (navigationType === 'POP' && saved !== undefined) {
      return retry(() => {
        const reachable = document.documentElement.scrollHeight - window.innerHeight >= saved;
        if (reachable) window.scrollTo({ top: saved, behavior: 'instant' });
        return reachable;
      });
    }
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      return retry(() => scrollToSection(id));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, key, navigationType]);

  return null;
}
