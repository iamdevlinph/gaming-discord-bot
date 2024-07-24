import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import logger from "node-color-log";
import {
  findGenshinVersion,
  GenshinVersionObject,
} from "./utility/find-genshin-version";
import { readFile, reply } from "@utils";

export const version = async (interaction: ChatInputCommandInteraction) => {
  try {
    const baseFilePath =
      "/src/commands/genshin-impact/version/data/genshin-impact-version.json";
    const versionData: GenshinVersionObject = JSON.parse(
      readFile({ baseFilePath })
    );

    const currentVersion = findGenshinVersion(versionData)?.version ?? "N/A";

    const embed = new EmbedBuilder().addFields({
      name: "Current version",
      value: currentVersion,
    });

    reply({ type: "genshin", interaction, embedContent: embed });
  } catch (e) {
    const errorMsg =
      "Something went wrong with getting Genshin Impact version.";

    reply({ type: "genshin", interaction, embedContent: new Error(errorMsg) });
    logger.error("genshin version", errorMsg, e);
  }
};
