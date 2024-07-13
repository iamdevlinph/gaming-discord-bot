import { EmbedBuilder } from "discord.js";
import { calculateCap } from "./calculate-cap";
import { LOWEST_LB } from "../data/constants";

export const handleCap = (lb: number) => {
  const capValue = calculateCap(lb);
  const embed = new EmbedBuilder()
    .setColor("#5679EF")
    .setTitle(`Stat cap for LB: ${lb}`);

  if (lb < LOWEST_LB) {
    embed.setDescription("No cap values found");
  } else {
    embed.setThumbnail(
      "https://vectorified.com/images/dragon-nest-icon-30.png"
    );

    const {
      capCrit,
      capCritDmg,
      capDef,
      capFd,
      capCritEfm,
      capCritDmgEfm,
      capDefEfm,
      capFdEfm,
    } = capValue;

    const baseCapString = `${capCrit}%\n${capCritDmg}%\n${capDef}%\n${capFd}%`;
    const efmCapString = `${capCritEfm}%\n${capCritDmgEfm}%\n${capDefEfm}%\n${capFdEfm}%`;

    embed.addFields(
      { name: "Stat", value: "Crit:\ncDMG:\nDef:\nFD:", inline: true },
      { name: "Base Cap", value: baseCapString, inline: true },
      {
        name: "EFM Cap",
        value: efmCapString,
        inline: true,
      }
    );
  }

  return { embeds: [embed] };
};
