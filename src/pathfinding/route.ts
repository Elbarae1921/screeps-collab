import { Screep } from "screep/screep";
import { Property } from "utils";

export class Route {
  public path: Property<Creep, RoomPosition[]>;

  constructor(creep: Screep) {
    this.path = new Property(creep.instance, c => c.memory._path);
  }
}
