import { Command, CommandState, CommandStatus } from "./command";
import { Screep } from "./screep";

export class CommandExecutor {

  private currentCommand: Promise<CommandState> | null = null;

  private commandStack: Command[] = [];

  constructor(private readonly screep: Screep) {

  }

  public perform() {
    if (!this.currentCommand) {
      const command = this.commandStack.pop();
      if (!command) {
        console.log(`Creep ${this.screep.instance.get?.name ?? this.screep.instance.id} does not have anything to do.`);
        return;
      }
      const commandPromise = command.run(this.screep).catch(err => ({
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
