import "./setTimeout";
import "./promise";
import { startPromiseLoop } from "./promise";
import { advanceTick } from "./tick-check";

export { Reference } from "./reference";
export { promisify } from "./promisify";
export { onTick, onTickCallback } from "./tick-check";
export type { Brand, Flavor } from "./types";

export function processTurn() {
  advanceTick();
  startPromiseLoop();
}
