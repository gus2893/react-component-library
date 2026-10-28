import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';

export type SpinnerSize = 'sm' | 'md' | 'lg';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual size. */
  size?: SpinnerSize;
  /** Accessible label announced to assistive technology. */
  label?: string;
}

/** Indeterminate loading indicator, exposed as a polite live `status` region. */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span ref={ref} role="status" className={cx('rcl-spinner', `rcl-spinner--${size}`, className)} {...rest}>
      <span className="rcl-spinner__circle" aria-hidden="true" />
      <span className="rcl-visually-hidden">{label}</span>
    </span>
  );
});
Spinner.displayName = 'Spinner';
