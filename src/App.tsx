import { ArrowRight } from 'lucide-react';
import { GithubIcon } from './components/common/BrandIcons';
import { Button, ButtonLink } from './components/common/Button';
import { SectionHeading } from './components/common/SectionHeading';
import { Tag } from './components/common/Tag';
import { ThemeProvider } from './components/common/ThemeProvider';
import { ThemeToggle } from './components/common/ThemeToggle';

// Temporary design-system preview (Phase 2). Replaced by the router in Phase 3.
export default function App() {
  return (
    <ThemeProvider>
      <main className="min-h-dvh bg-grid py-16">
        <div className="container-page space-y-12">
          <div className="flex items-center justify-between">
            <p className="font-mono text-sm text-fg-muted">design-system / preview</p>
            <ThemeToggle />
          </div>
          <SectionHeading
            index="01"
            label="Tokens"
            title="I build useful software and intelligent systems."
            description="Full-stack applications, developer tools, data-driven platforms, and intelligent systems."
          />
          <div className="flex flex-wrap gap-3">
            <Button icon={<ArrowRight size={16} aria-hidden />}>Primary</Button>
            <ButtonLink
              href="https://github.com"
              external
              variant="secondary"
              icon={<GithubIcon size={16} />}
              iconPosition="start"
            >
              Secondary
            </ButtonLink>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag>React</Tag>
            <Tag>TypeScript</Tag>
            <Tag tone="accent">Individual Project</Tag>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {(['bg-surface', 'bg-surface-elevated', 'bg-accent-soft'] as const).map((c) => (
              <div key={c} className={`${c} rounded-xl border border-line p-6 shadow-card`}>
                <p className="font-mono text-xs text-fg-muted">{c}</p>
                <p className="mt-2 text-fg">Primary text</p>
                <p className="text-fg-secondary">Secondary text</p>
                <p className="text-fg-muted">Muted text</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4 font-mono text-sm">
            <span className="text-success">success</span>
            <span className="text-warning">warning</span>
            <span className="text-error">error</span>
            <span className="text-accent">accent</span>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
