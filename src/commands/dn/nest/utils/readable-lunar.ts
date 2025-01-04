import { allLunar, AllLunarType, mappedLunarNest } from "../data/all-nests";
import { lunarFragType } from "./lunar-frag-type";

export const readableLunar = (lunarFrag: AllLunarType) => {
  const data = allLunar.find((lunar) => {
    return (lunar.name as unknown) === lunarFrag;
  }) as (typeof allLunar)[number];

  const lunarType = lunarFragType(lunarFrag);

  return `${data.colorEmoji} ${lunarFrag} (${lunarType})`;
};
