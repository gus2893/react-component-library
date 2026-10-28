import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './Badge.js';

describe('Badge', () => {
  it('renders its text with default classes', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toHaveClass('rcl-badge', 'rcl-badge--neutral', 'rcl-badge--md');
  });

  it('applies variant and size', () => {
    render(
      <Badge variant="danger" size="sm">
        Failed
      </Badge>,
    );
    expect(screen.getByText('Failed')).toHaveClass('rcl-badge--danger', 'rcl-badge--sm');
  });

  it('renders a decorative dot', () => {
    const { container } = render(<Badge dot>Online</Badge>);
    const dot = container.querySelector('.rcl-badge__dot');
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('passes through native attributes', () => {
    render(
      <Badge title="3 unread messages" data-testid="badge">
        3
      </Badge>,
    );
    expect(screen.getByTestId('badge')).toHaveAttribute('title', '3 unread messages');
  });
});
