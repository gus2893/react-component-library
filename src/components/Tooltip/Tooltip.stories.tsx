import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/index.js';
import { Stack } from '../Stack/index.js';
import { Tooltip } from './Tooltip.js';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  args: {
    content: 'Copies the link to your clipboard',
    placement: 'top',
    delay: 300,
    disabled: false,
    children: <Button variant="secondary">Copy link</Button>,
  },
  argTypes: {
    placement: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] },
    children: { control: false },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '3rem 8rem' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Placements: Story = {
  render: (args) => (
    <Stack direction="row" gap={4}>
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} {...args} placement={placement} content={`On the ${placement}`}>
          <Button variant="secondary">{placement}</Button>
        </Tooltip>
      ))}
    </Stack>
  ),
};

export const NoDelay: Story = { args: { delay: 0 } };
