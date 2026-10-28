import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: '@storybook/react-vite',
  core: {
    disableTelemetry: true,
  },
  typescript: {
    // Babel-based docgen: works with the native TypeScript 7 compiler, which has no JS API
    // for react-docgen-typescript to use.
    reactDocgen: 'react-docgen',
  },
};

export default config;
