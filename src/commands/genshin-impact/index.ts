import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { version } from "./version/version";

export const data = new SlashCommandBuilder()
  .setName("genshin")
  .setDescription("Genshin IMpact commands")
  .addSubcommand((command) =>
    command.setName("version").setDescription("Returns current game version")
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const subCommand = interaction.options.getSubcommand();

  switch (subCommand) {
    case "version": {
      version(interaction);
      break;
    }
  }
}
