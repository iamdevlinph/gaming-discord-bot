import { allLunar, AllLunarType, mappedLunarNest } from "../data/all-nests";

export const readableLunar = (lunarFrag: AllLunarType) => {
  const data = allLunar.find((lunar) => {
    return (lunar.name as unknown) === lunarFrag;
  }) as (typeof allLunar)[number];

  return `${data.colorEmoji} ${lunarFrag}`;
};
