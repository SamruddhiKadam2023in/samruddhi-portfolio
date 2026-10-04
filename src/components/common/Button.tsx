import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router';
import { buttonClasses, type ButtonSize, type ButtonVariant } from './buttonClasses';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  className?: string;
  children: ReactNode;
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
