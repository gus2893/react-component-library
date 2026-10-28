import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';

export type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Colour intent. */
  variant?: BadgeVariant;
  /** Size. */
  size?: BadgeSize;
  /** Render a leading status dot. */
  dot?: boolean;
}

/** Small status or count label. Colour is never the only signal: always include text. */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'neutral', size = 'md', dot = false, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={cx('rcl-badge', `rcl-badge--${variant}`, `rcl-badge--${size}`, className)} {...rest}>
      {dot && <span className="rcl-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
});
Badge.displayName = 'Badge';
