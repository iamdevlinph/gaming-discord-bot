export type GenshinVersionObject = {
  [key: string]: {
    version: string;
    fromDate: string;
    patchDurationDays: number;
  };
};

export const findGenshinVersion = (versionObj: GenshinVersionObject) => {
  const today = new Date();

  const currentVersion = Object.values(versionObj)
    .map((versionObject) => {
      return { ...versionObject, fromDate: new Date(versionObject.fromDate) };
    })
    .sort((a, b) => {
      return +b.fromDate - +a.fromDate;
    })
    .find((versionObj) => +today - +versionObj.fromDate >= 0);

  return currentVersion;
};
