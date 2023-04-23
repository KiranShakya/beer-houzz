export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: ValueUnit;
  boil_volume: ValueUnit;
  method: {
    mash_temp: Array<{
      temp: ValueUnit;
      duration: number | null;
    }>;
    fermentation: {
      temp: ValueUnit;
    };
    twist: string | null;
  };
  ingredients: {
    malt: Array<Partial<IngredientDetails>>;
    hops: Array<Partial<IngredientDetails>>;
    yeast: string;
  };
  food_pairing: Array<string>;
  brewers_tips: string;
  contributed_by: string;
}

export interface ValueUnit {
  value: number;
  unit: string;
}

export interface IngredientDetails {
  name: string;
  amount: ValueUnit;
  add: string;
  attribute: string;
}

// You might get confused what these types are.
// This one defined tha date should be in format MM-YYYY (MM limited to 1 - 12, but YYYY can be any number)
type BrewedDate = `${IntRange<1, 13>}-${number}`;

// This enumerate type provides recursive type definition to generate an array of numbers from 0 to N - 1
// WARNING: We cannot recurse deeply. Smaller number range is fine.
type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

// This type uses above enumerate type to exclude numbers outside the range
type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>;

export interface PunkApiRequestOptions {
  abv_gt: number; // Alcohol by volume(ABV) greater than the supplied number
  abv_lt: number; // ABV less than the supplied number
  ibu_gt: number; // International Bitterness Units(IBU) greater than the supplied number
  ibu_lt: number; // IBU less than the supplied number
  ebc_gt: number; // European Brewery Convention(EBC) greater than the supplied number
  ebc_lt: number; // EBC less than the supplied number
  beer_name: string; // Supports partial match. Underscore(_) for space.
  yeast: string; // Performs a fuzzy match. Underscore(_) for space.
  brewed_before: BrewedDate; // the date format is mm-yyyy
  brewed_after: BrewedDate; // the date format is mm-yyyy
  hops: string; // Performs a fuzzy match. Underscore(_) for space.
  malt: string; // Performs a fuzzy match. Underscore(_) for space.
  food: string; // Performs a fuzzy match. Underscore(_) for space.
  ids: string; // Delimit ids with pipes(|). Example 4|3|21
}

export interface Cache<T> {
  expires: number;
  value: T;
}
