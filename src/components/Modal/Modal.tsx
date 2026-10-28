import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx.js';
import { mergeRefs } from '../../utils/mergeRefs.js';
import './Modal.css';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called when the user requests to close (Escape, overlay click, close button). */
  onClose: () => void;
  /** Dialog heading; referenced by `aria-labelledby`. */
  title: ReactNode;
  /** Optional supporting text; referenced by `aria-describedby`. */
  description?: ReactNode;
  /** Actions area, typically buttons. */
  footer?: ReactNode;
  /** Max width. */
  size?: ModalSize;
  /** Close when clicking the backdrop. */
  closeOnOverlayClick?: boolean;
  /** Close when pressing Escape. */
  closeOnEscape?: boolean;
  /** Hide the built-in close (X) button. */
  hideCloseButton?: boolean;
  /** Accessible label of the close button. */
  closeLabel?: string;
  /** Element to focus when the dialog opens. Defaults to the first focusable element in the body. */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Portal target. */
  container?: Element | null;
}

const FOCUSABLE = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && !el.closest('[inert],[aria-hidden="true"]'),
  );
}

/**
 * Accessible modal dialog: rendered in a portal, traps focus, closes on Escape,
 * locks page scroll and restores focus to the previously focused element on close.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    description,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    closeOnEscape = true,
    hideCloseButton = false,
    closeLabel = 'Close',
    initialFocusRef,
    container,
    className,
    children,
    onKeyDown,
    ...rest
  },
  ref,
) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const baseId = useId();
  const titleId = `rcl-modal-${baseId}-title`;
  const descriptionId = description ? `rcl-modal-${baseId}-description` : undefined;

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Focus management, scroll lock and focus restoration.
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const target = initialFocusRef?.current ?? (bodyRef.current && getFocusable(bodyRef.current)[0]) ?? dialog;
    target.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    // Pull focus back if it escapes the dialog (e.g. via programmatic focus).
    const handleFocusIn = (event: FocusEvent) => {
      if (dialog && event.target instanceof Node && !dialog.contains(event.target)) {
        dialog.focus();
      }
    };
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.body.style.overflow = overflow;
      if (previouslyFocused && previouslyFocused.isConnected && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [open, initialFocusRef]);

  if (!open || typeof document === 'undefined') return null;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    if (event.key === 'Escape' && closeOnEscape) {
      event.stopPropagation();
      onCloseRef.current();
      return;
    }

    if (event.key === 'Tab' && dialogRef.current) {
      const focusable = getFocusable(dialogRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onCloseRef.current();
    }
  };

  return createPortal(
    // The backdrop's mouse handler is a pointer convenience; keyboard users close via Escape
    // or the close button, so no role is needed here.
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="rcl-modal__overlay" data-testid="rcl-modal-overlay" onMouseDown={handleOverlayMouseDown}>
      {/* A div (not <dialog>) keeps focus/Escape handling identical across React 18/19 and test DOMs. */}
      {/* oxlint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={mergeRefs(ref, dialogRef)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cx('rcl-modal', `rcl-modal--${size}`, className)}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <div className="rcl-modal__header">
          <h2 id={titleId} className="rcl-modal__title">
            {title}
          </h2>
          {!hideCloseButton && (
            <button
              type="button"
              className="rcl-modal__close"
              aria-label={closeLabel}
              onClick={() => onCloseRef.current()}
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          )}
        </div>
        {description && (
          <p id={descriptionId} className="rcl-modal__description">
            {description}
          </p>
        )}
        <div ref={bodyRef} className="rcl-modal__body">
          {children}
        </div>
        {footer && <div className="rcl-modal__footer">{footer}</div>}
      </div>
    </div>,
    container ?? document.body,
  );
});
Modal.displayName = 'Modal';

/** Alias of {@link Modal} for teams that prefer the WAI-ARIA name. */
export const Dialog = Modal;
export type DialogProps = ModalProps;
