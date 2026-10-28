import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Stack } from './Stack.js';

describe('Stack', () => {
  it('defaults to a column with gap 4', () => {
    render(<Stack data-testid="stack">x</Stack>);
    expect(screen.getByTestId('stack')).toHaveClass('rcl-stack', 'rcl-stack--column', 'rcl-stack--gap-4');
  });

  it('maps layout props to modifier classes', () => {
    render(
      <Stack data-testid="stack" direction="row" gap={2} align="center" justify="between" wrap inline>
        x
      </Stack>,
    );
    expect(screen.getByTestId('stack')).toHaveClass(
      'rcl-stack--row',
      'rcl-stack--gap-2',
      'rcl-stack--align-center',
      'rcl-stack--justify-between',
      'rcl-stack--wrap',
      'rcl-stack--inline',
    );
  });

  it('renders children and native attributes', () => {
    render(
      <Stack role="list" aria-label="Items">
        <div role="listitem">A</div>
        <div role="listitem">B</div>
      </Stack>,
    );
    expect(screen.getByRole('list', { name: 'Items' }).children).toHaveLength(2);
  });
});
