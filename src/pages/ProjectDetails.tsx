import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { useParams } from 'react-router';
import { ButtonLink } from '../components/common/Button';
import { ErrorState } from '../components/common/ErrorState';
import { ArchitectureFlow } from '../components/projects/case-study/ArchitectureFlow';
import { CaseSection, Prose } from '../components/projects/case-study/CaseSection';
import { CaseStudyFooter } from '../components/projects/case-study/CaseStudyFooter';
import { CaseStudyHero } from '../components/projects/case-study/CaseStudyHero';
import { CaseStudyNav } from '../components/projects/case-study/CaseStudyNav';
import { DecisionList } from '../components/projects/case-study/DecisionList';
import { FeatureList } from '../components/projects/case-study/FeatureList';
import { ScreenshotGallery } from '../components/projects/case-study/ScreenshotGallery';
import { TechGroups } from '../components/projects/case-study/TechGroups';
import { caseStudies } from '../data/caseStudies';
import { getProjectBySlug } from '../data/projects';
import { usePageMeta } from '../hooks/usePageMeta';
import { summarize } from '../utils/text';

interface Section {
  id: string;
  label: string;
  content: ReactNode;
}

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);
  const study = project ? caseStudies[project.id] : undefined;
  usePageMeta(
    project && study
      ? {
          title: `${project.title} case study`,
          description: summarize(`${project.tagline}. ${project.shortDescription}`),
          path: `/projects/${project.slug}`,
        }
      : { title: 'Project not found', noindex: true },
  );

  if (!project || !study) {
    return (
      <ErrorState
        code="404 · project"
        title="That project isn’t here."
        message="There’s no case study at this address. The projects with case studies are listed on the home page."
      >
        <ButtonLink
          href="/#projects"
          icon={<ArrowLeft size={16} aria-hidden />}
          iconPosition="start"
        >
          View all projects
        </ButtonLink>
      </ErrorState>
    );
  }

  // Optional sections are dropped when there is no documented material for them.
  const sections: Section[] = [
    { id: 'overview', label: 'Overview', content: <Prose paragraphs={study.overview} /> },
    { id: 'problem', label: 'Problem', content: <Prose paragraphs={study.problem} /> },
    {
      id: 'solution',
      label: 'Solution',
      content: (
        <>
          <Prose paragraphs={study.solution} />
          {study.architecture && <ArchitectureFlow steps={study.architecture} />}
        </>
      ),
    },
    { id: 'features', label: 'Key features', content: <FeatureList items={study.features} /> },
    { id: 'technology', label: 'Technology', content: <TechGroups groups={study.techGroups} /> },
  ];
  if (study.challenges?.length) {
    sections.push({
      id: 'challenges',
      label: 'Technical challenges',
      content: <FeatureList items={study.challenges} />,
    });
  }
  if (study.decisions?.length) {
    sections.push({
      id: 'decisions',
      label: 'Engineering decisions',
      content: <DecisionList decisions={study.decisions} />,
    });
  }
  sections.push({
    id: 'screenshots',
    label: 'Screenshots',
    content: <ScreenshotGallery title={project.title} images={project.images} />,
  });

  return (
    <article aria-labelledby="case-title">
      <CaseStudyHero project={project} />

      <div className="container-page grid gap-12 border-t border-line py-16 sm:py-20 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <CaseStudyNav items={sections.map(({ id, label }) => ({ id, label }))} />
        </aside>

        <div className="space-y-20 sm:space-y-24 lg:col-span-9">
          {sections.map((section, index) => (
            <CaseSection
              key={section.id}
              id={section.id}
              index={String(index + 1).padStart(2, '0')}
              title={section.label}
            >
              {section.content}
            </CaseSection>
          ))}

          <CaseStudyFooter project={project} />
        </div>
      </div>
    </article>
  );
}
