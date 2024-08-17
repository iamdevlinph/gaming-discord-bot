import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { armorDrop } from "./armor-drop/armor-drop";
import { addPersistBooleanOption, reply } from "@utils";
import { IS_PERSIST_NAME } from "../../../utils/constants";

const ARMOR_CATEGORY = "armor_category";

type ArmorCategory = {
  name: "drop";
  value: "armor_drop";
};

const armorCategoryChoices: ArmorCategory[] = [
  {
    name: "drop",
    value: "armor_drop",
  },
];

export const armorCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("armor")
    .setDescription("Return DN SEA armor related commands")
    .addStringOption((option) =>
      option
        .setName(ARMOR_CATEGORY)
        .setDescription("Commands related to armor")
        .setRequired(true)
        .addChoices(armorCategoryChoices)
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

export const armor = async (interaction: ChatInputCommandInteraction) => {
  const selectedChoice = interaction.options.getString(
    ARMOR_CATEGORY
  ) as ArmorCategory["value"];

  switch (selectedChoice) {
    case "armor_drop":
      const persist = interaction.options.getBoolean(IS_PERSIST_NAME) ?? false;
      return armorDrop(interaction, persist);
    default:
      return reply({
        type: "dn",
        interaction,
        embedContent: "No armor category selected",
      });
  }
};
