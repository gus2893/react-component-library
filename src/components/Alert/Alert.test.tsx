import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Alert } from './Alert.js';

describe('Alert', () => {
  it.each([
    ['info', 'status'],
    ['success', 'status'],
    ['warning', 'alert'],
    ['error', 'alert'],
  ] as const)('variant %s uses role="%s"', (variant, role) => {
    render(<Alert variant={variant}>Message</Alert>);
    expect(screen.getByRole(role)).toHaveClass(`rcl-alert--${variant}`);
  });

  it('allows overriding the role', () => {
    render(
      <Alert variant="error" role="status">
        Quiet error
      </Alert>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('Quiet error');
  });

  it('renders title and message', () => {
    render(<Alert title="Saved">All changes stored.</Alert>);
    expect(screen.getByText('Saved')).toHaveClass('rcl-alert__title');
    expect(screen.getByText('All changes stored.')).toBeInTheDocument();
  });

  it('renders a dismiss button only when onDismiss is provided', async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    const { rerender } = render(<Alert>Message</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    rerender(
      <Alert onDismiss={onDismiss} dismissLabel="Close alert">
        Message
      </Alert>,
    );
    await user.click(screen.getByRole('button', { name: 'Close alert' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('hides the icon when icon={null}', () => {
    const { container } = render(<Alert icon={null}>Message</Alert>);
    expect(container.querySelector('.rcl-alert__icon')).toBeNull();
  });
});
