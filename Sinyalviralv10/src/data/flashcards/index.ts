import type { Flashcard } from "../types";
import { trafficRulesCards } from "./traffic-rules";
import { trafficSignsCards } from "./traffic-signs";
import { firstAidCards } from "./first-aid";
import { vehicleTechCards } from "./vehicle-tech";
import { environmentCards } from "./environment";
import { trafficEthicsCards } from "./traffic-ethics";

export const flashcards: Flashcard[] = [
  ...trafficRulesCards,
  ...trafficSignsCards,
  ...firstAidCards,
  ...vehicleTechCards,
  ...environmentCards,
  ...trafficEthicsCards,
];
