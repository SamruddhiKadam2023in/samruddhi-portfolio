import { site } from '../../data/site';
import { SocialLinks } from '../common/SocialLinks';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-sm">
          <p className="font-semibold tracking-tight">{site.name}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-secondary">{site.description}</p>
        </div>
        <SocialLinks />
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-1 py-5 font-mono text-xs text-fg-muted sm:flex-row sm:justify-between">
          <p>© 2026 {site.name}</p>
          <p>Built with React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
}
