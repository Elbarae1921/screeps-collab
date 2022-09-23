import { promisify } from "./promisify";

const tickCheckCallbacks: Map<number, ((tick: number) => void)[]> = new Map();

export function onTickCallback(tick: number, callback: (tick: number) => void): void {
  if (Game.time >= tick) {
    callback(Game.time);
  }
  else {
    tickCheckCallbacks.set(tick, [...(tickCheckCallbacks.get(tick) ?? []), callback]);
  }
}

/**
 * Calls the callbacks for the current tick
 */
export function advanceTick() {
  const callbacks = tickCheckCallbacks.get(Game.time) ?? [];
  callbacks.forEach(v => v(Game.time));
}

/**
 * Returns a promise that resolves on the specified tick
 */
export const onTick = promisify(onTickCallback);
