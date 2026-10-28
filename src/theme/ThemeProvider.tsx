import { useContext, useEffect, useLayoutEffect, useMemo, type CSSProperties, type HTMLAttributes } from 'react';
import { ThemeContext } from './context.js';
import { mergeTheme, themeToVars, type Theme, type ThemeOverrides } from './theme.js';

// useLayoutEffect avoids a flash of the default theme; fall back to useEffect on the server.
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  /** A full theme (e.g. from `createTheme`) or partial overrides of the parent theme. */
  theme?: Theme | ThemeOverrides;
  /** Write the variables on `<html>` instead of rendering a wrapper element. */
  global?: boolean;
}

/**
 * Applies a theme by writing a handful of `--rcl-*` CSS variables on a wrapper `<div>` (or on
 * `<html>` with `global`). Providers nest: an inner theme is merged onto the outer one.
 */
export function ThemeProvider({ theme: overrides, global = false, style, children, ...rest }: ThemeProviderProps) {
  const parent = useContext(ThemeContext).theme;
  const theme = useMemo(() => mergeTheme(parent, overrides), [parent, overrides]);
  const vars = useMemo(() => themeToVars(theme), [theme]);
  const value = useMemo(() => ({ theme, scopedVars: global ? undefined : vars }), [theme, vars, global]);

  useIsomorphicLayoutEffect(() => {
    if (!global) return;
    const root = document.documentElement.style;
    const previous = Object.keys(vars).map((key) => [key, root.getPropertyValue(key)] as const);
    for (const [key, val] of Object.entries(vars)) root.setProperty(key, val);
    return () => {
      for (const [key, val] of previous) {
        if (val) root.setProperty(key, val);
        else root.removeProperty(key);
      }
    };
  }, [global, vars]);

  return (
    <ThemeContext.Provider value={value}>
      {global ? (
        children
      ) : (
        <div className="rcl-theme" style={{ ...(vars as CSSProperties), ...style }} {...rest}>
          {children}
        </div>
      )}
    </ThemeContext.Provider>
  );
}
