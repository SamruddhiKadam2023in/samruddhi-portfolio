import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  className?: string;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast hover:bg-accent-strong',
  secondary: 'border border-line-strong text-fg hover:border-fg-muted hover:bg-surface-elevated',
  ghost: 'text-fg-secondary hover:text-fg hover:bg-surface-elevated',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[0.9375rem] gap-2',
};

function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<BaseProps, 'variant' | 'size' | 'className'>): string {
  return cn(
    'group inline-flex shrink-0 items-center justify-center rounded-full font-medium transition-colors duration-150 select-none',
    variants[variant],
    sizes[size],
    className,
  );
}

function Content({ icon, iconPosition = 'end', children }: Omit<BaseProps, 'variant' | 'size'>) {
  return (
    <>
      {icon && iconPosition === 'start' && icon}
      <span>{children}</span>
      {icon && iconPosition === 'end' && icon}
    </>
  );
}

type ButtonProps = BaseProps & Omit<ComponentPropsWithoutRef<'button'>, 'children' | 'className'>;

export function Button({
  variant,
  size,
  icon,
  iconPosition,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type="button" className={buttonClasses({ variant, size, className })} {...rest}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}

type AnchorProps = BaseProps & {
  href: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<'a'>, 'children' | 'className' | 'href'>;

/** A link styled as a button. Internal paths use the router; `external` opens a new tab. */
export function ButtonLink({
  variant,
  size,
  icon,
  iconPosition,
  className,
  children,
  href,
  external,
  ...rest
}: AnchorProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <Content icon={icon} iconPosition={iconPosition}>
      {children}
    </Content>
  );

  if (href.startsWith('/') && !external) {
    return (
      <Link to={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {content}
    </a>
  );
}
