import { aboutBody, aboutIntro, focusAreas } from '../../data/about';
import { Reveal } from '../common/Reveal';
import { SectionHeading } from '../common/SectionHeading';
import { EngineeringLoop } from './EngineeringLoop';

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
      <div className="container-page">
        <Reveal>
          <SectionHeading index="01" label="About" id="about-title" title="What I build" />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <p className="text-xl leading-relaxed font-medium text-pretty sm:text-2xl sm:leading-snug">
              {aboutIntro}
            </p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-fg-secondary sm:text-lg">
              {aboutBody.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <EngineeringLoop />
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-wider text-fg-muted uppercase">
            Areas I work in
          </h3>
          <ul className="mt-5 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((area) => (
              <li key={area.title} className="border-b border-line py-5 sm:pr-8">
                <p className="font-medium">{area.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-fg-secondary">{area.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
