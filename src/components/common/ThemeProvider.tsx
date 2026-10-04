import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ThemeContext } from '../../hooks/themeContext';
import type { Theme } from '../../types/theme';
import { getInitialTheme, readStoredTheme, storeTheme } from '../../utils/theme';

const TRANSITION_MS = 300;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#0c0d0f' : '#f6f5f1');
  }, [theme]);

  // Follow system changes only until the visitor makes an explicit choice.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!readStoredTheme()) setThemeState(event.matches ? 'light' : 'dark');
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.add('theme-transition');
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(
      () => root.classList.remove('theme-transition'),
      TRANSITION_MS,
    );
    storeTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  );

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
