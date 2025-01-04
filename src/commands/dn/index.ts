import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { capCommand, cap } from "./cap/cap";
import { armorCommand, armor } from "./armor/armor";
import { efmCommand, efm } from "./efm/efm";
import {
  nestCommand,
  lunarCommand,
  nestLunar,
  NestLunarTypes,
} from "./nest/nest";

type DNCommands = "cap" | "armor" | "efm" | "nest" | "lunar_frags";

export const data = new SlashCommandBuilder()
  .setName("dn")
  .setDescription("Dragon Nest SEA commands")
  .addSubcommand((command) => capCommand(command))
  .addSubcommand((command) => armorCommand(command))
  .addSubcommand((command) => efmCommand(command))
  .addSubcommand((command) => nestCommand(command))
  .addSubcommand((command) => lunarCommand(command));

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
    case "nest":
    case "lunar_frags": {
      return nestLunar(interaction, subCommand as NestLunarTypes);
    }
  }
}
