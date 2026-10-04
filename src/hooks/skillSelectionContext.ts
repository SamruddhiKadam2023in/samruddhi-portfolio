import { createContext } from 'react';

export interface SkillSelection {
  /** Name of the selected skill, or null when nothing is selected. */
  selected: string | null;
  /** Ids of projects that use the selected skill; null when nothing is selected. */
  matching: ReadonlySet<string> | null;
  toggle: (skill: string) => void;
  clear: () => void;
}

export const SkillSelectionContext = createContext<SkillSelection | null>(null);
