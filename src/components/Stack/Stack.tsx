import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import './Stack.css';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  /** Main axis. */
  direction?: StackDirection;
  /** Gap between children, mapped to the `--rcl-space-*` token scale. */
  gap?: StackGap;
  /** Cross-axis alignment (`align-items`). */
  align?: StackAlign;
  /** Main-axis distribution (`justify-content`). */
  justify?: StackJustify;
  /** Allow children to wrap onto multiple lines. */
  wrap?: boolean;
  /** Use `inline-flex` instead of `flex`. */
  inline?: boolean;
}

/** Flexbox layout primitive that spaces children using design-token gaps. */
export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { direction = 'column', gap = 4, align, justify, wrap = false, inline = false, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'rcl-stack',
        `rcl-stack--${direction}`,
        `rcl-stack--gap-${gap}`,
        align && `rcl-stack--align-${align}`,
        justify && `rcl-stack--justify-${justify}`,
        wrap && 'rcl-stack--wrap',
        inline && 'rcl-stack--inline',
        className,
      )}
      {...rest}
    />
  );
});
Stack.displayName = 'Stack';
