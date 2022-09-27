type FlatArray<Arr, Depth extends number> = {
  done: Arr;
  recur: Arr extends ReadonlyArray<infer InnerArr>
    ? FlatArray<InnerArr, [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20][Depth]>
    : Arr;
}[Depth extends -1 ? "done" : "recur"];

declare global {
  interface Array<T> {
    takeWhile(predicate: (value: T, index: number, array: T[]) => unknown): T[];
    /**
     * Calls a defined callback function on each element of an array. Then, flattens the result into
     * a new array.
     * This is identical to a map followed by flat with depth 1.
     *
     * @param callback A function that accepts up to three arguments. The flatMap method calls the
     * callback function one time for each element in the array.
     * @param thisArg An object to which the this keyword can refer in the callback function. If
     * thisArg is omitted, undefined is used as the this value.
     */
    flatMap<U, This = undefined>(
      callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
      thisArg?: This
    ): U[];

    /**
     * Returns a new array with all sub-array elements concatenated into it recursively up to the
     * specified depth.
     *
     * @param depth The maximum recursion depth
     */
    flat<A extends T, D extends number = 1>(this: A, depth?: D): FlatArray<A, D>[];
  }
}

export function injectMethods(): void {
  Array.prototype.flat = function flat<D extends number = 1>(depth?: D) {
    const o = Object(this);
    const a = arraySpeciesCreate(o, this.length);
    const depthNum = depth !== undefined ? Number(depth) : Infinity;
    flattenIntoArray(a, o, 0, depthNum);
    return a.filter(e => e !== undefined) as any;
  };

  Array.prototype.flatMap = function flatMap<T, U, This = undefined>(
    callbackFn: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
    thisArg?: This
  ) {
    const o = Object(this) as T[];
    if (!callbackFn || typeof callbackFn.call !== "function") {
      throw TypeError("callbackFn must be callable.");
    }
    const t = thisArg !== undefined ? thisArg : this;

    const a = arraySpeciesCreate(o, o.length);
    flattenIntoArray(a, o, 0, 1, callbackFn as any, t as T[]);
    return a.filter(x => x !== undefined, a) as any;
  };

  Array.prototype.takeWhile = function <T>(
    this: Array<T>,
    predicate: (value: T, index: number, array: T[]) => unknown
  ): T[] {
    const result: T[] = [];
    let i = 0;
    for (const value of this) {
      if (predicate(value, i, this)) {
        result.push(value);
      } else break;
      i++;
    }
    return result;
  };
}

function flattenIntoArray<U, T>(
  target: U[],
  source: T[],
  start: number,
  depth: number,
  mapperFunction?: (v: T, index: number, array: T[]) => U[],
  thisArg?: T[]
): number {
  const mapperFunctionProvied = mapperFunction !== undefined;
  let targetIndex = start;
  let sourceIndex = 0;
  const sourceLen = source.length;
  while (sourceIndex < sourceLen) {
    const p = sourceIndex;
    const exists = !!source[p];
    if (exists) {
      let element: any = source[p];
      if (element) {
        if (mapperFunctionProvied) {
          element = mapperFunction.call(thisArg, element, sourceIndex, source);
        }
        const spreadable =
          Object.getOwnPropertySymbols(element).includes(Symbol.isConcatSpreadable) || Array.isArray(element);
        if (spreadable && depth > 0) {
          const nextIndex = flattenIntoArray(target, element, targetIndex, depth - 1, mapperFunction, thisArg);
          targetIndex = nextIndex;
        } else {
          if (!Number.isSafeInteger(targetIndex)) {
            throw TypeError();
          }
          target[targetIndex] = element;
        }
      }
    }
    targetIndex += 1;
    sourceIndex += 1;
  }
  return targetIndex;
}

function arraySpeciesCreate<T>(originalArray: T[], length: number): T[] {
  const isArray = Array.isArray(originalArray);
  if (!isArray) {
    return Array(length);
  }
  let C = Object.getPrototypeOf(originalArray).constructor;
  if (typeof C === "object" || typeof C === "function") {
    C = C[Symbol.species.toString()];
    C = C !== null ? C : undefined;
  }
  if (C === undefined) {
    return Array(length);
  }
  if (typeof C !== "function") {
    throw TypeError("invalid constructor");
  }
  return new C(length);
}
