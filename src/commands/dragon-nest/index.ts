import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { getCap } from "./utility/cap";

export const data = new SlashCommandBuilder()
  .setName("dn")
  .setDescription("Dragon Nest SEA commands")
  .addSubcommand((command) =>
    command
      .setName("cap")
      .setDescription("Return DN SEA town stats cap data")
      .addStringOption((option) =>
        option
          .setName("lb")
          .setDescription("Labyrinth floor cap")
          .setRequired(true)
      )
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const subCommand = interaction.options.getSubcommand();

  const lb = interaction.options.getString("lb");

  if (!lb || isNaN(lb as any)) {
    return interaction.reply("Invalid LB provided. Must be a number.");
  }

  switch (subCommand) {
    case "cap": {
      const reply = getCap(parseInt(lb));
      await interaction.reply({ ...reply, ephemeral: true });
    }
  }
}
