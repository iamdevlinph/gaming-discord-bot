export const allNests = [
  "Archbishop Nest",
  "Chiron Nest",
  "Daidalos Nest",
  "Gigantes Nest",
  "Granom Nest",
  "Guardian Nest",
  "Manticore Nest",
  "Mist Nest",
  "Professor K Nest",
  "Serpentra Nest",
  "Typhoon Kim Nest",
  "Volcano Nest",
] as const;

export type AllNestsType = (typeof allNests)[number];

export const allLunar = [
  {
    name: "Holy",
    color: "#d9ca6c",
    colorEmoji: ":yellow_square:",
  },
  {
    name: "Crystal Clear",
    color: "#55e7ea",
    colorEmoji: ":blue_square:",
  },
  {
    name: "Burning",
    color: "#eb4a3d",
    colorEmoji: ":red_square:",
  },
  {
    name: "Pitch Black",
    color: "#595fd9",
    colorEmoji: ":black_large_square: ",
  },
  {
    name: "Tailwind",
    color: "#5fe39e",
    colorEmoji: ":green_square:",
  },
  {
    name: "Ardent",
    color: "#593622",
    colorEmoji: ":brown_square:",
  },
] as const;

export type AllLunarType = (typeof allLunar)[number]["name"];

export const mappedLunarNest: { [key in AllLunarType]: AllNestsType[] } = {
  Holy: [
    "Manticore Nest",
    "Professor K Nest",
    "Archbishop Nest",
    "Gigantes Nest",
  ],
  "Crystal Clear": [
    "Serpentra Nest",
    "Gigantes Nest",
    "Mist Nest",
    "Chiron Nest",
  ],
  Burning: ["Archbishop Nest", "Volcano Nest", "Guardian Nest", "Chiron Nest"],
  "Pitch Black": [
    "Serpentra Nest",
    "Professor K Nest",
    "Granom Nest",
    "Typhoon Kim Nest",
  ],
  Tailwind: ["Volcano Nest", "Mist Nest", "Granom Nest", "Daidalos Nest"],
  Ardent: [
    "Manticore Nest",
    "Guardian Nest",
    "Daidalos Nest",
    "Typhoon Kim Nest",
  ],
};
