import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { cacheCommand } from "../../../utils/cache-command";
import { CONQUEST_CATEGORIES_CACHE_KEY } from "../../../utils/constants";
import { addPersistBooleanOption } from "@utils";

const conquestCategoryChoices = (() => {
  if (cacheCommand.hasCache(CONQUEST_CATEGORIES_CACHE_KEY)) {
    return cacheCommand.get(CONQUEST_CATEGORIES_CACHE_KEY);
  }
})();

export const conquestCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("conquest")
    .setDescription("Return conquest related commands")
    .addStringOption((option) =>
      option
        .setName("conquest_command")
        .setDescription("Select which conquest command to run")
        .setRequired(true)
        .addChoices([{ name: "Create conquest party", value: "create" }])
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

export const conquest = async (interaction: ChatInputCommandInteraction) => {};
