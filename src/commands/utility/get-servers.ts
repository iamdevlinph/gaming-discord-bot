import { accessError } from "@utils/access-error";
import { isAdmin } from "@utils/is-admin";
import { reply } from "@utils/reply";
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const isGlobal = false;

export const data = new SlashCommandBuilder()
  .setName("get-servers")
  .setDescription("Returns servers where bot is installed");

export async function execute(interaction: CommandInteraction) {
  const userId = interaction.user.id;
  if (!isAdminmin(interaction.user.id)) {
    accessError({ command: "redeploy", userId });
    return interaction.reply({ content: "Not allowed", ephemeral: true });
  }

  const client = interaction.client;
  const guilds = client.guilds.cache.map(({ id, name, invites }) => {
    return {
      guildId: id,
      name,
    };
  });

  const embeds = new EmbedBuilder().setTitle(
    "Bot found in the following servers:"
  );

  embeds.setDescription(printGuilds(guilds));

  return reply({ type: "util", interaction, embedContent: embeds });
}

function printGuilds(
  guilds: {
    guildId: string;
    name: string;
  }[]
) {
  let guildString = "";

  guilds.forEach(({ name, guildId }, idx) => {
    guildString += `${idx + 1}. ${name} (${guildId})`;
  });

  return guildString;
}
