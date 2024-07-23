import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { isAdmin, accessError, reply } from "../../utils";

export const isGlobal = false;

export const data = new SlashCommandBuilder()
  .setName("get-servers")
  .setDescription("Returns servers where bot is installed");

export async function execute(interaction: CommandInteraction) {
  const userId = interaction.user.id;
  if (!isAdmin(interaction.user.id)) {
    accessError({ command: "redeploy", userId });
    return interaction.reply({ content: "Not allowed", ephemeral: true });
  }

  const client = interaction.client;
  const guilds = client.guilds.cache.map((guild) => guild.id);
  console.log("🍉 ~ execute ~ guilds:", guilds);

  const embeds = new EmbedBuilder().setTitle("Bot found in following servers:");

  let guildstring: string = "";

  guilds.forEach((guildId) => {
    guildstring += `${guildId}\n`;
  });

  embeds.setDescription(guildstring);

  return reply({ game: "util", interaction, embedContent: embeds });
}
