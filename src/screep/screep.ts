import { Reference, ConstantProperty } from "utils";
import { CommandExecutor } from "./command-executor";

export class Screep {

  private readonly executor: CommandExecutor = new CommandExecutor(this);

  public name = new ConstantProperty(this.instance, c => c.name);
  public parts = new ConstantProperty(this.instance, c => c.body.map(b => b.type));

  constructor(public readonly instance: Reference<Creep>) {
  }

  public perform() {
    this.executor.perform();
  }
}
