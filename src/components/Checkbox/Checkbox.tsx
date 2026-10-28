import { forwardRef, useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { mergeRefs } from '../../utils/mergeRefs.js';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label. Clicking it toggles the checkbox. */
  label: ReactNode;
  /** Supporting text linked through `aria-describedby`. */
  description?: ReactNode;
  /** Renders the mixed state (sets `indeterminate` on the native input). */
  indeterminate?: boolean;
  /** Class name applied to the outer wrapper (`className` goes to the `<input>`). */
  wrapperClassName?: string;
}

/** Native checkbox with an associated label and optional description. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { label, description, indeterminate = false, id, className, wrapperClassName, disabled, ...rest },
  ref,
) {
  const generated = useId();
  const inputId = id ?? `rcl-checkbox-${generated}`;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const innerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (innerRef.current) innerRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={cx('rcl-checkbox', disabled && 'rcl-checkbox--disabled', wrapperClassName)}>
      <input
        ref={mergeRefs(ref, innerRef)}
        id={inputId}
        type="checkbox"
        disabled={disabled}
        className={cx('rcl-checkbox__input', className)}
        {...rest}
        aria-describedby={cx(rest['aria-describedby'], descriptionId) || undefined}
        {...(indeterminate ? { 'aria-checked': 'mixed' as const } : {})}
      />
      <div className="rcl-checkbox__text">
        <label className="rcl-checkbox__label" htmlFor={inputId}>
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="rcl-checkbox__description">
            {description}
          </p>
        )}
      </div>
    </div>
  );
});
Checkbox.displayName = 'Checkbox';
