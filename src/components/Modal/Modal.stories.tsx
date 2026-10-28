import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Button } from '../Button/index.js';
import { TextField } from '../TextField/index.js';
import { Stack } from '../Stack/index.js';
import { Modal, type ModalProps } from './Modal.js';

function ModalDemo(args: ModalProps) {
  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false);
    args.onClose();
  };
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Modal
        {...args}
        open={open}
        onClose={close}
        footer={
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Save</Button>
          </>
        }
      >
        {args.children}
      </Modal>
    </>
  );
}

const meta = {
  title: 'Components/Modal',
  component: Modal,
  args: {
    open: false,
    title: 'Edit profile',
    description: 'Update your public profile information.',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    hideCloseButton: false,
    onClose: fn(),
    children: (
      <Stack gap={3}>
        <TextField label="Display name" defaultValue="Jane Doe" />
        <TextField label="Job title" />
      </Stack>
    ),
  },
  argTypes: {
    open: { control: false },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    children: { control: false },
    footer: { control: false },
  },
  parameters: {
    docs: { story: { inline: true, height: '120px' } },
  },
  render: (args) => <ModalDemo {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Delete project?',
    description: 'This action cannot be undone.',
    children: null,
  },
};

export const Large: Story = { args: { size: 'lg' } };

export const NoOverlayClose: Story = { args: { closeOnOverlayClick: false } };
