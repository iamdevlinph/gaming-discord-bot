import { config } from "../config";

export const isAdmin = (id: string) => config.ADMIN_IDS.includes(id);
