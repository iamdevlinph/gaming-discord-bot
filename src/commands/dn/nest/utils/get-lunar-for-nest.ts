import { AllLunarType, AllNestsType, mappedLunarNest } from "../data/all-nests";

export const getLunarForNest = (nest: AllNestsType): AllLunarType[] => {
  const keys = Object.keys(mappedLunarNest) as AllLunarType[];

  const lunarFragsArr: AllLunarType[] = [];

  keys.forEach((key) => {
    const arr = mappedLunarNest[key];

    if (arr.includes(nest)) {
      lunarFragsArr.push(key);
    }
  });

  return lunarFragsArr;
};
