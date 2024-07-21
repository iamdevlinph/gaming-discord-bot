import { EmbedBuilder } from "discord.js";
import { calculateCap } from "./calculate-cap";
import { LOWEST_LB } from "../data/constants";
import * as fs from "fs";
import logger from "node-color-log";
import { toSentenceCase } from "common-utils-pkg";

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

    let efmFile = process.cwd();
    efmFile += "/src/commands/dragon-nest/efm/data/efm.json";
    console.log("🍉 ~ handleCap ~ efmFile:", efmFile);
    try {
      const efmData: { debuff: string; ordeal: string } = JSON.parse(
        fs.readFileSync(efmFile, "utf8")
      );

      embed.addFields({
        name: "EFM Debuff",
        value: toSentenceCase(efmData.debuff),
      });
    } catch (e) {
      logger.error("Something went wrong with handling the EFM info in cap");
    }
  }

  return { embeds: [embed] };
};
