import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField.js';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  args: {
    label: 'Email address',
    placeholder: 'jane@example.com',
    type: 'email',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = { args: { hint: "We'll never share your email." } };

export const Required: Story = { args: { required: true } };

export const WithError: Story = {
  args: { defaultValue: 'not-an-email', error: 'Enter a valid email address.' },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: 'jane@example.com' } };
