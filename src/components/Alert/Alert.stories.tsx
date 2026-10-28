import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Stack } from '../Stack/index.js';
import { Alert } from './Alert.js';

const meta = {
  title: 'Components/Alert',
  component: Alert,
  args: {
    variant: 'info',
    title: 'Heads up',
    children: 'A new version of the dashboard is available.',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] },
    title: { control: 'text' },
    icon: { control: false },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};

export const Success: Story = {
  args: { variant: 'success', title: 'Saved', children: 'Your changes have been saved.' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Storage almost full', children: 'You have used 92% of your quota.' },
};

export const ErrorAlert: Story = {
  name: 'Error',
  args: { variant: 'error', title: 'Payment failed', children: 'Your card was declined.' },
};

export const Dismissible: Story = { args: { onDismiss: fn() } };

export const AllVariants: Story = {
  render: (args) => (
    <Stack gap={3}>
      <Alert {...args} variant="info" title="Info" />
      <Alert {...args} variant="success" title="Success" />
      <Alert {...args} variant="warning" title="Warning" />
      <Alert {...args} variant="error" title="Error" />
    </Stack>
  ),
};
