import { Age } from "./age";
import { Gender } from "./gender";
import { Race } from "./race";

export interface Demographics {
  age: Age;
  gender: Gender;
  race: Race;
}