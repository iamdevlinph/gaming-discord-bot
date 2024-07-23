import {
  ChatInputCommandInteraction,
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

type MessageType = "dn" | "genshin" | "util";

type ReplyType = {
  interaction: ChatInputCommandInteraction | CommandInteraction;
  type: MessageType;
  embedContent?: EmbedBuilder | string | Error;
  error?: Error;
};

const gameMapping: {
  [key in MessageType]: { color: ColorResolvable; thumbnail: string };
} = {
  dn: {
    color: "#846B31",
    thumbnail: "https://vectorified.com/images/dragon-nest-icon-30.png",
  },
  genshin: {
    color: "#1768B3",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPHpfe_BWDsR7RJ0DLCcrGrc3Mu6tBWprhQ&s",
  },
  util: {
    color: "#BA0202",
    thumbnail:
      "https://cdn.discordapp.com/app-icons/1177698138178470000/3f4ccbb669ed9ab75ac1ffe9d6a357fe.png",
  },
};

/**
 *
 * This can accept an EmbedBuilder object
 * or a simple string then it will be converted to an EmbedBuilder
 */
export const reply = ({ type, interaction, embedContent }: ReplyType) => {
  let embed: EmbedBuilder;

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

  embed.setColor(gameMapping[type].color);
  embed.setThumbnail(gameMapping[type].thumbnail);

  return interaction.reply({ embeds: [embed], ephemeral: true });
};
