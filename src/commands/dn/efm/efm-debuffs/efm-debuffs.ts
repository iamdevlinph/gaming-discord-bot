import { readFile, reply } from "@utils";
import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";
import logger from "node-color-log";
import { EfmJsonSchema } from "../data/efm-schema";
import { findDebuffDetails } from "../utils/find-debuff-details";

export const efmDebuffs = (
  interaction: ChatInputCommandInteraction,
  persist = false
) => {
  try {
    const embeds = new EmbedBuilder().setTitle("EFM Debuffs");

    const baseFilePath = "/src/commands/dn/efm/data/efm.json";
    const efmJson: EfmJsonSchema = JSON.parse(readFile({ baseFilePath }));

    let debuffString = "";
    let destinyString = "";
    let penaltyString = "";

    efmJson.debuffs.forEach((debuff) => {
      debuffString += `${debuff.debuff}\n`;
      destinyString += `${debuff.destiny}\n`;
      penaltyString += `${debuff.penalty}\n`;
    });

    embeds.addFields(
      {
        name: "Debuff",
        value: debuffString,
        inline: true,
      },
      {
        name: "Destiny",
        value: destinyString,
        inline: true,
      },
      {
        name: "Penalty",
        value: penaltyString,
        inline: true,
      }
    );

    const debuffDetails = findDebuffDetails(
      efmJson.debuffs,
      efmJson.data.debuff
    );

    embeds.addFields({
      name: "Current Debuff",
      value: debuffDetails
        ? `${debuffDetails.debuff} ${debuffDetails.penalty}`
        : "N/A",
    });

    embeds.addFields({
      name: "Current Ordeal",
      value: efmJson.data.ordeal,
    });

    reply({ type: "dn", interaction, embedContent: embeds, persist });
  } catch (e) {
    const errorMsg = "Something went wrong with EFM debuffs";
    logger.error("efmDebuffs", errorMsg, e);
    reply({ type: "dn", interaction, embedContent: new Error(errorMsg) });
  }
};

// function isCurrentDebuff(debuff, efmData) {}
