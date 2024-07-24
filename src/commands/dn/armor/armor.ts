import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { armorDrop } from "./armor-drop/armor-drop";
import { reply } from "@utils/reply";

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
    );
};

export const armor = async (interaction: ChatInputCommandInteraction) => {
  const selectedChoice = interaction.options.getString(
    ARMOR_CATEGORY
  ) as ArmorCategory["value"];

  switch (selectedChoice) {
    case "armor_drop":
      return armorDrop(interaction);
    default:
      return reply({
        type: "dn",
        interaction,
        embedContent: "No armor category selected",
      });
  }
};
