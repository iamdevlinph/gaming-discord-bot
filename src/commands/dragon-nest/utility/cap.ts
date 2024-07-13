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
    const crit = `Crit: ${capValue.capCrit}%\n`;
    const critDmg = `Crit Dmg: ${capValue.capCritDmg}%\n`;
    const def = `Def: ${capValue.capDef}%\n`;
    const fd = `FD: ${capValue.capFd}%\n`;

    const efmSection = `\n**For EFM**\n`;
    const efmCrit = `Crit: ${capValue.capCritEfm}%\n`;
    const efmCritDmg = `Crit Dmg: ${capValue.capCritDmgEfm}%\n`;
    const efmDef = `Def: ${capValue.capDefEfm}%\n`;
    const efmFd = `FD: ${capValue.capFdEfm}%\n`;

    let description = crit + critDmg + def + fd;
    if (lb >= 18) {
      description += efmSection + efmCrit + efmCritDmg + efmDef + efmFd;
    }

    embed.setDescription(description);
  }

  return { embeds: [embed] };
};
