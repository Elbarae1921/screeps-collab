// An example of how to extend the global/Screeps types

declare global {
  interface Memory {
    creepIndex?: number;
  }

  interface Creep {
    wander(): CreepMoveReturnCode;
  }
}

export function injectMethods(): void {

  Creep.prototype.wander = function(): CreepMoveReturnCode {
    if (!this.fatigue) {
      let direction = (Math.floor(Math.random() * 8) + 1) as DirectionConstant;
      return this.move(direction);
    }
    else return ERR_TIRED;
  }
}
