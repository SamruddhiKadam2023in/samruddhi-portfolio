export type ProjectType = 'individual' | 'group';

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface Decision {
  context: string;
  decision: string;
  reason: string;
  tradeoff: string;
}

export interface TechGroup {
  label: 'Frontend' | 'Backend' | 'Database' | 'AI / ML' | 'APIs' | 'Tools';
  items: string[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface ArchitectureStep {
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  projectType: ProjectType;
  shortDescription: string;
  /** Technologies shown on the project card. */
  technologies: string[];
  featured: boolean;
  githubUrl: string;
  /** Only set when a real, working deployment exists. */
  liveUrl?: string;
  images: ProjectImage[];
  /** Group projects only: what I personally built. */
  contribution?: string[];
  /** Individual projects get a case-study page. */
  hasCaseStudy: boolean;
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  overview: string[];
  problem: string[];
  solution: string[];
  architecture?: ArchitectureStep[];
  features: Feature[];
  techGroups: TechGroup[];
  challenges?: Feature[];
  decisions?: Decision[];
}
