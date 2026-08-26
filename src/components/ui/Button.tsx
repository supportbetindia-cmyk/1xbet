import React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

/*
 * Rectangles with a 4px radius, not pills. The betting-board language is
 * square-ish and structural; fully rounded buttons are the giveaway of a
 * generic template.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] hover:bg-brand-500 active:bg-brand-700',
  secondary:
    'bg-white text-ink-900 ring-1 ring-inset ring-ink-300 hover:ring-ink-400 hover:bg-ink-25 active:bg-ink-50',
  ghost:
    'text-ink-700 hover:bg-ink-100 hover:text-ink-900 active:bg-ink-200',
  onDark:
    'bg-line text-white ring-1 ring-inset ring-white/20 backdrop-blur-md hover:bg-white/16 hover:ring-white/35 active:bg-white/20',
};

const SIZES: Record<Size, string> = {
  // min-heights keep every control at a comfortable touch target
  sm: 'min-h-[40px] px-4 text-[13px] gap-2',
  md: 'min-h-[46px] px-5 text-[14px] gap-2.5',
  lg: 'min-h-[52px] px-7 text-[15px] gap-3',
};

const BASE =
  'inline-flex items-center justify-center rounded-[4px] font-medium tracking-[-0.01em] ' +
  'transition-[background-color,box-shadow,color] duration-200 cursor-pointer select-none ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ' +
  'disabled:pointer-events-none disabled:opacity-45';

function classes(variant: Variant, size: Size, className?: string) {
  return [BASE, VARIANTS[variant], SIZES[size], className].filter(Boolean).join(' ');
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}) => (
  <button type={type} className={classes(variant, size, className)} {...rest}>
    {children}
  </button>
);

type ButtonLinkProps = BaseProps & {
  href: string;
  external?: boolean;
  'aria-label'?: string;
};

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  external,
  ...rest
}) => {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(variant, size, className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
};
