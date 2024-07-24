import * as fs from "fs";

export const readFile = ({ baseFilePath }: { baseFilePath: string }) => {
  const basePath = process.cwd();
  const fullPath = `${basePath}/${baseFilePath}`;

  return fs.readFileSync(fullPath, "utf8");
};
