import { describe, expect, it } from 'vitest';
import { cx } from './cx.js';

describe('cx', () => {
  it('joins truthy values and skips falsy ones', () => {
    expect(cx('a', false, null, undefined, '', 'b', 0)).toBe('a b 0');
  });

  it('returns an empty string when nothing is truthy', () => {
    expect(cx(false, null)).toBe('');
  });
});
