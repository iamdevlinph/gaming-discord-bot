import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { isAdmin, accessError } from "../../utils";
import { hotReloadCommands } from "../../deploy-commands";
import logger from "node-color-log";

export const isGlobal = false;

export const data = new SlashCommandBuilder()
  .setName("redeploy")
  .setDescription("Redeploys commands");

export async function execute(interaction: CommandInteraction) {
  const userId = interaction.user.id;
  if (!isAdmin(interaction.user.id)) {
    accessError({ command: "redeploy", userId });
    return interaction.reply({ content: "Not allowed", ephemeral: true });
  }

  const client = interaction.client;
  const guilds = client.guilds.cache.map((guild) => guild.id);

  try {
    guilds.forEach(async (guildId) => {
      logger.info("Redeploying to guild:", guildId);
      await hotReloadCommands({ guildId });
    });
  } catch (e) {
    logger.error("Failed in redeploying to guild", e);
  }

  return interaction.reply({ content: "redeploy test", ephemeral: true });
}
