import { Reference } from "utils";
import { Command, CommandState, CommandStatus } from "./command";

export class Screep {

  private currentCommand: Promise<CommandState> | null = null;

  private commandStack: Command[] = [];

  constructor(public readonly instance: Reference<Creep>) {

  }

  public perform() {
    if (!this.currentCommand) {
      const command = this.commandStack.pop();
      if (!command) {
        console.log(`Creep ${this.instance.get?.name ?? this.instance.id} does not have anything to do.`);
        return;
      }
      const commandPromise = command.run(this).catch(err => ({
        type: CommandStatus.GeneralFailure,
        reason: err+""
      } as const))
      .then(status => {
        if (status.type === CommandStatus.Subroutine) {
          this.commandStack.push(...status.commands);
        }
        return status;
      });
      this.currentCommand = commandPromise;
      this.currentCommand.finally(() => {
        if (this.currentCommand === commandPromise) {
          this.currentCommand = null;
          this.perform();
        }
      });
    }
  }
}
