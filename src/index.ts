import { ChatInputCommandInteraction, Client } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands, hotReloadCommands } from "./deploy-commands";
import logger from "node-color-log";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async () => {
  logger.success("Discord bot is ready! 🤖");

  // do hot reload if GUILD_ID is provided
  if (config.GUILD_ID) {
    await hotReloadCommands({ guildId: config.GUILD_ID });
  }
});

client.on("guildCreate", async (guild) => {
  await deployCommands();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const { commandName } = interaction;
  if (commands[commandName as keyof typeof commands]) {
    commands[commandName as keyof typeof commands].execute(
      interaction as ChatInputCommandInteraction
    );
  }
});

client.login(config.DISCORD_TOKEN);
