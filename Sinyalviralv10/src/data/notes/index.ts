import type { Note } from "../types";
import { trafficRulesNotes } from "./traffic-rules";
import { trafficSignsNotes } from "./traffic-signs";
import { firstAidNotes } from "./first-aid";
import { vehicleTechNotes } from "./vehicle-tech";
import { vehicleTechPage3Notes } from "./vehicle-tech-p3";
import { environmentNotes } from "./environment";
import { trafficEthicsNotes } from "./traffic-ethics";

export const notes: Note[] = [
  ...trafficRulesNotes,
  ...trafficSignsNotes,
  ...firstAidNotes,
  ...vehicleTechNotes,
  ...vehicleTechPage3Notes,
  ...environmentNotes,
  ...trafficEthicsNotes,
];
