import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from '../Stack/index.js';
import { Badge } from './Badge.js';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    children: 'Badge',
    variant: 'neutral',
    size: 'md',
    dot: false,
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['neutral', 'info', 'success', 'warning', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack direction="row" gap={2} wrap>
      <Badge {...args} variant="neutral">
        Draft
      </Badge>
      <Badge {...args} variant="info">
        In review
      </Badge>
      <Badge {...args} variant="success">
        Active
      </Badge>
      <Badge {...args} variant="warning">
        Expiring
      </Badge>
      <Badge {...args} variant="danger">
        Failed
      </Badge>
    </Stack>
  ),
};

export const WithDot: Story = { args: { dot: true, variant: 'success', children: 'Online' } };

export const Small: Story = { args: { size: 'sm', children: '12' } };
