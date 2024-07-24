type CritDebuff = {
  debuff: "anxiety";
  destiny: "stable";
  penalty: string;
};

type CritDmgDebuff = {
  debuff: "compulsion";
  destiny: "relaxed";
  penalty: string;
};

type DefDebuff = {
  debuff: "depression";
  destiny: "cheerful";
  penalty: string;
};

type MDefDebuff = {
  debuff: "despair";
  destiny: "dependable";
  penalty: string;
};

type FDDebuff = {
  debuff: "doubt";
  destiny: "reliable";
  penalty: string;
};

type Ordeals = "silence";

type Debuffs =
  | CritDebuff["debuff"]
  | CritDmgDebuff["debuff"]
  | DefDebuff["debuff"]
  | MDefDebuff["debuff"]
  | FDDebuff["debuff"];

export type EfmJsonSchema = {
  debuffs: [CritDebuff, CritDmgDebuff, DefDebuff, MDefDebuff, FDDebuff];
  data: { debuff: Debuffs; ordeal: Ordeals };
};
