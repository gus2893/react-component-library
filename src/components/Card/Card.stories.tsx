import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/index.js';
import { Card, CardBody, CardFooter, CardHeader } from './Card.js';

const meta = {
  title: 'Components/Card',
  component: Card,
  args: {
    variant: 'outlined',
    padding: 'md',
    style: { maxWidth: 360 },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['outlined', 'elevated', 'filled'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>Quarterly report</CardHeader>
      <CardBody>Revenue grew 12% quarter over quarter, driven by enterprise renewals.</CardBody>
      <CardFooter>
        <Button variant="ghost" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {};

export const Elevated: Story = { args: { variant: 'elevated' } };

export const Filled: Story = { args: { variant: 'filled' } };

export const Simple: Story = {
  render: (args) => <Card {...args}>A card with plain content.</Card>,
};
