import { ExpandRecursively } from "../../../../utils/type-utils";

type CritDebuff = {
  debuff: "Anxiety";
  destiny: "Stable";
  penalty: string;
};

type CritDmgDebuff = {
  debuff: "Compulsion";
  destiny: "Relaxed";
  penalty: string;
};

type DefDebuff = {
  debuff: "Depression";
  destiny: "Cheerful";
  penalty: string;
};

type MDefDebuff = {
  debuff: "Despair";
  destiny: "Dependable";
  penalty: string;
};

type FDDebuff = {
  debuff: "Doubt";
  destiny: "Reliable";
  penalty: string;
};

type Ordeals = "Silence" | "Confusion" | "Decreasing HP";

const ordeals = [
  {
    name: "Silent Depths",
    effect: "Silence - cannot cast skills",
  },
  {
    name: "Cursed Depths",
    effect: "Decreasing HP and disable recovery",
  },
  {
    name: "Shackled Depths",
    effect: "Cannot tumble and dash",
  },
  {
    name: "Depths of Weakness",
    effect: "Slove movement",
  },
];

export type Debuffs =
  | CritDebuff["debuff"]
  | CritDmgDebuff["debuff"]
  | DefDebuff["debuff"]
  | MDefDebuff["debuff"]
  | FDDebuff["debuff"];

export type EfmJsonSchema = ExpandRecursively<{
  debuffs: [CritDebuff, CritDmgDebuff, DefDebuff, MDefDebuff, FDDebuff];
  data: { debuff: Debuffs; ordeal: Ordeals };
}>;
