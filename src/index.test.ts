import { describe, expect, it } from 'vitest';
import * as lib from './index.js';

describe('public API', () => {
  it('exports every component', () => {
    const expected = [
      'Alert',
      'Badge',
      'Button',
      'Card',
      'CardBody',
      'CardFooter',
      'CardHeader',
      'Checkbox',
      'Dialog',
      'Modal',
      'Select',
      'Spinner',
      'Stack',
      'Switch',
      'TextField',
      'Tooltip',
      'cx',
    ];
    expect(Object.keys(lib).sort()).toEqual(expected.sort());
  });
});
