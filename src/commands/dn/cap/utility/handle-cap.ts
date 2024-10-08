import { EmbedBuilder } from "discord.js";
import { calculateCap } from "./calculate-cap";
import { LOWEST_LB } from "../data/constants";
import logger from "node-color-log";
import { readFile } from "@utils";
import { EfmJsonSchema } from "../../efm/data/efm-schema";
import { findDebuffDetails } from "../../efm/utils/find-debuff-details";

export const handleCap = (lb: number) => {
  const capValue = calculateCap(lb);
  const embed = new EmbedBuilder().setTitle(
    `__**Town**__ stat cap for LB: ${lb}`
  );

  if (lb < LOWEST_LB) {
    embed.setDescription("No cap values found");
  } else {
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

    try {
      const baseFilePath = "/src/commands/dn/efm/data/efm.json";
      const efmData: EfmJsonSchema = JSON.parse(readFile({ baseFilePath }));

      const debuffDetails = findDebuffDetails(
        efmData.debuffs,
        efmData.data.debuff
      );

      embed.addFields(
        {
          name: "EFM Debuff",
          value: debuffDetails
            ? `${debuffDetails.debuff} ${debuffDetails.penalty}`
            : "N/A",
        },
        {
          name: "EFM Ordeal",
          value: efmData.data.ordeal,
        }
      );

      const delimeter = " ";
      embed.addFields({
        name: "One line",
        value: `Crit:${capCrit}%${delimeter}cDmg:${capCritDmg}%${delimeter}Def:${capDef}%${delimeter}FD:${capFd}%`,
        inline: true,
      });
    } catch (e) {
      const errorMsg =
        "Something went wrong when trying to calculate for cap stats.";
      embed.addFields({
        name: "Error",
        value: errorMsg,
      });
      logger.error("handleCap", errorMsg, e);
    }
  }

  return embed;
};
