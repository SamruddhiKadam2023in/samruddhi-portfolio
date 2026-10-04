import { useContext } from 'react';
import { SkillSelectionContext, type SkillSelection } from './skillSelectionContext';

export function useSkillSelection(): SkillSelection {
  const context = useContext(SkillSelectionContext);
  if (!context) throw new Error('useSkillSelection must be used inside <SkillSelectionProvider>');
  return context;
}
