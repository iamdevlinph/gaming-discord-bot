import { SlashCommandBooleanOption } from "discord.js";
import { IS_PERSIST_NAME } from "./constants";

export const addPersistBooleanOption = (option: SlashCommandBooleanOption) => {
  return option
    .setName(IS_PERSIST_NAME)
    .setDescription("Persists the return message")
    .setRequired(false);
};
