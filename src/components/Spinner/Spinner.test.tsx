import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './Spinner.js';

describe('Spinner', () => {
  it('exposes a status role with a default accessible label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('accepts a custom label and size', () => {
    render(<Spinner label="Fetching invoices" size="lg" />);
    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('Fetching invoices');
    expect(status).toHaveClass('rcl-spinner--lg');
  });

  it('hides the visual circle from assistive tech', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.rcl-spinner__circle')).toHaveAttribute('aria-hidden', 'true');
  });
});
