import { Screep } from "screep/screep";
import { Route } from "./route";

export class Navigator {
  public currentRoute?: Route;

  constructor(private readonly creep: Screep) {}
}
