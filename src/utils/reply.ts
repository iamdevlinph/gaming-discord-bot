import {
  AttachmentBuilder,
  ChatInputCommandInteraction,
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import logger from "node-color-log";

type MessageType = "dn" | "genshin" | "valorant" | "util";

type ReplyType = {
  interaction: ChatInputCommandInteraction | CommandInteraction;
  type: MessageType;
  embedContent?: EmbedBuilder | string | Error;
  error?: Error;
  persist?: boolean | null;
};

const UTILS_IMG_PATH = "src/utils/img";

const msgMapping: {
  [key in MessageType]: {
    color: ColorResolvable;
    fileName: string;
  };
} = {
  dn: {
    color: "#846B31",
    fileName: "dn.png",
  },
  genshin: {
    color: "#1768B3",
    fileName: "genshin.jpg",
  },
  valorant: {
    color: "#D83946",
    fileName: "valorant.png",
  },
  util: {
    color: "#BA0202",
    fileName: "gaming-bot.jpg",
  },
};

/**
 *
 * This can accept an EmbedBuilder object
 * or a simple string then it will be converted to an EmbedBuilder
 */
export const reply = ({
  type,
  interaction,
  embedContent,
  persist = false,
}: ReplyType) => {
  let embed: EmbedBuilder;
  const thumbnail = new AttachmentBuilder(
    `${UTILS_IMG_PATH}/${msgMapping[type].fileName}`
  );

  if (typeof embedContent === "string" || embedContent instanceof Error) {
    const isError = embedContent instanceof Error;
    embed = new EmbedBuilder();

    if (isError) {
      embed.addFields({ name: "Error", value: embedContent.message });
    } else {
      embed.addFields({ name: "Info", value: embedContent });
    }
  } else {
    embed = embedContent as EmbedBuilder;
  }

  embed.setColor(msgMapping[type].color);
  embed.setThumbnail(`attachment://${msgMapping[type].fileName}`);

  return interaction.reply({
    embeds: [embed],
    ephemeral: !persist,
    files: [thumbnail],
  });
};
