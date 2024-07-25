const capStatKeys = ["crit", "critDmg", "def", "fd"] as const;
export type CapStatType = (typeof capStatKeys)[number];

export type CapAdditionalType = {
  base: {
    percentage: number;
  };
  efm: {
    percentage: number;
  };
};

export type CapDefaultsSchema = {
  [key in CapStatType]: {
    base: number;
    percentage: number;
    increments: number;
    denominator: number;
    additional: CapAdditionalType | {};
    debuff: {
      efm: number;
    };
  };
};
