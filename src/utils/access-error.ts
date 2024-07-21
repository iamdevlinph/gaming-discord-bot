import logger from "node-color-log";

export const accessError = ({
  command,
  userId,
}: {
  command: string;
  userId: string;
}) => logger.error("Tried to access", command, userId);
