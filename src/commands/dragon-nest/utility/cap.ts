import { EmbedBuilder } from "discord.js";
import { calculateCap } from "./calculate-cap";
import { CapStatType } from "../data/cap-defaults-schema";

export const getCap = (lb: number) => {
  const capValue = calculateCap(lb);
  const embed = new EmbedBuilder()
    .setColor("#5679EF")
    .setTitle(`Stat cap for LB: ${lb}`);

  if (lb < 13) {
    embed.setDescription("No cap values found");
  } else {
    const crit = handleLine("crit", lb, capValue.capCrit, capValue.capCritEfm);
    const critDmg = handleLine(
      "critDmg",
      lb,
      capValue.capCritDmg,
      capValue.capCritDmgEfm
    );
    const def = handleLine("def", lb, capValue.capDef, capValue.capDefEfm);
    const fd = handleLine("fd", lb, capValue.capFd, capValue.capFdEfm);

    let description = crit + critDmg + def + fd;

    embed.setDescription(description);
  }

  return { embeds: [embed] };
};

function handleLine(
  type: CapStatType,
  lb: number,
  baseCap: string,
  efmCap: string
) {
  const mapping: { [key in CapStatType]: string } = {
    crit: "Crit",
    critDmg: "Crit Dmg",
    def: "Def",
    fd: "FD",
  };

  const numberOfSpace: { [key in CapStatType]: number } = {
    crit: 5,
    critDmg: 1,
    def: 5,
    fd: 5,
  };

  let string = `${mapping[type]}: ${baseCap}%`;

  if (lb >= 18) {
    // this is a U+2800 BRAILLE PATTERN BLANK
    // from https://stackoverflow.com/a/59523326/4110257
    string += `${"⠀".repeat(numberOfSpace[type])}`;
    string += `- EFM: ${efmCap}%\n`;
  } else {
    string += "\n";
  }

  return string;
}
