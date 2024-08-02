import * as fs from "fs";

export const writeFile = ({
  baseFilePath,
  content,
}: {
  baseFilePath: string;
  content: Object;
}) => {
  const basePath = process.cwd();
  const fullPath = `${basePath}/${baseFilePath}`;

  return fs.writeFileSync(fullPath, JSON.stringify(content));
};
