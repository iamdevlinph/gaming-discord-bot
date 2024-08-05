import { Debuffs, EfmJsonSchema } from "../data/efm-schema";

export const findDebuffDetails = (
  debuffs: EfmJsonSchema["debuffs"],
  currentDebuff: Debuffs
) => {
  return debuffs.find((debuff) => debuff.debuff === currentDebuff);
};
