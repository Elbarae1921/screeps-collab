import { Screep } from "./screep";

export enum CommandStatus {
  Success = 'Success',
  Unreachable = 'Unreachable',
  NotSafe = 'Not Safe',
  Subroutine = 'Subroutine',
  GeneralFailure = 'General Failure'
}

export type CommandState = Readonly<
| {
  type: CommandStatus.Success
}
| {
  type: CommandStatus.Subroutine,
  commands: Command[]
}
| {
  type: CommandStatus.Unreachable,
  location: RoomPosition;
}
| {
  type: CommandStatus.NotSafe,
  location: RoomPosition;
}
| {
  type: CommandStatus.GeneralFailure,
  reason?: string
}>;

export type Command = Readonly<{
  name: string;
  run(creep: Screep): Promise<CommandState>;
}>;
