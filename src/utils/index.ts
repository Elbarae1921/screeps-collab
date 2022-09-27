import { advanceTick, startPromiseLoop } from "./higher-order";

export { getBodyFor, getCostOfBody } from "./body";
export type { Brand, Flavor } from "./types";

export function processTurn() {
  advanceTick();
  startPromiseLoop();
}

type F = () => void;
/**
 * Creates a function that is a result of using all of the passed in functions as wrappers.
 *
 * @example
 * const x = monad(a, b, c);
 * // Is equivalent to:
 * const x = () => a(b(c()));
 * @example
 * const b = () => { something };
 * const c = () => { something };
 * const x = monad(a, b, c);
 * // Is equivalent to:
 * const x = () => a(() => { b();c(); });
 */
export function monad(...funcs: (((fn: F) => F) | F)[]): F {
  return funcs.reduceRight<F>(
    (current, nextWrapper) => {
      if (nextWrapper.length === 0) {
        const fn = nextWrapper as F;
        return () => {
          current();
          fn();
        };
      } else {
        const fn = nextWrapper as (fn: F) => F;
        return fn(current);
      }
    },
    () => {}
  );
}
