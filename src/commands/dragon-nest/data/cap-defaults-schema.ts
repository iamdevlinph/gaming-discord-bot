import { z } from "zod";

const capStatKeys = ["crit", "critDmg", "def", "fd"] as const;
export type CapStatType = (typeof capStatKeys)[number];

const capDefaultsSchema = z.object({
  crit: z.object({
    base: z.number(),
    percentage: z.number(),
    increments: z.number(),
    denominator: z.number(),
    additional: z.object({}),
    debuff: z.object({ efm: z.number() }),
  }),
  critDmg: z.object({
    base: z.number(),
    percentage: z.number(),
    increments: z.number(),
    denominator: z.number(),
    additional: z.object({
      base: z.object({ percentage: z.number() }),
      efm: z.object({ percentage: z.number() }),
    }),
    debuff: z.object({ efm: z.number() }),
  }),
  def: z.object({
    base: z.number(),
    percentage: z.number(),
    increments: z.number(),
    denominator: z.number(),
    additional: z.object({}),
    debuff: z.object({ efm: z.number() }),
  }),
  fd: z.object({
    base: z.number(),
    percentage: z.number(),
    increments: z.number(),
    denominator: z.number(),
    additional: z.object({}),
    debuff: z.object({ efm: z.number() }),
  }),
});

// export type CapDefaultsSchema = z.infer<typeof capDefaultsSchema>;

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
