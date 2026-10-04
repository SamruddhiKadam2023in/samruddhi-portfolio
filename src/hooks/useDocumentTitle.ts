import { useEffect } from 'react';
import { site } from '../data/site';

const BASE_TITLE = `${site.shortName} — ${site.role}`;

/** Sets the document title; pass nothing for the default home title. */
export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · ${site.shortName}` : BASE_TITLE;
  }, [title]);
}
