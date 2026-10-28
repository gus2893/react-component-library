# Contributing

Thanks for helping improve `@gus2893/react-components`. This library is consumed by many
apps, so stability, accessibility and backwards compatibility matter more than speed.

## Setup

```bash
nvm use        # Node 22, see .nvmrc
npm ci
npm run storybook
```

## Workflow

1. Create a branch from `main`.
2. Make your change. Keep the public API in `src/index.ts` intentional: every export is a
   commitment to all consuming apps.
3. Before pushing, run:

   ```bash
   npm run lint && npm run format:check && npm run typecheck && npm test && npm run build
   ```

4. Add a changeset describing the change for consumers:

   ```bash
   npm run changeset
   ```

   Use **patch** for fixes, **minor** for new components/props, **major** for breaking changes
   (removed or renamed props, changed defaults, changed DOM structure that consumers may rely on).

5. Open a pull request. CI must be green.

## Adding a component

Create `src/components/<Name>/` with:

| File               | Purpose                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `Name.tsx`         | Component. Extend native element props, `forwardRef` where sensible, set `displayName`.      |
| `Name.css`         | Styles. Prefix every class with `rcl-` and use `--rcl-*` tokens only, no hard-coded colours. |
| `Name.stories.tsx` | Storybook stories with `args` / `argTypes` (autodocs are on globally).                       |
| `Name.test.tsx`    | Vitest + Testing Library tests: rendering, ARIA attributes, interactions.                    |
| `index.ts`         | Re-exports the component and its types.                                                      |

Then export it from `src/index.ts` and update `src/index.test.ts`.

### Guidelines

- **No runtime dependencies** beyond `react` / `react-dom`.
- **Accessibility first**: native elements over ARIA re-implementations, visible focus using
  `var(--rcl-focus-ring)`, label every control, verify in the Storybook a11y panel.
- **Theming**: never hard-code colours; add a token in `src/styles/tokens.css` (with light and
  dark values) if one is missing.
- Use relative imports with explicit `.js` extensions (`'./Button.js'`), so emitted type
  declarations resolve under Node16/NodeNext module resolution.
- Query tests by role and accessible name (`getByRole('button', { name: 'Save' })`).

## Commit messages

[Conventional Commits](https://www.conventionalcommits.org/) are encouraged
(`feat:`, `fix:`, `docs:`, `chore:`), although the changelog is generated from changesets.
