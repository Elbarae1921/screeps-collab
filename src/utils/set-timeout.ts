import { onTickCallback } from "./tick-check";
import { Brand } from "./types";

type TimeoutId = Brand<number, 'TimeoutId'>;

declare global {
  /**
   * Schedules execution of a one-time `callback` after `ticks` ticks.
   * @param callback  The function to call when the timer elapses.
   * @param ticks The number of ticks to wait before calling the `callback`. **Default:** 1
   * @param args Optional arguments to pass when the `callback` is called.
   * @returns `TimeoutId` for use with `clearTimeout()`
   */
  function setTimeout<T extends unknown[]>(callback: (...args: T) => void, ticks?: number, ...args: T): TimeoutId;
  /**
   * Cancels a `TimeoutId` object created by `setTimeout()`.
   * @param id A `TimeoutId` object as returned by `setTimeout()`
   */
  function clearTimeout(id: TimeoutId): void;
}

let timeoutId = 0;
const timeoutCancelled = new Map<TimeoutId, boolean>();

global.setTimeout = (<T extends unknown[]>(callback: (...args: T) => void, ticks: number = 1, ...args: T) => {
  const id = timeoutId as TimeoutId;
  timeoutId++;
  onTickCallback(Game.time + ticks, () => {
    const shouldRun = timeoutCancelled.get(id) === false;
    timeoutCancelled.delete(id);
    if (shouldRun) {
      callback(...args);
    }
  });
  return id;
}) as any;

global.clearTimeout = ((id: TimeoutId) => {
  if (timeoutCancelled.has(id)) {
    timeoutCancelled.set(id, true);
  }
}) as any;
