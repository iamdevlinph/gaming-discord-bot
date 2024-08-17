import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import { addPersistBooleanOption, reply } from "@utils";
import {
  allLunar,
  AllLunarType,
  allNests,
  AllNestsType,
} from "./data/all-nests";
import { getLunarForNest } from "./utils/get-lunar-for-nest";
import { readableLunar } from "./utils/readable-lunar";
import { cacheCommand } from "../../../utils/cache-command";
import logger from "node-color-log";
import {
  IS_PERSIST_NAME,
  LUNAR_CATEGORIES_CACHE_KEY,
  NEST_CATEGORIES_CACHE_KEY,
} from "../../../utils/constants";

export const NESTS_CATEGORY = "nests_category";
export const LUNAR_CATEGORY = "lunar_category";

const nestCategoryChoices = (() => {
  if (cacheCommand.hasCache(NEST_CATEGORIES_CACHE_KEY)) {
    return cacheCommand.get(NEST_CATEGORIES_CACHE_KEY) as typeof nestCategories;
  }
  const nestCategories = [...allNests].map((nest) => {
    return { name: nest, value: nest };
  });

  cacheCommand.set(NEST_CATEGORIES_CACHE_KEY, nestCategories);

  return nestCategories;
})();

export const nestCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("nest")
    .setDescription("Return DN SEA nest related commands")
    .addStringOption((option) =>
      option
        .setName(NESTS_CATEGORY)
        .setDescription("Commands related to nest")
        .setRequired(false)
        .addChoices(nestCategoryChoices)
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

const lunarCategoryChoices = (() => {
  if (cacheCommand.hasCache(LUNAR_CATEGORIES_CACHE_KEY)) {
    return cacheCommand.get(
      LUNAR_CATEGORIES_CACHE_KEY
    ) as typeof lunarCategories;
  }
  const lunarCategories = allLunar
    .map((lunar) => {
      return { name: lunar.name, value: lunar.name };
    })
    .sort((a, b) => a.value.localeCompare(b.value));

  cacheCommand.set(LUNAR_CATEGORIES_CACHE_KEY, lunarCategories);

  return lunarCategories;
})();

export const lunarCommand = (command: SlashCommandSubcommandBuilder) => {
  return command
    .setName("lunar_frags")
    .setDescription("Return DN SEA lunar fragments related commands")
    .addStringOption((option) =>
      option
        .setName(LUNAR_CATEGORY)
        .setDescription("Commands related to lunar fragments")
        .setRequired(false)
        .addChoices(lunarCategoryChoices)
    )
    .addBooleanOption((option) => addPersistBooleanOption(option));
};

export type NestLunarTypes = "nest" | "lunar_frags";

export const nestLunar = async (
  interaction: ChatInputCommandInteraction,
  type: NestLunarTypes
) => {
  const targetCategory =
    type === "lunar_frags" ? LUNAR_CATEGORY : NESTS_CATEGORY;
  const selectedCategory = interaction.options.getString(targetCategory);
  console.log("🍉 ~ nest ~ selectedCategory:", selectedCategory);

  const persist = interaction.options.getBoolean(IS_PERSIST_NAME) ?? false;

  if (type === "nest") {
    const nest = selectedCategory as AllNestsType | null;
    const isAllNests = !nest;
    const embed = new EmbedBuilder().setTitle(
      `Lunar fragments for ${isAllNests ? "all nests" : nest}:`
    );
    const CACHE_KEY = `NEST_${
      isAllNests ? "ALL" : nest.toUpperCase().split(" ").join("_")
    }`;

    if (cacheCommand.hasCache(CACHE_KEY)) {
      logger.info("nestLunar", `${CACHE_KEY} cache exists`);
      const cacheData = cacheCommand.get(CACHE_KEY);
      embed.addFields(cacheData as APIEmbedField[]);
    } else {
      logger.info("nestLunar", `${CACHE_KEY} cache DOES NOT exist`);
      const lunarData: { nest: AllNestsType; lunarFrags: AllLunarType[] }[] =
        [];
      if (isAllNests) {
        allNests.forEach((nest) => {
          const data = getLunarForNest(nest);
          lunarData.push({ nest: nest, lunarFrags: data });
        });
      } else {
        const data = getLunarForNest(nest);
        lunarData.push({ nest: nest, lunarFrags: data });
      }

      let nestString = "";
      let lunarFragsString = "";
      lunarData.forEach((nestLunarData) => {
        nestString += `${nestLunarData.nest}\n`;
        let lunarFragsSubString = "";
        nestLunarData.lunarFrags.sort().forEach((lunarFrag) => {
          lunarFragsSubString += `${readableLunar(lunarFrag)}  `;
        });
        lunarFragsString += `${lunarFragsSubString}\n`;
      });

      const fields: APIEmbedField[] = [
        {
          name: isAllNests ? "Nests" : "Nest",
          value: nestString,
          inline: true,
        },
        {
          name: `  `,
          value: `  `,
          inline: true,
        },
        { name: "Lunar Fragments", value: lunarFragsString, inline: true },
      ];
      cacheCommand.set(CACHE_KEY, fields);

      embed.addFields(fields);
    }

    return reply({
      type: "dn",
      interaction,
      embedContent: embed,
      persist,
    });
  }

  if (type === "lunar_frags") {
    return reply({
      type: "dn",
      interaction,
      embedContent: "Command related to lunar fragments is coming soon",
    });
  }

  return reply({
    type: "dn",
    interaction,
    embedContent: "No nest or lunar category selected",
  });
};
