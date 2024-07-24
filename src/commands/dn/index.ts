import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { cap, capCommand } from "./cap/cap";
import { armor, armorCommand } from "./armor/armor";

export const data = new SlashCommandBuilder()
  .setName("dn")
  .setDescription("Dragon Nest SEA commands")
  .addSubcommand((command) => capCommand(command))
  .addSubcommand((command) => armorCommand(command));

export async function execute(interaction: ChatInputCommandInteraction) {
  const subCommand = interaction.options.getSubcommand();

  switch (subCommand) {
    case "cap": {
      return cap(interaction);
    }
    case "armor": {
      return armor(interaction);
    }
  }
}
