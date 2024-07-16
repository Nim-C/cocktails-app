import { memo } from "react";

import { searchCocktailsByName } from "$src/api";
import { CocktailDto } from "$src/types";
import { useQuery } from "@tanstack/react-query";

interface SearchResultsProps {
  input: string;
}

const SearchResults = memo(({ input }: SearchResultsProps) => {
  const { data } = useQuery({
    queryKey: ["cocktails", input],
    queryFn: () => searchCocktailsByName(input),
  });

  return (
    <div>
      <h2>Search Results for {input}</h2>
      {data?.drinks.map((result: CocktailDto) => (
        <span key={result.idDrink}>{result.strDrink}, </span>
      ))}
    </div>
  );
});

export default SearchResults;
