import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import logger from "node-color-log";
import { readFile, reply } from "@utils";
import { VPPricesSchema } from "../data/vp-prices-schema";
const toReversed = require("array.prototype.toreversed");

let vpPrices: VPPricesSchema | undefined = undefined;

try {
  const baseFilePath = "src/commands/valorant/data/vp-prices.json";
  vpPrices = JSON.parse(readFile({ baseFilePath }));
} catch (e) {
  logger.error(
    "buyVp",
    "Somethig went wrong with reading vp-prices.json file",
    e
  );
}

export const buyVpCommand = (command: SlashCommandSubcommandBuilder) => {
  const currencies = vpPrices ? Object.keys(vpPrices.currencies) : ["n/a"];
  const currencyCategories = currencies.map((currency) => {
    return { name: currency.toUpperCase(), value: currency };
  });

  return command
    .setName("buy_vp")
    .setDescription("Return how much currency to buy valorant points")

    .addStringOption((option) =>
      option
        .setName("valo_points")
        .setDescription("How many valorant points")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("wallet_valo_points")
        .setDescription("How many valorant points you have")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("currency")
        .setDescription("Currency")
        .setRequired(true)
        .addChoices(currencyCategories)
    );
};

export const buyVp = async (interaction: ChatInputCommandInteraction) => {
  if (!vpPrices) {
    const errorMsg = "Something went wrong with the buy_vp command";
    logger.error("buyVp", errorMsg);
    return reply({
      type: "valorant",
      interaction,
      embedContent: new Error(errorMsg),
    });
  }
  const currency = interaction.options.getString(
    "currency"
  ) as keyof VPPricesSchema["currencies"];
  const valoPoints = interaction.options.getString("valo_points") as string;
  const walletValoPoints = interaction.options.getString("wallet_valo_points");

  // return if points input is not valid number
  if (isNaN(valoPoints as any) || isNaN(walletValoPoints as any)) {
    const errorMsg = "Valorant points must be a number";
    return reply({
      type: "valorant",
      interaction,
      embedContent: new Error(errorMsg),
    });
  }

  const minimumPoints = vpPrices.prices[0];

  // return if points is smaller than the smallest possible points
  if (+valoPoints < minimumPoints) {
    return reply({
      type: "valorant",
      interaction,
      embedContent: new Error(`Value can't be less than ${minimumPoints}`),
    });
  }

  // deduct wallet points from points to calculate
  // but if wallet points is >= than points to calculate, just ignore it
  const valoPointsNum =
    !!walletValoPoints &&
    +walletValoPoints > 0 &&
    +walletValoPoints < +valoPoints
      ? +valoPoints - +walletValoPoints
      : +valoPoints;

  const embeds = new EmbedBuilder().setTitle(
    `Buying ${valoPointsNum} valorant points`
  );

  const { totalPrice, pointsBreakdown, priceBreakdown } = calculateHowMuc(
    currency,
    valoPointsNum
  );

  let msg = `${valoPointsNum.toLocaleString()} valorant points is worth ${totalPrice.toLocaleString()} ${currency}`;

  if (
    walletValoPoints &&
    +walletValoPoints > 0 &&
    +walletValoPoints < valoPointsNum
  ) {
    // const diff = (valoPointsNum - +walletValoPoints).toLocaleString();
    msg = `Since you currently have ${walletValoPoints} point(s)\n`;
    msg += `you need ${valoPointsNum.toLocaleString()} point(s)\n`;
    msg += `which is worth ${totalPrice.toLocaleString()} ${currency}`;
  }

  embeds.setDescription(msg);
  embeds.addFields({
    name: "Breakdown of points to buy",
    value: pointsBreakdown.join("\n"),
    inline: true,
  });
  embeds.addFields({
    name: "Price",
    value: priceBreakdown.join("\n"),
    inline: true,
  });

  reply({ type: "valorant", interaction, embedContent: embeds });
};

function calculateHowMuc(
  currency: keyof VPPricesSchema["currencies"],
  points: number
) {
  const pointsBreakdown: number[] = [];
  const priceBreakdown: number[] = [];
  const pricesArr = toReversed(vpPrices?.currencies[currency] as number[]);
  const pointsArr = toReversed(vpPrices?.prices as number[]);
  let pointsCalc = points;
  let totalPrice = 0;
  for (let ctr = 0; pointsCalc > 0; ) {
    if (pointsCalc - pointsArr[ctr] < 0 && ctr === pointsArr.length - 1) {
      totalPrice += pricesArr[ctr];
      pointsCalc -= pointsArr[ctr];
      priceBreakdown.push(pricesArr[ctr]);
      pointsBreakdown.push(pointsArr[ctr]);
      break;
    }

    if (pointsCalc >= pointsArr[ctr]) {
      totalPrice += pricesArr[ctr];
      pointsCalc -= pointsArr[ctr];
      priceBreakdown.push(pricesArr[ctr]);
      pointsBreakdown.push(pointsArr[ctr]);
    } else {
      ctr++;
    }
  }
  return { totalPrice, pointsBreakdown, priceBreakdown };
}
