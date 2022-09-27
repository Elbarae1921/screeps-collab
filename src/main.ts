import { injectMethods } from "declarations";
import { monad, processTurn } from "utils";
import { deleteOldCreepMemory, memhack, normalizeError } from "wrappers";

injectMethods();

export const loop = monad(
  memhack,
  normalizeError,
  deleteOldCreepMemory,
  // Bot code here
  processTurn
);
