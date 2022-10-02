import { Reference } from "./reference";

/**
 * One-tick cached property of a referenced instance
 */
export class Property<A extends _HasId, T> {
  constructor(protected readonly instance: Reference<A>, protected readonly map: (instance: A) => T | undefined) {}

  protected time?: number;
  protected _value?: T;

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

export class SettableProperty<A extends _HasId, T> extends Property<A, T> {
  constructor(
    instance: Reference<A>,
    getter: (instance: A) => T | undefined,
    private readonly setter: (instance: A, value: T) => void
  ) {
    super(instance, getter);
  }

  public set value(v: T) {
    const instance = this.instance.get;
    if (!instance) return;
    this.setter(instance, v);
    this.time = Game.time;
    this._value = v;
  }
}
