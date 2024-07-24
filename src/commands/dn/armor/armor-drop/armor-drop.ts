import { reply } from "@utils/reply";
import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from "discord.js";

export const armorDrop = (interaction: ChatInputCommandInteraction) => {
  const embeds = new EmbedBuilder().setTitle(
    "Ancient armor fragments drop locations"
  );

  const partsLocation = [
    {
      part: "helmet",
      location: "anu arendel",
    },
    {
      part: "upper",
      location: "red lotus\nrhadmes",
    },
    {
      part: "lower",
      location: "merca's heart\nmerca's port",
    },
    {
      part: "gloves",
      location: "riverwort wharf",
    },
    {
      part: "shoes",
      location: "hermalte port\nfoothills of black mountain",
    },
  ];

  const fields: APIEmbedField[] = [];
  partsLocation.forEach((item) => {
    fields.push({
      name: item.part,
      value: item.location,
    });
  });

  embeds.addFields(fields);

  reply({ type: "dn", interaction, embedContent: embeds });
};
