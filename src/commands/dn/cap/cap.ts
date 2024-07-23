import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { handleCap } from "./utility/handle-cap";
import { reply } from "../../../utils";

export const cap = async (interaction: ChatInputCommandInteraction) => {
  const lb = interaction.options.getString("lb");

  if (!lb || isNaN(lb as any)) {
    return reply({
      type: "dn",
      interaction,
      embedContent: Error("Invalid LB provided. Must be a number."),
    });
  }

  const embeds = handleCap(parseInt(lb));
  await reply({ type: "dn", interaction, embedContent: embeds });
};
