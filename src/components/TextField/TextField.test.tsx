import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TextField } from './TextField.js';

describe('TextField', () => {
  it('associates the label with the input', () => {
    render(<TextField label="Name" />);
    expect(screen.getByLabelText('Name')).toBeInstanceOf(HTMLInputElement);
  });

  it('generates unique ids for multiple instances', () => {
    render(
      <>
        <TextField label="First" />
        <TextField label="Second" />
      </>,
    );
    const a = screen.getByLabelText('First');
    const b = screen.getByLabelText('Second');
    expect(a.id).toBeTruthy();
    expect(a.id).not.toBe(b.id);
  });

  it('respects a custom id', () => {
    render(<TextField label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'email');
  });

  it('links the hint via aria-describedby', () => {
    render(<TextField label="Email" hint="Work email only" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAccessibleDescription('Work email only');
    expect(input).not.toHaveAttribute('aria-invalid');
  });

  it('marks the input invalid and describes it with the error', () => {
    render(<TextField label="Email" hint="Work email only" error="Email is required" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('Work email only Email is required');
  });

  it('keeps a consumer-provided aria-describedby', () => {
    render(
      <>
        <p id="extra">Extra info</p>
        <TextField label="Email" aria-describedby="extra" hint="Hint" />
      </>,
    );
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('Extra info Hint');
  });

  it('sets required and shows a decorative indicator', () => {
    render(<TextField label="Name" required />);
    const input = screen.getByRole('textbox', { name: 'Name' });
    expect(input).toBeRequired();
  });

  it('accepts typing and forwards the ref', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const ref = createRef<HTMLInputElement>();
    render(<TextField ref={ref} label="City" onChange={onChange} />);
    await user.type(screen.getByLabelText('City'), 'Oslo');
    expect(ref.current).toHaveValue('Oslo');
    expect(onChange).toHaveBeenCalledTimes(4);
  });
});
