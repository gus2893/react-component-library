import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox.js';

describe('Checkbox', () => {
  it('renders a labelled checkbox', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).not.toBeChecked();
  });

  it('toggles when the label is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Checkbox label="Accept terms" onChange={onChange} />);
    await user.click(screen.getByText('Accept terms'));
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('toggles with the Space key', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Accept terms" />);
    await user.tab();
    expect(screen.getByRole('checkbox')).toHaveFocus();
    await user.keyboard(' ');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('links the description', () => {
    render(<Checkbox label="Newsletter" description="Monthly digest" />);
    expect(screen.getByRole('checkbox')).toHaveAccessibleDescription('Monthly digest');
  });

  it('supports the indeterminate state', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} label="Select all" indeterminate />);
    expect(ref.current?.indeterminate).toBe(true);
    expect(screen.getByRole('checkbox')).toBePartiallyChecked();
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Locked" disabled />);
    await user.click(screen.getByRole('checkbox'));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
