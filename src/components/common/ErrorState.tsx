import { ArrowLeft, RotateCw } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button } from './Button';

interface ErrorStateProps {
  code: string;
  title: string;
  message: ReactNode;
  /** Rendered as plain links so it works even when the router itself failed. */
  showReload?: boolean;
  children?: ReactNode;
}

export function ErrorState({ code, title, message, showReload, children }: ErrorStateProps) {
  return (
    <section className="container-page flex min-h-[70vh] flex-col justify-center py-24">
      <p className="font-mono text-sm text-accent">{code}</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-lg text-lg leading-relaxed text-fg-secondary">{message}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {children ?? (
          <a
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 font-medium text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </a>
        )}
        {showReload && (
          <Button
            variant="secondary"
            onClick={() => window.location.reload()}
            icon={<RotateCw size={16} aria-hidden />}
            iconPosition="start"
          >
            Reload page
          </Button>
        )}
      </div>
    </section>
  );
}
