import { m } from 'framer-motion';
import { BrainCircuit, Database, Monitor, Network, Server, type LucideIcon } from 'lucide-react';

interface Layer {
  label: string;
  stack: string;
  icon: LucideIcon;
}

// Each layer lists technologies actually used across the projects on this site.
const layers: Layer[] = [
  { label: 'Frontend', stack: 'React · TypeScript · Vite', icon: Monitor },
  { label: 'API', stack: 'REST · WebSockets · JWT auth', icon: Network },
  { label: 'Backend', stack: 'Node.js · Express · FastAPI', icon: Server },
  { label: 'Data', stack: 'PostgreSQL · MongoDB · Redis', icon: Database },
  { label: 'Intelligence', stack: 'OCR · NLP · YOLO · OpenCV', icon: BrainCircuit },
];

const ease = [0.21, 0.6, 0.35, 1] as const;

/** The layers a typical project here spans, drawn as a request flowing down the stack. */
export function SystemDiagram() {
  return (
    <figure
      aria-label="How the systems I build fit together: frontend, API, backend, data and intelligence layers"
      className="relative rounded-2xl border border-line bg-surface/80 shadow-card backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </div>
        <span className="font-mono text-[0.6875rem] text-fg-muted">system.flow</span>
      </div>

      <ol className="p-4 sm:p-5">
        {layers.map((layer, index) => {
          const Icon = layer.icon;
          const last = index === layers.length - 1;
          return (
            <li key={layer.label} className="relative">
              <m.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.12, ease }}
                className="group flex items-center gap-4 rounded-xl border border-line bg-bg/60 px-4 py-3 transition-colors hover:border-accent/40"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-fg-secondary transition-colors group-hover:text-accent">
                  <Icon size={17} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{layer.label}</span>
                  <span className="block truncate font-mono text-[0.6875rem] text-fg-muted">
                    {layer.stack}
                  </span>
                </span>
                <span aria-hidden className="font-mono text-[0.6875rem] text-fg-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </m.div>

              {!last && (
                <div aria-hidden className="relative ml-[2.15rem] h-4 w-px overflow-hidden">
                  <m.span
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.25, delay: 0.5 + index * 0.12, ease }}
                    className="absolute inset-0 origin-top bg-gradient-to-b from-accent/70 to-line-strong"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
