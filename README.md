# @gus2893/react-components

Accessible, themeable React component library shared across the organisation's apps.

- 12 components built on native elements: **Button, TextField, Select, Checkbox, Switch, Card, Badge, Alert, Modal/Dialog, Tooltip, Spinner, Stack**
- Simple theming: `ThemeProvider` + `createTheme` over ~15 values (or plain CSS variables); light and dark built in
- All class names prefixed with `rcl-`, so styles never collide with host apps
- ESM + CommonJS builds, TypeScript declarations, source maps, tree-shakeable
- No runtime dependencies beyond React
- Documented in Storybook: <https://gus2893.github.io/react-component-library/>

## Installation

```bash
npm install @gus2893/react-components
```

### Peer dependencies

| Package     | Version |
| ----------- | ------- |
| `react`     | `>=18`  |
| `react-dom` | `>=18`  |

## Usage

Import the stylesheet **once** (e.g. in your app entry), then the components you need:

```tsx
import { useState } from 'react';
import '@gus2893/react-components/styles.css';
import { Alert, Button, Modal, Stack, TextField } from '@gus2893/react-components';

export function Example() {
  const [open, setOpen] = useState(false);
  return (
    <Stack gap={4}>
      <Alert variant="success" title="Saved">
        Your changes have been saved.
      </Alert>
      <TextField label="Email" type="email" hint="Work email only" required />
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Hello">
        Dialog content
      </Modal>
    </Stack>
  );
}
```

CommonJS works too: `const { Button } = require('@gus2893/react-components');`

The ESM and CJS bundles start with a `'use client'` directive, so the components can be used
from React Server Component frameworks (e.g. Next.js App Router).

## Theming

The look is driven by one small theme object: nine colours (`primary`, `danger`, `success`,
`warning`, `background`, `surface`, `text`, `textMuted`, `border`), a `radius`, a `spacing`
unit, a `font` (`family`, `size`), a `shadow` and a `focus` colour. Hover, active and tinted
shades are derived from these in CSS, so there is nothing else to configure.

**No setup needed:** the stylesheet's defaults equal `lightTheme`. For dark mode without
JavaScript, set `data-theme="dark"` (or `"system"`) on `<html>`.

**ThemeProvider + createTheme:**

```tsx
import { ThemeProvider, createTheme, darkTheme, useTheme } from '@gus2893/react-components';

const brand = createTheme({ colors: { primary: '#7c3aed' }, radius: '12px' }); // merged onto lightTheme

<ThemeProvider theme={brand}>
  <App />
</ThemeProvider>;
```

- `createTheme(overrides, base = lightTheme)` deep-merges a partial theme; `lightTheme` and
  `darkTheme` are exported.
- `<ThemeProvider>` writes the theme as `--rcl-*` CSS variables on a wrapper `<div>`; add
  `global` to write them on `<html>` instead. Providers nest, and an inner `theme` may be
  partial (`theme={{ colors: { primary: 'teal' } }}`): it is merged onto the outer theme.
- `useTheme()` returns the active `Theme` (`lightTheme` outside any provider).
- `Modal` keeps the theme of its provider even though it renders in a portal.

**Plain CSS alternative:** override the same variables yourself, no provider required:

```css
:root {
  --rcl-primary: #7c3aed;
  --rcl-radius: 12px;
  --rcl-font: 'Inter', system-ui, sans-serif;
}
```

Variables: `--rcl-primary`, `--rcl-danger`, `--rcl-success`, `--rcl-warning`, `--rcl-bg`,
`--rcl-surface`, `--rcl-text`, `--rcl-text-muted`, `--rcl-border`, `--rcl-radius`,
`--rcl-spacing`, `--rcl-font`, `--rcl-font-size`, `--rcl-shadow`, `--rcl-focus`.

Text on solid `primary`/`danger` fills uses `background`, so keep those colours contrasting.

## Development

Requires Node 22 (see `.nvmrc`).

```bash
npm ci
npm run storybook
```

| Script                    | What it does                                                            |
| ------------------------- | ----------------------------------------------------------------------- |
| `npm run build`           | Library build (ESM + CJS + `styles.css` via Vite) and type declarations |
| `npm run typecheck`       | `tsc -b` over sources, stories, tests and configs                       |
| `npm run lint`            | oxlint (React, a11y, TypeScript, Vitest rules); warnings fail           |
| `npm run format`          | Prettier (write); `format:check` verifies                               |
| `npm test`                | Unit tests (Vitest + Testing Library, jsdom). Headless, no browser      |
| `npm run test:watch`      | Unit tests in watch mode                                                |
| `npm run test:coverage`   | Unit tests with V8 coverage                                             |
| `npm run test:storybook`  | Runs every story as a browser test incl. a11y checks (needs Playwright) |
| `npm run storybook`       | Storybook dev server on <http://localhost:6006>                         |
| `npm run build-storybook` | Static Storybook in `storybook-static/`                                 |
| `npm run changeset`       | Record a change for the next release                                    |

`test:storybook` needs a Playwright browser once: `npx playwright install chromium`.

### Project layout

```
src/
  components/<Name>/   Name.tsx, Name.stories.tsx, Name.test.tsx, index.ts
  styles/              theme.css (default variables), components.css (all component styles)
  theme/               Theme type, lightTheme/darkTheme, createTheme, ThemeProvider, useTheme
  utils/               cx, mergeRefs, useField
  docs/Introduction.mdx
  index.ts             public API
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Releasing

Releases are managed with [Changesets](https://github.com/changesets/changesets):

1. In your PR, run `npm run changeset`, pick the bump type and describe the change. Commit the
   generated `.changeset/*.md` file.
2. When PRs with changesets land on `main`, the **Release** workflow opens (or updates) a
   _Version Packages_ PR that bumps `package.json` and writes `CHANGELOG.md`.
3. Merging that PR runs the workflow again, which builds and publishes to npm with
   provenance.

Publishing needs an **`NPM_TOKEN`** repository secret (Settings → Secrets and variables →
Actions) containing an npm automation or granular access token with publish rights to the
`@gus2893` scope. Without the secret, the workflow still maintains the version PR but skips
publishing.

`prepublishOnly` runs typecheck, tests and build, so a manual `npm publish` is safe too.

Storybook is deployed to GitHub Pages on every push to `main` (enable Pages with source
**GitHub Actions** in the repository settings).

## License

[MIT](LICENSE) © 2026 gus2893
