import { useEffect } from 'react';
import { site } from '../data/site';

interface PageMeta {
  /** Page-specific title; omit for the home page. */
  title?: string;
  description?: string;
  /** Path for the canonical URL, e.g. `/projects/propai`. */
  path?: string;
  /** Social preview image path (defaults to the site-wide image). */
  image?: string;
  /** Keep error pages out of search results. */
  noindex?: boolean;
}

const HOME_TITLE = `${site.shortName} — ${site.role}`;
const DEFAULT_IMAGE = '/og-image.png';

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/**
 * Keeps the title, description, canonical URL and social tags in sync with the page.
 * index.html carries the same defaults for crawlers that don't run JavaScript.
 */
export function usePageMeta({
  title,
  description = site.seoDescription,
  path = '/',
  image = DEFAULT_IMAGE,
  noindex = false,
}: PageMeta = {}): void {
  useEffect(() => {
    const fullTitle = title ? `${title} · ${site.shortName}` : HOME_TITLE;
    const url = `${site.url}${path}`;
    const imageUrl = `${site.url}${image}`;

    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', imageUrl);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);
  }, [title, description, path, image, noindex]);
}
