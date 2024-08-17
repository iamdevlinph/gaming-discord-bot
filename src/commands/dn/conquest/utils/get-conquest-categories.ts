import { APIApplicationCommandOptionChoice } from "discord.js";

export const getConquestCategories =
  (): APIApplicationCommandOptionChoice[] => {
    return [
      {
        name: "Create conquest",
        value: "create",
      },
      {
        name: "Start conquest",
        value: "start",
      },
      {
        name: "Join conquest",
        value: "join",
      },
    ];
  };
