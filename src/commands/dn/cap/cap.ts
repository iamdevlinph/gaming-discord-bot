import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { handleCap } from "./utility/handle-cap";
import { addPersistBooleanOption, reply } from "@utils";
import { IS_PERSIST_NAME } from "../../../utils/constants";

export const capCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("cap")
    .setDescription("Return DN SEA town stats cap data")
    .addStringOption((option) =>
      option
        .setName("lb")
        .setDescription("Labyrinth floor cap")
        .setRequired(true)
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

export const cap = async (interaction: ChatInputCommandInteraction) => {
  const lb = interaction.options.getString("lb");

  if (!lb || isNaN(lb as any)) {
    return reply({
      type: "dn",
      interaction,
      embedContent: Error("Invalid LB provided. Must be a number."),
    });
  }

  const persist = interaction.options.getBoolean(IS_PERSIST_NAME) ?? false;
  const embeds = handleCap(parseInt(lb));
  await reply({ type: "dn", interaction, embedContent: embeds, persist });
};
