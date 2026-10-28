import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx.js';
import './Tooltip.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

type TriggerProps = {
  'aria-describedby'?: string;
  onMouseEnter?: (event: MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLElement>) => void;
  onFocus?: (event: FocusEvent<HTMLElement>) => void;
  onBlur?: (event: FocusEvent<HTMLElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
};

export interface TooltipProps {
  /** Tooltip text. Keep it short and non-interactive. */
  content: ReactNode;
  /** A single focusable element (e.g. a Button) that triggers the tooltip. */
  children: ReactElement<TriggerProps>;
  /** Preferred side. */
  placement?: TooltipPlacement;
  /** Delay before showing on hover, in ms. Keyboard focus shows immediately. */
  delay?: number;
  /** Disable the tooltip without changing the tree. */
  disabled?: boolean;
  /** Class name applied to the tooltip bubble. */
  className?: string;
}

/**
 * Accessible tooltip (WAI-ARIA tooltip pattern): shown on hover and keyboard focus,
 * hidden on blur, mouse leave and Escape. The trigger references the tooltip via
 * `aria-describedby`.
 */
export function Tooltip({
  content,
  children,
  placement = 'top',
  delay = 300,
  disabled = false,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tooltipId = `rcl-tooltip-${useId()}`;

  const clear = () => {
    if (timer.current !== undefined) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
  };

  useEffect(
    () => () => {
      if (timer.current !== undefined) clearTimeout(timer.current);
    },
    [],
  );

  if (!isValidElement(children)) return children;
  if (disabled) return children;

  const show = (immediate: boolean) => {
    clear();
    if (immediate || delay <= 0) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clear();
    setOpen(false);
  };

  const childProps = children.props;
  // oxlint-disable-next-line react/refs -- false positive: the handlers below only touch the timer ref when events fire
  const trigger = cloneElement(children, {
    'aria-describedby': cx(childProps['aria-describedby'], tooltipId),
    onMouseEnter: (e: MouseEvent<HTMLElement>) => {
      childProps.onMouseEnter?.(e);
      show(false);
    },
    onMouseLeave: (e: MouseEvent<HTMLElement>) => {
      childProps.onMouseLeave?.(e);
      hide();
    },
    onFocus: (e: FocusEvent<HTMLElement>) => {
      childProps.onFocus?.(e);
      show(true);
    },
    onBlur: (e: FocusEvent<HTMLElement>) => {
      childProps.onBlur?.(e);
      hide();
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      childProps.onKeyDown?.(e);
      if (e.key === 'Escape' && open) {
        e.stopPropagation();
        hide();
      }
    },
  });

  return (
    <span className="rcl-tooltip-anchor">
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        hidden={!open}
        className={cx('rcl-tooltip', `rcl-tooltip--${placement}`, className)}
      >
        {content}
      </span>
    </span>
  );
}
Tooltip.displayName = 'Tooltip';
