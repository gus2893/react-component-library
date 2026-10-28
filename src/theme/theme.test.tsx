/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from '../components/Button/index.js';
import { Modal } from '../components/Modal/index.js';
import { useTheme } from './context.js';
import { createTheme, darkTheme, lightTheme, themeToVars } from './theme.js';
import { ThemeProvider } from './ThemeProvider.js';

const themeCss = readFileSync('src/styles/theme.css', 'utf8'); // vitest runs from the package root;
const varOf = (el: HTMLElement, name: string) => el.style.getPropertyValue(name);

/** Reads the --rcl-* defaults from theme.css, resolving light-dark(light, dark) for `mode`. */
function cssDefaults(mode: 0 | 1): Record<string, string> {
  const pick = (value: string) => {
    let out = value;
    for (;;) {
      const start = out.indexOf('light-dark(');
      if (start < 0) return out.replace(/\s+/g, ' ').trim();
      let depth = 0;
      const args: string[] = [];
      let argStart = start + 'light-dark('.length;
      let i = argStart;
      for (; i < out.length; i++) {
        const ch = out[i];
        if (ch === '(') depth++;
        else if (ch === ')' && depth-- === 0) break;
        else if (ch === ',' && depth === 0) {
          args.push(out.slice(argStart, i));
          argStart = i + 1;
        }
      }
      args.push(out.slice(argStart, i));
      out = out.slice(0, start) + args[mode]!.trim() + out.slice(i + 1);
    }
  };
  const vars: Record<string, string> = {};
  for (const [, name, value] of themeCss.matchAll(/(--rcl-[\w-]+):\s*([^;]+);/g)) {
    vars[name!] = pick(value!);
  }
  return vars;
}

describe('createTheme', () => {
  it('deep-merges partial overrides on top of lightTheme', () => {
    const theme = createTheme({ colors: { primary: '#7c3aed' }, font: { size: '15px' }, radius: '2px' });
    expect(theme.colors).toEqual({ ...lightTheme.colors, primary: '#7c3aed' });
    expect(theme.font).toEqual({ family: lightTheme.font.family, size: '15px' });
    expect(theme.radius).toBe('2px');
    expect(theme.spacing).toBe(lightTheme.spacing);
    expect(lightTheme.colors.primary).toBe('#1d4ed8');
  });

  it('accepts another base theme', () => {
    const theme = createTheme({ colors: { danger: 'red' } }, darkTheme);
    expect(theme.colors).toEqual({ ...darkTheme.colors, danger: 'red' });
  });
});

describe('ThemeProvider', () => {
  it('writes the theme as CSS variables on a wrapper element', () => {
    const theme = createTheme({ colors: { primary: '#7c3aed' } });
    render(
      <ThemeProvider theme={theme} data-testid="wrapper">
        <Button>Save</Button>
      </ThemeProvider>,
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper).toHaveClass('rcl-theme');
    for (const [name, value] of Object.entries(themeToVars(theme))) {
      expect(varOf(wrapper, name)).toBe(value);
    }
    expect(wrapper).toContainElement(screen.getByRole('button', { name: 'Save' }));
  });

  it('merges a nested provider onto the outer theme', () => {
    function Probe() {
      const { colors, radius } = useTheme();
      return <output data-testid="probe">{[colors.primary, radius, colors.text].join(' ')}</output>;
    }
    render(
      <ThemeProvider theme={{ colors: { primary: 'purple' }, radius: '0px' }} data-testid="outer">
        <ThemeProvider theme={{ colors: { primary: 'green' } }} data-testid="inner">
          <Probe />
        </ThemeProvider>
      </ThemeProvider>,
    );
    expect(varOf(screen.getByTestId('outer'), '--rcl-primary')).toBe('purple');
    expect(varOf(screen.getByTestId('inner'), '--rcl-primary')).toBe('green');
    expect(varOf(screen.getByTestId('inner'), '--rcl-radius')).toBe('0px');
    expect(screen.getByTestId('probe')).toHaveTextContent(`green 0px ${lightTheme.colors.text}`);
  });

  it('writes to <html> when global and restores on unmount', () => {
    const root = document.documentElement;
    const { unmount } = render(
      <ThemeProvider theme={darkTheme} global>
        <span>child</span>
      </ThemeProvider>,
    );
    expect(screen.getByText('child').parentElement).toBe(document.body.firstElementChild);
    expect(varOf(root, '--rcl-bg')).toBe(darkTheme.colors.background);
    unmount();
    expect(varOf(root, '--rcl-bg')).toBe('');
  });

  it('re-applies a scoped theme on portalled Modal content', () => {
    render(
      <ThemeProvider theme={{ colors: { surface: 'pink' } }}>
        <Modal open onClose={() => {}} title="Hi">
          Body
        </Modal>
      </ThemeProvider>,
    );
    expect(varOf(screen.getByTestId('rcl-modal-overlay'), '--rcl-surface')).toBe('pink');
  });
});

describe('without a provider', () => {
  it('useTheme returns lightTheme', () => {
    const wrapper = ({ children }: { children: ReactNode }) => <>{children}</>;
    expect(renderHook(() => useTheme(), { wrapper }).result.current).toBe(lightTheme);
  });

  it('renders components with no inline theme variables', () => {
    render(<Button>Plain</Button>);
    const button = screen.getByRole('button', { name: 'Plain' });
    expect(button).toHaveClass('rcl-button', 'rcl-button--primary');
    expect(button.getAttribute('style')).toBeNull();
  });

  it('ships CSS defaults equal to lightTheme (and darkTheme for data-theme="dark")', () => {
    expect(cssDefaults(0)).toEqual(themeToVars(lightTheme));
    expect(cssDefaults(1)).toEqual(themeToVars(darkTheme));
  });
});
