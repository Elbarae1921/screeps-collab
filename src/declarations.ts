declare global {
  interface Array<T> {
    takeWhile(predicate: (value: T, index: number, array: T[]) => unknown): T[];
  }
}

export function injectMethods(): void {
  Array.prototype.takeWhile = function<T>(this: Array<T>, predicate: (value: T, index: number, array: T[]) => unknown): T[] {
    const result: T[] = [];
    let i = 0;
    for (const value of this) {
      if (predicate(value, i, this)) {
        result.push(value);
      } else break;
      i++;
    }
    return result;
  }
}
