import type { Decorator, Preview } from '@storybook/react-vite';
import { darkTheme, lightTheme, ThemeProvider } from '../src/index.js';

import '../src/styles/theme.css';
import '../src/styles/components.css';
import './preview.css';

const themes = { light: lightTheme, dark: darkTheme };

/**
 * Wraps every story in a ThemeProvider. Its wrapper paints the theme background, so each
 * story on a Docs page is themed; Modal re-applies the provider's theme inside its portal.
 * `data-theme` on <html> themes the rest of the canvas.
 */
const withTheme: Decorator = (Story, context) => {
  const name = (context.globals.theme as keyof typeof themes | undefined) ?? 'light';
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', name);
  }
  return (
    <ThemeProvider theme={themes[name]} className="rcl-sb-theme-root">
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme (ThemeProvider)',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
