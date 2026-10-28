import type { Decorator, Preview } from '@storybook/react-vite';

import '../src/styles/tokens.css';
import '../src/styles/base.css';
import './preview.css';

type Theme = 'light' | 'dark';

/**
 * Applies the selected theme. `data-theme` is set on <html> (so portalled content such
 * as Modal is themed too) and on a wrapper (so each story on a Docs page is themed).
 */
const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as Theme | undefined) ?? 'light';
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme);
  }
  return (
    <div data-theme={theme} className="rcl-sb-theme-root">
      <Story />
    </div>
  );
};

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Colour theme (sets data-theme)',
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
