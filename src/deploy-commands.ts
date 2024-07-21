import { Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import logger from "node-color-log";

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands() {
  try {
    logger.info("Started refreshing application (/) commands.");

    const globalCommands = Object.values(commands)
      .filter((command) => config.GLOBAL_COMMANDS.includes(command.data.name))
      .map((command) => command.data);

    /**
     * NOTE: `applicationCommands` to run in all servers
     * Source: https://discordjs.guide/creating-your-bot/command-deployment.html#global-commands
     */
    await config.REST.put(
      Routes.applicationCommands(config.DISCORD_CLIENT_ID),
      {
        body: globalCommands,
      }
    );

    const localCommands = Object.values(commands)
      .filter((command) => config.LOCAL_COMMANDS.includes(command.data.name))
      .map((command) => command.data);

    if (config.GUILD_ID) {
      await config.REST.put(
        Routes.applicationGuildCommands(
          config.DISCORD_CLIENT_ID,
          config.GUILD_ID
        ),
        {
          body: localCommands,
        }
      );
    }

    logger.success("Successfully reloaded application (/) commands.");
  } catch (error) {
    logger.error(error);
  }
}

export async function hotReloadCommands({ guildId }: DeployCommandsProps) {
  try {
    logger.info("Started HOT reloading application (/) commands.");

    // deploy all commands for local development and own server
    const commandsData = Object.values(commands).map((command) => command.data);

    await config.REST.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: commandsData,
      }
    );

    logger.success("Successfully HOT reloaded application (/) commands.");
  } catch (error) {
    logger.error(error);
  }
}
