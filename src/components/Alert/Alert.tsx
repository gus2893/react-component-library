import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import './Alert.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Intent. `warning` / `error` use `role="alert"` (assertive); others use `role="status"` (polite). */
  variant?: AlertVariant;
  /** Bold heading shown above the message. */
  title?: ReactNode;
  /** Custom icon; pass `null` to hide the default icon. */
  icon?: ReactNode;
  /** When provided, a dismiss button is rendered that calls this handler. */
  onDismiss?: () => void;
  /** Accessible label of the dismiss button. */
  dismissLabel?: string;
}

const icons: Record<AlertVariant, ReactNode> = {
  info: (
    <svg viewBox="0 0 20 20" fill="currentColor" focusable="false">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9V9h2v5zm0-7H9V5h2v2z" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 20 20" fill="currentColor" focusable="false">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm-1.2 11.6L5.4 10.2l1.4-1.4 2 2 4.4-4.4 1.4 1.4-5.8 5.8z" />
    </svg>
  ),
  warning: (
    <svg viewBox="0 0 20 20" fill="currentColor" focusable="false">
      <path d="M10 2L1 18h18L10 2zm1 13H9v-2h2v2zm0-3H9V8h2v4z" />
    </svg>
  ),
  error: (
    <svg viewBox="0 0 20 20" fill="currentColor" focusable="false">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.5 10.1l-1.4 1.4L10 11.4l-2.1 2.1-1.4-1.4L8.6 10 6.5 7.9l1.4-1.4L10 8.6l2.1-2.1 1.4 1.4-2.1 2.1 2.1 2.1z" />
    </svg>
  ),
};

/** Inline message communicating status or feedback. */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, icon, onDismiss, dismissLabel = 'Dismiss', role, className, children, ...rest },
  ref,
) {
  const resolvedRole = role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status');
  const resolvedIcon = icon === undefined ? icons[variant] : icon;

  return (
    <div ref={ref} role={resolvedRole} className={cx('rcl-alert', `rcl-alert--${variant}`, className)} {...rest}>
      {resolvedIcon && (
        <span className="rcl-alert__icon" aria-hidden="true">
          {resolvedIcon}
        </span>
      )}
      <div className="rcl-alert__content">
        {title && <div className="rcl-alert__title">{title}</div>}
        {children && <div className="rcl-alert__message">{children}</div>}
      </div>
      {onDismiss && (
        <button type="button" className="rcl-alert__dismiss" aria-label={dismissLabel} onClick={onDismiss}>
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </button>
      )}
    </div>
  );
});
Alert.displayName = 'Alert';
