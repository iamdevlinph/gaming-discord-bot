import { ChatInputCommandInteraction } from "discord.js";
import { handleCap } from "./utility/handle-cap";

export const cap = async (interaction: ChatInputCommandInteraction) => {
  const lb = interaction.options.getString("lb");

  if (!lb || isNaN(lb as any)) {
    return interaction.reply({
      content: "Invalid LB provided. Must be a number.",
      ephemeral: true,
    });
  }

  const embeds = handleCap(parseInt(lb));
  await interaction.reply({ embeds, ephemeral: true });
};
