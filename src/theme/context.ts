import { createContext, useContext } from 'react';
import { lightTheme, type Theme } from './theme.js';

export interface ThemeContextValue {
  theme: Theme;
  /** CSS variables of a scoped (non-global) provider, re-applied by portalled components. */
  scopedVars?: Record<string, string>;
}

export const ThemeContext = createContext<ThemeContextValue>({ theme: lightTheme });

/** Returns the active theme (the nearest ThemeProvider's, or `lightTheme` without one). */
export function useTheme(): Theme {
  return useContext(ThemeContext).theme;
}
