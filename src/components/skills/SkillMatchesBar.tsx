import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { projects } from '../../data/projects';
import { useSkillSelection } from '../../hooks/useSkillSelection';

/**
 * Compact summary pinned to the bottom of the Skills section on small screens,
 * where the main results panel scrolls out of view. The panel above remains the
 * announced (aria-live) source, so this bar is not live.
 */
export function SkillMatchesBar() {
  const { selected, matching, clear } = useSkillSelection();
  const matched = matching ? projects.filter((p) => matching.has(p.id)) : [];

  return (
    <div className="pointer-events-none sticky bottom-4 z-20 mt-10 lg:hidden">
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-line-strong bg-surface-elevated/95 px-4 py-3 shadow-card backdrop-blur"
          >
            <p className="min-w-0 flex-1 text-sm">
              <span className="font-medium">{selected}</span>
              <span className="text-fg-muted"> → </span>
              <span className="text-fg-secondary">
                {matched.length > 0
                  ? matched.map((p) => `${p.number} ${p.title}`).join(' · ')
                  : 'not in these projects'}
              </span>
            </p>
            <button
              type="button"
              onClick={clear}
              aria-label="Clear selected technology"
              className="grid size-8 shrink-0 place-items-center rounded-full text-fg-muted transition-colors hover:text-fg"
            >
              <X size={15} aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
