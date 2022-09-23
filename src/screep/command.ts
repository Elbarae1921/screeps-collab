enum CommandStatus {
  Success = 0,
  Unreachable = 1,
  NotSafe = 2,
  Subroutine = 3,
  GeneralFailure = 4
}

export type CommandState =
| {
  type: CommandStatus.Success | CommandStatus.Subroutine
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
};

export type Command<C extends Creep> = (creep: C) => Promise<CommandState>;
