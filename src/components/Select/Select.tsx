import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';
import { useField } from '../../utils/useField.js';
import '../../styles/field.css';
import './Select.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Visible label, associated with the select via `htmlFor`/`id`. */
  label: ReactNode;
  /** Options to render. Alternatively pass `<option>` / `<optgroup>` children. */
  options?: SelectOption[];
  /** Renders a first, empty option with this text (disabled when `required`). */
  placeholder?: string;
  /** Helper text linked through `aria-describedby`. */
  hint?: ReactNode;
  /** Error message. When set, the select gets `aria-invalid="true"`. */
  error?: ReactNode;
  /** Control height. */
  size?: SelectSize;
  /** Class name applied to the outer wrapper (`className` goes to the `<select>`). */
  wrapperClassName?: string;
}

/** Native `<select>` with label, hint and error wiring. Fully keyboard and screen-reader accessible. */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    label,
    options,
    placeholder,
    hint,
    error,
    size = 'md',
    id,
    required,
    className,
    wrapperClassName,
    children,
    ...rest
  },
  ref,
) {
  const { inputId, hintId, errorId, ariaDescribedBy, invalid } = useField({
    id,
    hint,
    error,
    'aria-describedby': rest['aria-describedby'],
  });

  return (
    <div className={cx('rcl-field', `rcl-field--${size}`, 'rcl-select', wrapperClassName)}>
      <label className="rcl-field__label" htmlFor={inputId}>
        {label}
        {required && (
          <span className="rcl-field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <div className="rcl-select__wrapper">
        <select
          ref={ref}
          id={inputId}
          required={required}
          className={cx('rcl-field__control', 'rcl-select__control', className)}
          {...rest}
          aria-invalid={invalid || rest['aria-invalid'] || undefined}
          aria-describedby={ariaDescribedBy}
        >
          {placeholder !== undefined && (
            <option value="" disabled={required}>
              {placeholder}
            </option>
          )}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
          {children}
        </select>
        <svg className="rcl-select__chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
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
Select.displayName = 'Select';
