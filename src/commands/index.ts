import * as ping from "./utility/ping";
import * as redeploy from "./utility/redeploy";
import * as getServers from "./utility/get-servers";
import * as about from "./utility/about";

import * as dn from "./dn";
import * as genshin from "./genshin-impact";
import * as valorant from "./valorant";

/**
 * NOTE: Exported command should match the
 * .setName() string in the data SlashCommandBuilder
 */
export const commands = {
  redeploy,
  "get-servers": getServers,
  about,

  dn,
  genshin,
  valorant,
  ping,
};
