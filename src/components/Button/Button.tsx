import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. */
  variant?: ButtonVariant;
  /** Size. */
  size?: ButtonSize;
  /** Shows a spinner, sets `aria-busy` and disables interaction. */
  loading?: boolean;
  /** Icon rendered before the label (hidden while loading). */
  leadingIcon?: ReactNode;
  /** Icon rendered after the label. */
  trailingIcon?: ReactNode;
  /** Stretch to the full width of the container. */
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    leadingIcon,
    trailingIcon,
    fullWidth,
    type = 'button',
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      className={cx(
        'rcl-button',
        `rcl-button--${variant}`,
        `rcl-button--${size}`,
        fullWidth && 'rcl-button--full-width',
        className,
      )}
      {...rest}
    >
      {loading ? (
        <span className="rcl-button__spinner" aria-hidden="true" />
      ) : (
        leadingIcon && (
          <span className="rcl-button__icon" aria-hidden="true">
            {leadingIcon}
          </span>
        )
      )}
      <span className="rcl-button__label">{children}</span>
      {trailingIcon && (
        <span className="rcl-button__icon" aria-hidden="true">
          {trailingIcon}
        </span>
      )}
    </button>
  );
});
Button.displayName = 'Button';
