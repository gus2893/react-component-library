import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Alert } from '../components/Alert/index.js';
import { Badge } from '../components/Badge/index.js';
import { Button } from '../components/Button/index.js';
import { Card, CardBody, CardFooter, CardHeader } from '../components/Card/index.js';
import { Modal } from '../components/Modal/index.js';
import { Stack } from '../components/Stack/index.js';
import { Switch } from '../components/Switch/index.js';
import { TextField } from '../components/TextField/index.js';
import { createTheme, darkTheme, lightTheme } from './theme.js';
import { ThemeProvider } from './ThemeProvider.js';

interface ThemingArgs {
  primary: string;
  radius: string;
  fontFamily: string;
}

function Showcase() {
  const [open, setOpen] = useState(false);
  return (
    <Card style={{ maxWidth: 420 }}>
      <CardHeader>Workspace settings</CardHeader>
      <CardBody>
        <Stack gap={3}>
          <Alert title="Heads up">Changes apply to every member of the workspace.</Alert>
          <TextField label="Workspace name" defaultValue="Acme" />
          <Switch label="Email notifications" defaultChecked />
          <Stack direction="row" gap={2}>
            <Badge variant="info">Info</Badge>
            <Badge variant="success">Active</Badge>
          </Stack>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button onClick={() => setOpen(true)}>Save</Button>
      </CardFooter>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Saved"
        footer={<Button onClick={() => setOpen(false)}>OK</Button>}
      >
        The modal is portalled but keeps the theme of its ThemeProvider.
      </Modal>
    </Card>
  );
}

const meta = {
  title: 'Theming',
  parameters: {
    docs: {
      description: {
        component:
          'Pass `createTheme(overrides)` to `<ThemeProvider>`. Only a handful of values exist (colours, radius, spacing unit, font, shadow, focus colour); hover, active and tinted shades are derived from them in CSS.',
      },
    },
  },
  args: {
    primary: '#7c3aed',
    radius: '12px',
    fontFamily: "Georgia, 'Times New Roman', serif",
  },
  argTypes: {
    primary: { control: 'color' },
    radius: { control: 'text' },
    fontFamily: { control: 'text' },
  },
} satisfies Meta<ThemingArgs>;

export default meta;
type Story = StoryObj<ThemingArgs>;

/** A custom brand colour, radius and font via `createTheme`. */
export const CustomBrand: Story = {
  render: ({ primary, radius, fontFamily }, { globals }) => {
    // createTheme merges onto lightTheme by default; the second argument picks another base.
    const theme = createTheme(
      { colors: { primary }, focus: primary, radius, font: { family: fontFamily } },
      globals.theme === 'dark' ? darkTheme : lightTheme,
    );
    return (
      <ThemeProvider theme={theme}>
        <Showcase />
      </ThemeProvider>
    );
  },
};

/** Providers nest: the inner one overrides only what it sets. */
export const NestedProviders: Story = {
  render: ({ primary }) => (
    <ThemeProvider theme={{ colors: { primary } }}>
      <Stack direction="row" gap={4} wrap>
        <Button>Outer theme</Button>
        <ThemeProvider theme={{ colors: { primary: '#047857' }, radius: '999px' }}>
          <Button>Inner override</Button>
        </ThemeProvider>
      </Stack>
    </ThemeProvider>
  ),
};
