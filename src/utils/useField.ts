import { useId } from 'react';
import { cx } from './cx.js';

export interface UseFieldOptions {
  id?: string;
  hint?: unknown;
  error?: unknown;
  'aria-describedby'?: string;
}

/** Generates stable ids and aria-describedby wiring for labelled form fields. */
export function useField({ id, hint, error, 'aria-describedby': describedBy }: UseFieldOptions) {
  const generated = useId();
  const inputId = id ?? `rcl-field-${generated}`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const ariaDescribedBy = cx(describedBy, hintId, errorId) || undefined;
  return { inputId, hintId, errorId, ariaDescribedBy, invalid: Boolean(error) };
}
