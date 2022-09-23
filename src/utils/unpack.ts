/**
 * Unpacks a one-length array into just the item.
 * If the type is not a one-length array, just returns the type.
 */
 export type Unpack<T> =
 T extends [infer X]
   ? X
   : T;

export function unpack<T>(value: T): Unpack<T> {
  return Array.isArray(value) && value.length === 1 ? value[0] : value;
}
