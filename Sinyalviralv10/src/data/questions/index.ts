import type { Question } from "../types";
import { trafficRulesQuestions } from "./traffic-rules";
import { trafficSignsQuestions } from "./traffic-signs";
import { firstAidQuestions } from "./first-aid";
import { vehicleTechQuestions } from "./vehicle-tech";
import { environmentQuestions } from "./environment";
import { trafficEthicsQuestions } from "./traffic-ethics";

export const questions: Question[] = [
  ...trafficRulesQuestions,
  ...trafficSignsQuestions,
  ...firstAidQuestions,
  ...vehicleTechQuestions,
  ...environmentQuestions,
  ...trafficEthicsQuestions,
];
