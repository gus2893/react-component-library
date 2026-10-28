import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Switch } from './Switch.js';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  args: {
    label: 'Enable notifications',
    size: 'md',
    disabled: false,
    labelFirst: false,
    onChange: fn(),
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const On: Story = { args: { defaultChecked: true } };

export const WithDescription: Story = {
  args: { description: 'Get notified when someone mentions you.' },
};

export const Small: Story = { args: { size: 'sm' } };

export const LabelFirst: Story = { args: { labelFirst: true } };

export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };
