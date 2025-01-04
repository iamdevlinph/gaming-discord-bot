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

export enum lunar {
  HOLY = "Holy",
  CRYSTAL_CLEAR = "Crystal",
  BURNING = "Burning",
  PITCH_BLACK = "Black",
  TAILWIND = "Tailwind",
  ARDENT = "Ardent",
}

export const allLunar = [
  {
    name: lunar.HOLY,
    color: "#d9ca6c",
    colorEmoji: ":yellow_square:",
  },
  {
    name: lunar.CRYSTAL_CLEAR,
    color: "#55e7ea",
    colorEmoji: ":blue_square:",
  },
  {
    name: lunar.BURNING,
    color: "#eb4a3d",
    colorEmoji: ":red_square:",
  },
  {
    name: lunar.PITCH_BLACK,
    color: "#595fd9",
    colorEmoji: ":black_large_square: ",
  },
  {
    name: lunar.TAILWIND,
    color: "#5fe39e",
    colorEmoji: ":green_square:",
  },
  {
    name: lunar.ARDENT,
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
  Crystal: ["Serpentra Nest", "Gigantes Nest", "Mist Nest", "Chiron Nest"],
  Burning: ["Archbishop Nest", "Volcano Nest", "Guardian Nest", "Chiron Nest"],
  Black: [
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
