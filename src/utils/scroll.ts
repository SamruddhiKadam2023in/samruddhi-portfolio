export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Scrolls to a home-page section by id ('home' scrolls to the top). Returns false if absent. */
export function scrollToSection(id: string): boolean {
  const behavior: ScrollBehavior = prefersReducedMotion() ? 'instant' : 'smooth';
  if (id === 'home') {
    window.scrollTo({ top: 0, behavior });
    return true;
  }
  const element = document.getElementById(id);
  if (!element) return false;
  element.scrollIntoView({ behavior, block: 'start' });
  return true;
}

export function sectionHref(id: string): string {
  return id === 'home' ? '/' : `/#${id}`;
}
