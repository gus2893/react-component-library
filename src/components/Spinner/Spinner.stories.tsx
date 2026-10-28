import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/index.js';
import { Spinner } from './Spinner.js';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  args: {
    size: 'md',
    label: 'Loading',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <Stack direction="row" gap={4} align="center">
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
    </Stack>
  ),
};

export const CustomLabel: Story = { args: { label: 'Fetching invoices' } };
