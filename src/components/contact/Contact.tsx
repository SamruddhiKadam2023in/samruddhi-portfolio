import { ArrowUpRight, Copy, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { social } from '../../data/social';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';
import { GithubIcon, LinkedinIcon } from '../common/BrandIcons';
import { Button, ButtonLink } from '../common/Button';
import { Reveal } from '../common/Reveal';
import { Toast, type ToastMessage } from '../common/Toast';

const TOAST_MS = 2400;

const profiles = [
  {
    label: 'LinkedIn',
    handle: 'in/-samruddhi-kadam',
    href: social.linkedin,
    icon: <LinkedinIcon size={18} />,
  },
  {
    label: 'GitHub',
    handle: 'SamruddhiKadam2023in',
    href: social.github,
    icon: <GithubIcon size={18} />,
  },
];

export function Contact() {
  const copy = useCopyToClipboard();
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    const ok = await copy(social.email);
    window.clearTimeout(timer.current);
    setToast({
      id: Date.now(),
      text: ok ? 'Email copied' : 'Couldn’t copy. The address is shown above.',
      tone: ok ? 'success' : 'error',
    });
    timer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_70%_at_50%_100%,black,transparent)]"
      />
      <div className="container-page">
        <Reveal className="max-w-3xl">
          <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wider text-fg-muted uppercase">
            <span className="text-accent">04</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>Contact</span>
          </p>
          <h2
            id="contact-title"
            className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
          >
            Let’s build something <span className="text-accent">useful.</span>
          </h2>
          <p className="mt-5 text-lg text-fg-secondary sm:text-xl">
            Have a project, idea, or opportunity worth discussing?
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 grid gap-4 lg:grid-cols-5">
          {/* Email */}
          <div className="min-w-0 rounded-2xl border border-line bg-surface p-5 shadow-card min-[360px]:p-6 sm:p-8 lg:col-span-3">
            <p className="flex items-center gap-2 font-mono text-xs text-fg-muted">
              <Mail size={14} aria-hidden />
              email
            </p>
            <a
              href={`mailto:${social.email}`}
              className="mt-3 block text-base font-medium tracking-tight [overflow-wrap:anywhere] transition-colors hover:text-accent min-[360px]:text-lg min-[400px]:text-xl sm:text-2xl"
            >
              {social.email}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                href={`mailto:${social.email}`}
                icon={
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                }
              >
                Send Email
              </ButtonLink>
              <Button
                variant="secondary"
                onClick={copyEmail}
                icon={<Copy size={15} aria-hidden />}
                iconPosition="start"
              >
                Copy Email
              </Button>
            </div>
          </div>

          {/* Profiles */}
          <ul className="grid gap-4 lg:col-span-2">
            {profiles.map((profile) => (
              <li key={profile.label}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${profile.label}: ${profile.handle} (opens in a new tab)`}
                  className="group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-bg text-fg-secondary transition-colors group-hover:text-fg">
                    {profile.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium">{profile.label}</span>
                    <span className="block truncate font-mono text-xs text-fg-muted">
                      {profile.handle}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden
                    className="shrink-0 text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                  />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Toast message={toast} />
    </section>
  );
}
