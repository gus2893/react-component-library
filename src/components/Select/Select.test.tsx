import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Select } from './Select.js';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma', disabled: true },
];

describe('Select', () => {
  it('renders a labelled native combobox with options', () => {
    render(<Select label="Letter" options={options} />);
    const select = screen.getByRole('combobox', { name: 'Letter' });
    expect(select.tagName).toBe('SELECT');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByRole('option', { name: 'Gamma' })).toBeDisabled();
  });

  it('renders a placeholder option', () => {
    render(<Select label="Letter" options={options} placeholder="Pick one" required />);
    const placeholder = screen.getByRole('option', { name: 'Pick one' });
    expect(placeholder).toHaveValue('');
    expect(placeholder).toBeDisabled();
  });

  it('supports option children', () => {
    render(
      <Select label="Size">
        <option value="s">Small</option>
        <option value="l">Large</option>
      </Select>,
    );
    expect(screen.getAllByRole('option')).toHaveLength(2);
  });

  it('selects an option and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Select label="Letter" options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByRole('combobox'), 'b');
    expect(screen.getByRole('combobox')).toHaveValue('b');
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('wires hint, error and aria-invalid', () => {
    render(<Select label="Letter" options={options} hint="Choose wisely" error="Required" />);
    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAccessibleDescription('Choose wisely Required');
  });
});
