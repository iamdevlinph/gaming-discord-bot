import * as fs from "fs";

export const doesFileExist = ({ baseFilePath }: { baseFilePath: string }) => {
  const basePath = process.cwd();
  const fullPath = `${basePath}/${baseFilePath}`;

  return fs.existsSync(fullPath);
};
