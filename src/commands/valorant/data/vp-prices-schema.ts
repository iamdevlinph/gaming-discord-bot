type Currencies = "php";

export type VPPricesSchema = {
  currencies: { [key in Currencies]: number[] };
  prices: number[];
};
