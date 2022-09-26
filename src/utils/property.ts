import { Reference } from "./reference";

export class Property<A extends _HasId, T> {
  constructor(private instance: Reference<A>, private map: (instance: A) => T) {}

  private time?: number;
  private _value?: T;

  public get value(): T | null {
    const instance = this.instance.get;
    if (!instance) return null;
    if (!this.time || this.time !== Game.time) {
      this._value = this.map(instance);
      this.time = Game.time;
    }
    return this._value!;
  }
}

export class ConstantProperty<A extends _HasId, T> extends Property<A, T> {
  constructor(instance: Reference<A>, map: (instance: A) => T) {
    super(instance, map);
  }

  private cachedValue: T | null | undefined;

  public get value(): T | null {
    if (this.cachedValue === undefined) {
      this.cachedValue = super.value;
    }
    return this.cachedValue;
  }
}
