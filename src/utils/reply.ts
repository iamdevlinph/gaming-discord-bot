import {
  ChatInputCommandInteraction,
  ColorResolvable,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";

type GameTypes = "dn" | "genshin" | "util";

type ReplyType = {
  interaction: ChatInputCommandInteraction | CommandInteraction;
  game: GameTypes;
  embedContent?: EmbedBuilder | string | Error;
  error?: Error;
};

const gameMapping: {
  [key in GameTypes]: { color: ColorResolvable; thumbnail: string };
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
    thumbnail: "https://iam.devlin.ph/images/logo-no-margin.svg",
  },
};

/**
 *
 * This can accept an EmbedBuilder object
 * or a simple string then it will be converted to an EmbedBuilder
 */
export const reply = ({ game, interaction, embedContent }: ReplyType) => {
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

  embed.setColor(gameMapping[game].color);
  embed.setThumbnail(gameMapping[game].thumbnail);

  return interaction.reply({ embeds: [embed], ephemeral: true });
};
