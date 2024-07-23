import * as ping from "./utility/ping";
import * as redeploy from "./utility/redeploy";
import * as getServers from "./utility/get-servers";

import * as dn from "./dn";
import * as genshin from "./genshin-impact";

/**
 * NOTE: Exported command should match the
 * .setName() string in the data SlashCommandBuilder
 */
export const commands = {
  ping,
  dn,
  redeploy,
  genshin,
  "get-servers": getServers,
};
