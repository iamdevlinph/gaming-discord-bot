import { readFile } from "@utils";
import logger from "node-color-log";
import { writeFile } from "./write-file";
import { doesFileExist } from "./does-file-exist";

const CACHE_FILE_PATH = "src/utils/cache/cache-data.json";

type CacheDataType = { [key: string]: Object } & Object;

let cacheData: CacheDataType;

try {
  if (doesFileExist({ baseFilePath: CACHE_FILE_PATH })) {
    logger.info("cacheCommand", "File exists");
    cacheData = JSON.parse(readFile({ baseFilePath: CACHE_FILE_PATH }));
  } else {
    logger.error("cacheCommand", "File does not exist. Creating file");
    writeFile({ baseFilePath: CACHE_FILE_PATH, content: {} });
  }
} catch (e) {
  logger.error(
    "cacheCommand",
    "Somethig went wrong with cacheCommand cache-data.json file",
    e
  );
}

export const cacheCommand = {
  get: (key: string) => {
    if (cacheData.hasOwnProperty(key)) return cacheData[key];

    return null;
  },
  hasCache: (key: string) => cacheData.hasOwnProperty(key),
  set: (key: string, data: Object) => {
    return writeFile({
      baseFilePath: CACHE_FILE_PATH,
      content: { ...cacheData, [key]: data },
    });
  },
};
