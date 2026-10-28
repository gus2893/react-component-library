/** The complete theme: a small set of values every component is styled from. */
export interface Theme {
  colors: {
    primary: string;
    danger: string;
    success: string;
    warning: string;
    /** Page background; also used as the text colour on solid primary/danger fills. */
    background: string;
    /** Background of cards, modals and inputs. */
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  /** Base corner radius. Small/large radii are derived from it. */
  radius: string;
  /** Base spacing unit. Components use multiples of it (e.g. 4 × unit = 1rem). */
  spacing: string;
  font: {
    family: string;
    /** Base font size. Smaller/larger text is derived from it. */
    size: string;
  };
  /** Elevation shadow for cards, modals and overlays. */
  shadow: string;
  /** Focus-ring colour. */
  focus: string;
}

/** Recursive partial of the theme, used for overrides. */
export type ThemeOverrides = {
  [K in keyof Theme]?: Theme[K] extends object ? Partial<Theme[K]> : Theme[K];
};

const font = {
  family: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  size: '1rem',
};

export const lightTheme: Theme = {
  colors: {
    primary: '#1d4ed8',
    danger: '#c81e1e',
    success: '#047857',
    warning: '#92400e',
    background: '#ffffff',
    surface: '#ffffff',
    text: '#101828',
    textMuted: '#475467',
    border: '#d0d5dd',
  },
  radius: '6px',
  spacing: '0.25rem',
  font,
  shadow: '0 12px 24px -4px rgb(16 24 40 / 0.16), 0 4px 8px -2px rgb(16 24 40 / 0.08)',
  focus: '#2563eb',
};

export const darkTheme: Theme = {
  colors: {
    primary: '#6b9bff',
    danger: '#f87171',
    success: '#4ade80',
    warning: '#facc15',
    background: '#0b1220',
    surface: '#131c31',
    text: '#f2f4f7',
    textMuted: '#a9b4c8',
    border: '#2e3a55',
  },
  radius: '6px',
  spacing: '0.25rem',
  font,
  shadow: '0 12px 24px -4px rgb(0 0 0 / 0.6), 0 4px 8px -2px rgb(0 0 0 / 0.3)',
  focus: '#8fb3ff',
};

/** Merges `overrides` onto `base` one level deep (the theme is at most two levels deep). */
export function mergeTheme(base: Theme, overrides: ThemeOverrides = {}): Theme {
  return {
    ...base,
    ...overrides,
    colors: { ...base.colors, ...overrides.colors },
    font: { ...base.font, ...overrides.font },
  };
}

/** Creates a theme from partial overrides on top of {@link lightTheme} (or a given base). */
export function createTheme(overrides: ThemeOverrides = {}, base: Theme = lightTheme): Theme {
  return mergeTheme(base, overrides);
}

/** Maps a theme to the CSS custom properties read by the stylesheet. */
export function themeToVars(theme: Theme): Record<string, string> {
  const { colors: c } = theme;
  return {
    '--rcl-primary': c.primary,
    '--rcl-danger': c.danger,
    '--rcl-success': c.success,
    '--rcl-warning': c.warning,
    '--rcl-bg': c.background,
    '--rcl-surface': c.surface,
    '--rcl-text': c.text,
    '--rcl-text-muted': c.textMuted,
    '--rcl-border': c.border,
    '--rcl-radius': theme.radius,
    '--rcl-spacing': theme.spacing,
    '--rcl-font': theme.font.family,
    '--rcl-font-size': theme.font.size,
    '--rcl-shadow': theme.shadow,
    '--rcl-focus': theme.focus,
  };
}
