export class Reference<T extends _HasId> {

  private hasValue?: boolean;
  private value: T | null = null;
  private tickValue: number = -1;

  public get get(): T | null {
    if (this.hasValue === false) return null;
    if (this.tickValue !== Game.time) {
      this.updateReference();
    }
    return this.value;
  }

  private updateReference() {
    this.value = Game.getObjectById(this.id);
    if (this.value) {
      this.hasValue = true;
    } else {
      this.hasValue = false;
    }
    this.tickValue = Game.time;
  }

  constructor(public readonly id: Id<T>) {}
}
