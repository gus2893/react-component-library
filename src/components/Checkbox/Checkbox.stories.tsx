import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Checkbox } from './Checkbox.js';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  args: {
    label: 'Subscribe to the newsletter',
    disabled: false,
    indeterminate: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const WithDescription: Story = {
  args: { description: 'One email per month. Unsubscribe at any time.' },
};

export const Indeterminate: Story = { args: { indeterminate: true, label: 'Select all' } };

export const Disabled: Story = { args: { disabled: true } };
