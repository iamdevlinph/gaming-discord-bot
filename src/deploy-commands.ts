import {
  Routes,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import logger from "node-color-log";

type DeployCommandsProps = {
  guildId: string;
};

export async function deployCommands({ guildId }: DeployCommandsProps) {
  try {
    logger.info("Started refreshing application (/) commands.");

    // Deploy all commands for DEVELOPER server
    if (config.DEVELOPER_GUILD_ID === guildId) {
      const localCommands = Object.values(commands).map(
        (command) => command.data
      );

      logger.info("Setting developer commands");
      await config.REST.put(
        Routes.applicationGuildCommands(
          config.DISCORD_CLIENT_ID,
          config.DEVELOPER_GUILD_ID
        ),
        {
          body: localCommands,
        }
      );

      logger.success(
        "Deploying commands\n",
        localCommands.map((command) => command.name)
      );
    } else {
      // only deploy global commands for other servers
      const globalCommands = Object.values(commands)
        .filter((command) => config.PUBLIC_COMMANDS.includes(command.data.name))
        .map((command) => command.data);

      /**
       * NOTE: `applicationCommands` to run in all servers
       * Source: https://discordjs.guide/creating-your-bot/command-deployment.html#global-commands
       */
      logger.info("Setting global commands");
      await config.REST.put(
        Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
        {
          body: globalCommands,
        }
      );

      logger.success(
        "Deploying commands\n",
        globalCommands.map((command) => command.name)
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
    logger.info("Guild ID", guildId);

    // deploy all commands for local development and own server
    const commandsData = Object.values(commands).map((command) => command.data);

    logger.info(
      "Hot reload commands:\n",
      commandsData.map((command) => command.name)
    );

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
