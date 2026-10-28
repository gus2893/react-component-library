import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Switch } from './Switch.js';

describe('Switch', () => {
  it('renders with role="switch" and a label', () => {
    render(<Switch label="Dark mode" />);
    const toggle = screen.getByRole('switch', { name: 'Dark mode' });
    expect(toggle).not.toBeChecked();
  });

  it('toggles on click and reports checked state', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Dark mode" onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Switch label="Wifi" defaultChecked />);
    await user.tab();
    await user.keyboard(' ');
    expect(screen.getByRole('switch')).not.toBeChecked();
  });

  it('supports controlled usage', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Switch label="Locked" checked onChange={onChange} />);
    await user.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('links the description and respects disabled', () => {
    render(<Switch label="Beta" description="Try new features" disabled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAccessibleDescription('Try new features');
    expect(toggle).toBeDisabled();
  });
});
