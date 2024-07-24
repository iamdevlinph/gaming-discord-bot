import { reply } from "@utils";
import {
  CommandInteraction,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import logger from "node-color-log";

export const data = new SlashCommandBuilder()
  .setName("reload")
  .setDescription("Reload a command!")
  .addStringOption((option) =>
    option
      .setName("command")
      .setDescription("The command to reload.")
      .setRequired(true)
  );

export async function execute(interaction: SlashCommandSubcommandBuilder) {
  const commandName = interaction.options
    .getString("command", true)
    .toLowerCase();
  const command = interaction.client.commands.get(commandName);

  if (!command) {
    const errorMsg = `There is no command with name \`${commandName}\`!`;
    logger.error("reload", errorMsg);
    return reply({
      type: "util",
      interaction,
      embedContent: new Error(errorMsg),
    });
  }

  return interaction.reply({ content: "Pong!", ephemeral: true });
}
