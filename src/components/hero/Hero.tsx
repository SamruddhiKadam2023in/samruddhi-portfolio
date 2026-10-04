import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { site } from '../../data/site';
import { cn } from '../../utils/cn';
import { buttonClasses } from '../common/buttonClasses';
import { SocialLinks } from '../common/SocialLinks';
import { SectionLink } from '../navigation/SectionLink';
import { SystemDiagram } from './SystemDiagram';

const ease = [0.21, 0.6, 0.35, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease },
});

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-12 pb-16 sm:pt-20 lg:pt-24 lg:pb-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]"
      />

      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0)}
            className="flex items-center gap-2.5 font-mono text-xs text-fg-secondary sm:text-sm"
          >
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            {site.shortName} — {site.role}
          </motion.p>

          <motion.h1
            {...rise(0.06)}
            id="hero-title"
            className="mt-5 text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            I build useful software and <span className="text-accent">intelligent systems.</span>
          </motion.h1>

          <motion.p
            {...rise(0.12)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg-secondary"
          >
            {site.description}
          </motion.p>

          <motion.div {...rise(0.18)} className="mt-9 flex flex-wrap items-center gap-3">
            <SectionLink sectionId="projects" className={buttonClasses({})}>
              <span>View Projects</span>
              <ArrowDown
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-y-0.5"
              />
            </SectionLink>
            <SectionLink sectionId="contact" className={buttonClasses({ variant: 'secondary' })}>
              <span>Get In Touch</span>
              <ArrowRight
                size={16}
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              />
            </SectionLink>
          </motion.div>

          <motion.div {...rise(0.24)} className="mt-10 flex items-center gap-4">
            <span className="font-mono text-xs text-fg-muted">find me</span>
            <span aria-hidden className="h-px w-6 bg-line-strong" />
            <SocialLinks />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className={cn('mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none')}
        >
          <SystemDiagram />
        </motion.div>
      </div>
    </section>
  );
}
