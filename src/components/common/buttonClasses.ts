import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-strong',
  secondary: 'border border-line-strong text-fg hover:border-fg-muted hover:bg-surface-elevated',
  ghost: 'text-fg-secondary hover:text-fg hover:bg-surface-elevated',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
};

/** Button styling, shared by <Button>, <ButtonLink> and section links styled as buttons. */
export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}): string {
  return cn(
    'group inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors duration-150 select-none',
    variants[variant],
    sizes[size],
    className,
  );
}
