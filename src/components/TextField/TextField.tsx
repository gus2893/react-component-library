import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx.js';
import { useField } from '../../utils/useField.js';

export type TextFieldSize = 'sm' | 'md' | 'lg';

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label, associated with the input via `htmlFor`/`id`. */
  label: ReactNode;
  /** Helper text shown below the input and linked through `aria-describedby`. */
  hint?: ReactNode;
  /** Error message. When set, the input gets `aria-invalid="true"`. */
  error?: ReactNode;
  /** Control height. */
  size?: TextFieldSize;
  /** Class name applied to the outer wrapper (`className` goes to the `<input>`). */
  wrapperClassName?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { label, hint, error, size = 'md', id, required, className, wrapperClassName, type = 'text', ...rest },
  ref,
) {
  const { inputId, hintId, errorId, ariaDescribedBy, invalid } = useField({
    id,
    hint,
    error,
    'aria-describedby': rest['aria-describedby'],
  });

  return (
    <div className={cx('rcl-field', `rcl-field--${size}`, 'rcl-text-field', wrapperClassName)}>
      <label className="rcl-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="rcl-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        className={cx('rcl-field__control', className)}
        {...rest}
        aria-invalid={invalid || rest['aria-invalid'] || undefined}
        aria-describedby={ariaDescribedBy}
      />
      {hint && (
        <p id={hintId} className="rcl-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="rcl-field__error">
          {error}
        </p>
      )}
    </div>
  );
});
TextField.displayName = 'TextField';
