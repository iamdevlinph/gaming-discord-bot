import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { handleCap } from "./cap/utility/handle-cap";
import { cap } from "./cap/cap";

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

  switch (subCommand) {
    case "cap": {
      cap(interaction);
      break;
    }
  }
}
