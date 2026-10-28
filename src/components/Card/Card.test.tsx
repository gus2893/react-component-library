import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Card, CardBody, CardFooter, CardHeader } from './Card.js';

describe('Card', () => {
  it('renders its sections', () => {
    render(
      <Card data-testid="card">
        <CardHeader>Title</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveClass('rcl-card', 'rcl-card--outlined', 'rcl-card--padding-md');
    expect(screen.getByText('Title')).toHaveClass('rcl-card__header');
    expect(screen.getByText('Body')).toHaveClass('rcl-card__body');
    expect(screen.getByText('Footer')).toHaveClass('rcl-card__footer');
  });

  it('applies variant and padding', () => {
    render(
      <Card data-testid="card" variant="elevated" padding="lg">
        x
      </Card>,
    );
    expect(screen.getByTestId('card')).toHaveClass('rcl-card--elevated', 'rcl-card--padding-lg');
  });

  it('passes through native attributes and forwards refs', () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Card ref={ref} role="region" aria-label="Summary" className="extra">
        Content
      </Card>,
    );
    const region = screen.getByRole('region', { name: 'Summary' });
    expect(region).toBe(ref.current);
    expect(region).toHaveClass('extra');
  });
});
