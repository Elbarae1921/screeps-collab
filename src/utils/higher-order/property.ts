import { Reference } from "./reference";

/**
 * One-tick cached property of a referenced instance
 */
export class Property<A extends _HasId, T> {
  constructor(private instance: Reference<A>, private map: (instance: A) => T | undefined) {}

  private time?: number;
  private _value?: T;

  public get value(): T | undefined {
    const instance = this.instance.get;
    if (!instance) return undefined;
    if (!this.time || this.time !== Game.time) {
      this._value = this.map(instance);
      this.time = Game.time;
    }
    return this._value!;
  }
}

/**
 * Forever cached property of a referenced instance
 */
export class ConstantProperty<A extends _HasId, T> extends Property<A, T> {
  constructor(instance: Reference<A>, map: (instance: A) => T | undefined) {
    super(instance, map);
  }

  private cachedValue: T | undefined;

  public get value(): T | undefined {
    if (this.cachedValue === undefined) {
      this.cachedValue = super.value;
    }
    return this.cachedValue;
  }
}
