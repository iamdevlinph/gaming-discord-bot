import { ChatInputCommandInteraction, Client, Routes } from "discord.js";
import { config } from "./config";
import { commands } from "./commands";
import { deployCommands, hotReloadCommands } from "./deploy-commands";
import logger from "node-color-log";

const client = new Client({
  intents: ["Guilds", "GuildMessages", "DirectMessages"],
});

client.once("ready", async () => {
  logger.success("Discord bot is ready! 🤖");

  // await overwriteCommands();

  // hot reload if DEVELOPER_GUILD_ID is provided and when development
  if (config.DEVELOPER_GUILD_ID && config.STAGE_ENV !== "production") {
    const guild = client.guilds.cache.get(config.DEVELOPER_GUILD_ID);
    await guild?.commands.set([]);
    await hotReloadCommands({ guildId: config.DEVELOPER_GUILD_ID });
  }
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
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

async function overwriteCommands() {
  logger.error("OVERWRITE COMMANDS");
  const guilds = client.guilds.cache.map((guild) => guild.id);

  guilds.forEach(async (guildId) => {
    await config.REST.put(
      Routes.applicationGuildCommands(config.DISCORD_CLIENT_ID, guildId),
      {
        body: [],
      }
    );

    await deployCommands({ guildId });
  });
}
