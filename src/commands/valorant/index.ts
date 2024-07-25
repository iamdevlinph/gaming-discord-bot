import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { buyVp, buyVpCommand } from "./buy-vp/buy-vp";

export const data = new SlashCommandBuilder()
  .setName("valorant")
  .setDescription("Valorant commands")
  .addSubcommand((command) => buyVpCommand(command));

export async function execute(interaction: ChatInputCommandInteraction) {
  const subCommand = interaction.options.getSubcommand();

  switch (subCommand) {
    case "buy_vp": {
      buyVp(interaction);
      break;
    }
  }
}
