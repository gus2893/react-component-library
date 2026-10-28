import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack.js';

const Box = ({ label }: { label: string }) => (
  <div
    style={{
      padding: 'var(--rcl-space-3) var(--rcl-space-4)',
      borderRadius: 'var(--rcl-radius-md)',
      background: 'var(--rcl-color-primary-subtle)',
      color: 'var(--rcl-color-text)',
      fontFamily: 'var(--rcl-font-family)',
    }}
  >
    {label}
  </div>
);

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  args: {
    direction: 'column',
    gap: 4,
    wrap: false,
    inline: false,
  },
  argTypes: {
    direction: { control: 'inline-radio', options: ['row', 'column', 'row-reverse', 'column-reverse'] },
    gap: { control: 'select', options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12] },
    align: { control: 'select', options: [undefined, 'start', 'center', 'end', 'stretch', 'baseline'] },
    justify: { control: 'select', options: [undefined, 'start', 'center', 'end', 'between', 'around', 'evenly'] },
  },
  render: (args) => (
    <Stack {...args}>
      <Box label="One" />
      <Box label="Two" />
      <Box label="Three" />
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};

export const Horizontal: Story = { args: { direction: 'row', gap: 2 } };

export const SpaceBetween: Story = { args: { direction: 'row', justify: 'between', align: 'center' } };
