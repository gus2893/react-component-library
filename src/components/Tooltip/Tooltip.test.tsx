import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tooltip } from './Tooltip.js';

describe('Tooltip', () => {
  it('describes the trigger via aria-describedby and is hidden initially', () => {
    render(
      <Tooltip content="Copy to clipboard">
        <button type="button">Copy</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Copy' });
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip).not.toBeVisible();
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
    expect(trigger).toHaveAccessibleDescription('Copy to clipboard');
  });

  it('shows immediately on keyboard focus and hides on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard">
        <button type="button">Copy</button>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeVisible();
    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('hides on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard">
        <button type="button">Copy</button>
      </Tooltip>,
    );
    await user.tab();
    expect(screen.getByRole('tooltip')).toBeVisible();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on hover after the delay and hides on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" delay={50}>
        <button type="button">?</button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(await screen.findByRole('tooltip')).toBeVisible();
    await user.unhover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('preserves the child event handlers and existing aria-describedby', async () => {
    const user = userEvent.setup();
    const onFocus = vi.fn();
    render(
      <>
        <span id="other">Other</span>
        <Tooltip content="Tip">
          <button type="button" aria-describedby="other" onFocus={onFocus}>
            Btn
          </button>
        </Tooltip>
      </>,
    );
    await user.tab();
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button')).toHaveAccessibleDescription('Other Tip');
  });

  it('renders only the child when disabled', () => {
    render(
      <Tooltip content="Tip" disabled>
        <button type="button">Btn</button>
      </Tooltip>,
    );
    expect(screen.queryByRole('tooltip', { hidden: true })).not.toBeInTheDocument();
  });
});
