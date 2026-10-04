import { AnimatePresence, m } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative grid size-10 place-items-center overflow-hidden rounded-full border border-line text-fg-secondary transition-colors hover:border-line-strong hover:text-fg"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          initial={{ y: -14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          {isDark ? <Moon size={17} aria-hidden /> : <Sun size={17} aria-hidden />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
