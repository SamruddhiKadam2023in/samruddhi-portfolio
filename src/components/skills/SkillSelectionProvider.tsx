import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { skills } from '../../data/skills';
import { SkillSelectionContext } from '../../hooks/skillSelectionContext';

/** Shares the selected skill between the Skills and Projects sections. */
export function SkillSelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string | null>(null);

  const toggle = useCallback(
    (skill: string) => setSelected((current) => (current === skill ? null : skill)),
    [],
  );
  const clear = useCallback(() => setSelected(null), []);

  const value = useMemo(() => {
    const skill = selected ? skills.find((s) => s.name === selected) : undefined;
    return {
      selected,
      matching: skill ? new Set(skill.projects) : null,
      toggle,
      clear,
    };
  }, [selected, toggle, clear]);

  return <SkillSelectionContext value={value}>{children}</SkillSelectionContext>;
}
