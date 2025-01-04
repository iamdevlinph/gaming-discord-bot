import { AllLunarType, lunar } from "../data/all-nests";

const ATTACK_LUNAR = [lunar.HOLY, lunar.BURNING, lunar.PITCH_BLACK];

export const lunarFragType = (lunarFrag: AllLunarType) => {
  return ATTACK_LUNAR.includes(lunarFrag) ? "ATK" : "DEF";
};
