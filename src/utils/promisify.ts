import { Unpack, unpack } from "./unpack";

export function promisify<A extends unknown[], X extends unknown[]>(functionWithCallback: (...args: [...A, (...args2: X) => void]) => void): (...args: A) => Promise<Unpack<X>> {
  return (...args: A) => new Promise<Unpack<X>>((resolve, reject) => {
      try {
        functionWithCallback(...args, (...a: X) => resolve(unpack(a)));
      }
      catch (err) {
        reject(err);
      }
    });
}
