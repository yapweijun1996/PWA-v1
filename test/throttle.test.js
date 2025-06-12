import { describe, it, expect, vi } from 'vitest';
import { throttle } from '../src/throttle.js';

describe('throttle', () => {
  it('limits function calls based on delay', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const throttled = throttle(fn, 100);

    throttled();
    throttled();
    vi.advanceTimersByTime(50);
    throttled();
    vi.advanceTimersByTime(60);
    throttled();

    expect(fn).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
