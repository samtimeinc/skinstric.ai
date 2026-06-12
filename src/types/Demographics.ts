import { Age } from "./age";
import { Gender } from "./gender"
import { Race } from "./race";

export interface Demographics {
  age: Record<string, number>;
  gender: Record<string, number>;
  race: Record<string, number>;
}