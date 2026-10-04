import { m } from 'framer-motion';
import { ArrowUpRight, Expand, Images } from 'lucide-react';
import { useState } from 'react';
import { useSkillSelection } from '../../hooks/useSkillSelection';
import type { Project } from '../../types/project';
import { cn } from '../../utils/cn';
import { GithubIcon } from '../common/BrandIcons';
import { ButtonLink } from '../common/Button';
import { Lightbox } from '../common/Lightbox';
import { ProjectImage } from '../common/ProjectImage';
import { Tag } from '../common/Tag';
import { ProjectTypeBadge } from './ProjectTypeBadge';

const ease = [0.21, 0.6, 0.35, 1] as const;
const MAX_THUMBS = 4;

interface ProjectShowcaseProps {
  project: Project;
  /** Alternate the screenshot side on large screens. */
  reversed: boolean;
}

export function ProjectShowcase({ project, reversed }: ProjectShowcaseProps) {
  const [viewing, setViewing] = useState<number | null>(null);
  const { selected, matching } = useSkillSelection();
  const [cover, ...rest] = project.images;
  const thumbs = rest.slice(0, MAX_THUMBS);
  const hidden = rest.length - thumbs.length;

  const isMatch = matching?.has(project.id) ?? false;
  const dimmed = matching !== null && !isMatch;
  const caseStudyHref = `/projects/${project.slug}`;

  return (
    <m.article
      id={`project-${project.id}`}
      aria-labelledby={`project-${project.id}-title`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, ease }}
      className="scroll-mt-24"
    >
      <div
        className={cn(
          'grid items-center gap-8 rounded-3xl border p-4 transition-colors duration-300 sm:p-6 lg:grid-cols-12 lg:gap-12 lg:p-8',
          isMatch ? 'border-accent/50 bg-accent-soft' : 'border-transparent',
        )}
      >
        {/* Media */}
        {/* Non-matching projects fade only their screenshots, so the text stays readable. */}
        <div
          className={cn(
            'transition-[opacity,filter] duration-300 lg:col-span-7',
            reversed && 'lg:order-2',
            dimmed && 'opacity-35 grayscale',
          )}
        >
          {cover ? (
            <button
              type="button"
              onClick={() => setViewing(0)}
              aria-label={`Enlarge screenshot: ${cover.alt}`}
              className="group relative block w-full overflow-hidden rounded-xl border border-line bg-surface text-left shadow-card"
            >
              <ProjectImage
                image={cover}
                sizes="(min-width: 1280px) 650px, (min-width: 1024px) 55vw, 100vw"
                className="transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              />
              <span className="pointer-events-none absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1.5 font-mono text-[0.6875rem] text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand size={12} aria-hidden />
                enlarge
              </span>
            </button>
          ) : (
            <div className="grid aspect-[16/9] place-items-center rounded-xl border border-dashed border-line-strong font-mono text-xs text-fg-muted">
              [screenshot pending]
            </div>
          )}

          {thumbs.length > 0 && (
            <ul className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {thumbs.map((image, i) => (
                <li key={image.src} className="relative">
                  <button
                    type="button"
                    onClick={() => setViewing(i + 1)}
                    aria-label={`View screenshot ${i + 2} of ${project.images.length}: ${image.alt}`}
                    className="block w-full overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-line-strong"
                  >
                    <img
                      src={image.width > 800 ? image.src.replace(/\.webp$/, '-sm.webp') : image.src}
                      alt=""
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] h-auto w-full object-cover object-top"
                    />
                    {i === thumbs.length - 1 && hidden > 0 && (
                      <span className="absolute inset-0 grid place-items-center rounded-lg bg-black/60 font-mono text-xs text-white">
                        +{hidden}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Information */}
        <div className={cn('lg:col-span-5', reversed && 'lg:order-1')}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-mono text-sm text-accent">{project.number}</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <ProjectTypeBadge type={project.projectType} />
          </div>

          <p className="mt-4 font-mono text-xs text-fg-muted">{project.category}</p>
          <h3
            id={`project-${project.id}-title`}
            className="mt-1.5 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-fg-secondary">{project.tagline}</p>

          <p className="mt-5 leading-relaxed text-pretty text-fg-secondary">
            {project.shortDescription}
          </p>

          {project.contribution && (
            <div className="mt-6 rounded-xl border border-line bg-surface p-4">
              <p className="font-mono text-xs tracking-wider text-fg-muted uppercase">
                My contribution
              </p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed">
                {project.contribution.map((item) => (
                  <li key={item.slice(0, 32)} className="flex gap-2.5">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>

          {isMatch && selected && (
            <p className="mt-4 font-mono text-xs text-accent">✓ uses {selected}</p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.hasCaseStudy && (
              <ButtonLink
                href={caseStudyHref}
                icon={
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                }
              >
                Read case study
              </ButtonLink>
            )}
            <ButtonLink
              href={project.githubUrl}
              external
              variant="secondary"
              icon={<GithubIcon size={16} />}
              iconPosition="start"
              aria-label={`${project.title} on GitHub (opens in a new tab)`}
            >
              GitHub
            </ButtonLink>
            {project.liveUrl && (
              <ButtonLink
                href={project.liveUrl}
                external
                variant="ghost"
                aria-label={`${project.title} live demo (opens in a new tab)`}
              >
                Live demo
              </ButtonLink>
            )}
            {!project.hasCaseStudy && project.images.length > 1 && (
              <button
                type="button"
                onClick={() => setViewing(0)}
                className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-medium text-fg-secondary transition-colors hover:text-fg"
              >
                <Images size={16} aria-hidden />
                All screenshots
              </button>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        title={project.title}
        images={project.images}
        index={viewing}
        onChange={setViewing}
      />
    </m.article>
  );
}
