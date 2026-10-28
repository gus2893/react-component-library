import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select.js';

const countries = [
  { value: 'br', label: 'Brazil' },
  { value: 'ca', label: 'Canada' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'xx', label: 'Unavailable region', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    label: 'Country',
    options: countries,
    placeholder: 'Select a country',
    size: 'md',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    hint: { control: 'text' },
    error: { control: 'text' },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = { args: { hint: 'Used for tax calculation.' } };

export const Required: Story = { args: { required: true, defaultValue: '' } };

export const WithError: Story = { args: { error: 'Please choose a country.' } };

export const WithOptionChildren: Story = {
  args: { options: undefined, placeholder: undefined, label: 'Plan' },
  render: (args) => (
    <Select {...args}>
      <optgroup label="Monthly">
        <option value="basic-m">Basic</option>
        <option value="pro-m">Pro</option>
      </optgroup>
      <optgroup label="Yearly">
        <option value="basic-y">Basic</option>
        <option value="pro-y">Pro</option>
      </optgroup>
    </Select>
  ),
};

export const Disabled: Story = { args: { disabled: true } };
