import { CommandInteraction, Routes, SlashCommandBuilder } from "discord.js";
import { deployCommands, hotReloadCommands } from "../../deploy-commands";
import logger from "node-color-log";
import { config } from "../../config";
import { accessError, isAdmin } from "@utils";

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
      // delete commands from guild first
      logger.info("Deleting commands from guild:", guildId);
      await config.REST.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
        {
          body: [],
        }
      );

      logger.info("Redeploying commands for guild", guildId);
      await deployCommands({ guildId });
    });
  } catch (e) {
    logger.error("Failed in redeploying to guild", e);
  }

  return interaction.reply({
    content: "Redeploy has started",
    ephemeral: true,
  });
}
