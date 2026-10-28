---
'@gus2893/react-components': minor
---

Simplified theming: ThemeProvider + createTheme

- New `ThemeProvider`, `createTheme`, `lightTheme`, `darkTheme`, `useTheme` and the `Theme` type.
- The theme is ~15 values (colours, radius, spacing unit, font, shadow, focus colour); hover,
  active and tinted shades are derived in CSS with `color-mix()`.
- All styles now live in `styles/theme.css` + `styles/components.css` (shipped as the same
  `dist/styles.css`). `data-theme="dark"` / `"system"` still work.
- Breaking for custom CSS overrides: the old `--rcl-color-*`, `--rcl-space-*`, `--rcl-radius-*`,
  `--rcl-font-*`, `--rcl-shadow-*` and `--rcl-focus-ring*` tokens are replaced by `--rcl-primary`,
  `--rcl-bg`, `--rcl-text`, `--rcl-spacing`, `--rcl-radius`, `--rcl-focus` etc. (see README).
