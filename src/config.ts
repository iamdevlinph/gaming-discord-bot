import { REST } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  ADMIN_IDS,
  DEVELOPER_GUILD_ID,
  STAGE_ENV = "development",
} = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !DEVELOPER_GUILD_ID || !ADMIN_IDS) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  ADMIN_IDS: ADMIN_IDS.replace(/ /g, "").split(","),
  DEVELOPER_GUILD_ID,
  REST: new REST({ version: "10" }).setToken(DISCORD_TOKEN),
  PUBLIC_COMMANDS: ["dn", "genshin", "ping", "about", "valorant"],
  DEVELOPER_COMMANDS: ["redeploy", "get-servers"],
  STAGE_ENV,
};
