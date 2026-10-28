import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'role'> {
  /** Visible label. */
  label: ReactNode;
  /** Supporting text linked through `aria-describedby`. */
  description?: ReactNode;
  /** Size. */
  size?: SwitchSize;
  /** Place the label before the track. */
  labelFirst?: boolean;
  /** Class name applied to the outer wrapper (`className` goes to the `<input>`). */
  wrapperClassName?: string;
}

/**
 * On/off toggle built on a native checkbox with `role="switch"`, so it works in forms,
 * supports Space to toggle and reports its state to assistive technology.
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { label, description, size = 'md', labelFirst = false, id, className, wrapperClassName, disabled, ...rest },
  ref,
) {
  const generated = useId();
  const inputId = id ?? `rcl-switch-${generated}`;
  const descriptionId = description ? `${inputId}-description` : undefined;

  return (
    <div
      className={cx(
        'rcl-switch',
        `rcl-switch--${size}`,
        labelFirst && 'rcl-switch--label-first',
        disabled && 'rcl-switch--disabled',
        wrapperClassName,
      )}
    >
      <span className="rcl-switch__control">
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          // The native checked state is exposed for role="switch"; mirror it when controlled.
          aria-checked={rest.checked}
          disabled={disabled}
          className={cx('rcl-switch__input', className)}
          {...rest}
          aria-describedby={cx(rest['aria-describedby'], descriptionId) || undefined}
        />
        <span className="rcl-switch__track" aria-hidden="true">
          <span className="rcl-switch__thumb" />
        </span>
      </span>
      <span className="rcl-switch__text">
        <label className="rcl-switch__label" htmlFor={inputId}>
          {label}
        </label>
        {description && (
          <span id={descriptionId} className="rcl-switch__description">
            {description}
          </span>
        )}
      </span>
    </div>
  );
});
Switch.displayName = 'Switch';
