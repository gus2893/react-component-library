import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx.js';

export type CardVariant = 'outlined' | 'elevated' | 'filled';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Surface style. */
  variant?: CardVariant;
  /** Inner padding. */
  padding?: CardPadding;
}

/** Surface container for grouping related content. Compose with CardHeader / CardBody / CardFooter. */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = 'outlined', padding = 'md', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('rcl-card', `rcl-card--${variant}`, `rcl-card--padding-${padding}`, className)}
      {...rest}
    />
  );
});
Card.displayName = 'Card';

export type CardSectionProps = HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardSectionProps>(function CardHeader(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('rcl-card__header', className)} {...rest} />;
});
CardHeader.displayName = 'CardHeader';

export const CardBody = forwardRef<HTMLDivElement, CardSectionProps>(function CardBody({ className, ...rest }, ref) {
  return <div ref={ref} className={cx('rcl-card__body', className)} {...rest} />;
});
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardSectionProps>(function CardFooter(
  { className, ...rest },
  ref,
) {
  return <div ref={ref} className={cx('rcl-card__footer', className)} {...rest} />;
});
CardFooter.displayName = 'CardFooter';
