import { Cocktail } from "$src/types";
import React, { createContext } from "react";

type SearchResults = {
  results: Cocktail[];
  setResults: React.Dispatch<React.SetStateAction<Cocktail[]>>;
};

const initialDrinksCollection: SearchResults = {
  results: [],
  setResults: () => {},
};

const DrinksSearchResultsContext = createContext<SearchResults>(
  initialDrinksCollection
);

export { DrinksSearchResultsContext };
