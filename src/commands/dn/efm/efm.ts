import {
  ChatInputCommandInteraction,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { efmDebuffs } from "./efm-debuffs/efm-debuffs";
import { addPersistBooleanOption, reply } from "@utils";
import { IS_PERSIST_NAME } from "../../../utils/constants";

const EFM_CATEGORY = "efm_category";

type EfmCategory = {
  name: "debuffs";
  value: "debuffs";
};

const efmCategoryChoices: EfmCategory[] = [
  {
    name: "debuffs",
    value: "debuffs",
  },
];

export const efmCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("efm")
    .setDescription("Return DN SEA EFM related commands")
    .addStringOption((option) =>
      option
        .setName(EFM_CATEGORY)
        .setDescription("Commands related to EFM")
        .setRequired(true)
        .addChoices(efmCategoryChoices)
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

export const efm = async (interaction: ChatInputCommandInteraction) => {
  const selectedChoice = interaction.options.getString(
    EFM_CATEGORY
  ) as EfmCategory["value"];

  switch (selectedChoice) {
    case "debuffs":
      const persist = interaction.options.getBoolean(IS_PERSIST_NAME) ?? false;
      return efmDebuffs(interaction, persist);
    default:
      return reply({
        type: "dn",
        interaction,
        embedContent: "No EFM category selected",
      });
  }
};
