export interface Skill {
  name: string;
  category: string;
  /** Ids of projects on this site that use the skill. */
  projects: string[];
}

export interface SkillCategory {
  id: string;
  number: string;
  label: string;
}
