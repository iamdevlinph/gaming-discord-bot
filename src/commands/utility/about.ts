import { reply } from "@utils/reply";
import {
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("about")
  .setDescription("Replies info about the bot");

export async function execute(interaction: CommandInteraction) {
  const embeds = new EmbedBuilder()
    .setTitle("About Gaming Bot")
    .setDescription("Gaming Bot is a discord bot that caters multiple games")
    .setAuthor({
      name: "iamdevlinph",
      iconURL: "https://avatars.githubusercontent.com/u/19337229",
      url: "https://github.com/iamdevlinph/",
    })
    .addFields({
      name: "Contribute",
      value: "https://github.com/iamdevlinph/gaming-discord-bot",
    });

  return reply({ type: "util", interaction, embedContent: embeds });
}
