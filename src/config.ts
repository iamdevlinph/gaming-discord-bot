import { REST } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, ADMIN_IDS, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !ADMIN_IDS) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  ADMIN_IDS: ADMIN_IDS.replace(/ /g, "").split(","),
  GUILD_ID,
  REST: new REST({ version: "10" }).setToken(DISCORD_TOKEN),
  SKIP_COMMANDS: ["redeploy"],
};
