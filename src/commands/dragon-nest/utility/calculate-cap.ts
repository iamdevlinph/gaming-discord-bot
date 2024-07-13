import { LOWEST_LB } from "../constants";
import {
  CapAdditionalType,
  CapDefaultsSchema,
  CapStatType,
} from "../data/cap-defaults-schema";

import capDefaults from "../data/cap-defaults.json";

const capDefaultsTyped: CapDefaultsSchema = capDefaults;

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const calculateCap = (lb: number) => {
  const crit = handleCalculation("crit", lb);
  const critDmg = handleCalculation("critDmg", lb);
  const def = handleCalculation("def", lb);
  const fd = handleCalculation("fd", lb);

  return {
    capCrit: crit.cap,
    capCritEfm: crit.capEfm,
    capCritDmg: critDmg.cap,
    capCritDmgEfm: critDmg.capEfm,
    capDef: def.cap,
    capDefEfm: def.capEfm,
    capFd: fd.cap,
    capFdEfm: fd.capEfm,
  };
};

/**
 *
 * @param {String} type crit | critDmg | def | fd
 */
function handleCalculation(type: CapStatType, lb: number) {
  const { base, increments, denominator, debuff, additional } =
    capDefaultsTyped[type];

  const hasAddon =
    additional !== undefined && Object.keys(additional).length > 0;

  // normal stats
  const statBase = base + (lb - LOWEST_LB) * increments;
  let statPercent =
    (statBase / denominator) * 100 +
    (hasAddon ? (additional as CapAdditionalType).base.percentage : 0);
  const cap = formatter.format(statPercent);

  // efm
  const statBaseEfm = statBase + debuff.efm;
  let statPercentEfm =
    (statBaseEfm / denominator) * 100 +
    (hasAddon ? (additional as CapAdditionalType).efm.percentage : 0);
  const capEfm = formatter.format(statPercentEfm);

  return {
    cap,
    capEfm,
  };
}
