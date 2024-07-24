import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { capCommand, cap } from "./cap/cap";
import { armorCommand, armor } from "./armor/armor";
import { efmCommand, efm } from "./efm/efm";

type DNCommands = "cap" | "armor" | "efm";

export const data = new SlashCommandBuilder()
  .setName("dn")
  .setDescription("Dragon Nest SEA commands")
  .addSubcommand((command) => capCommand(command))
  .addSubcommand((command) => armorCommand(command))
  .addSubcommand((command) => efmCommand(command));

export async function execute(interaction: ChatInputCommandInteraction) {
  const subCommand = interaction.options.getSubcommand() as DNCommands;

  switch (subCommand) {
    case "cap": {
      return cap(interaction);
    }
    case "armor": {
      return armor(interaction);
    }
    case "efm": {
      return efm(interaction);
    }
  }
}
