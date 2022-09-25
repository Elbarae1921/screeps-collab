import "./set-timeout";
import "./promise";
import { startPromiseLoop } from "./promise";
import { advanceTick } from "./tick-check";

export { Reference } from "./reference";
export { Property, ConstantProperty } from './property';
export { promisify } from "./promisify";
export { onTick, onTickCallback } from "./tick-check";
export type { Brand, Flavor } from "./types";

export function processTurn() {
  advanceTick();
  startPromiseLoop();
}

export function normalizeError(fn: () => void): () => void {
  return () => {
    try {
      fn();
    }
    catch(err) {
      if (err instanceof Error) {
        err.stack = err.stack?.split('\n').takeWhile(line => !line.includes('__mainLoop')).join('\n');
      }
      throw err;
    }
  }
}
