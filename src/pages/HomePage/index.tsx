import { FC, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";

import SwiperCardCarousel, {
  CarouselProps,
} from "$src/pages/HomePage/components/Carousel";
import CarouselCard from "$src/pages/HomePage/components/Carousel/Card";
import Search from "$src/pages/HomePage/components/Search";

import "./style.css";
import { Cocktail } from "$src/types";
import { useDebounceValue } from "usehooks-ts";
import { searchCocktailsByName } from "$src/api";
import { useQuery } from "@tanstack/react-query";
import { convertCocktailDtoToCocktail } from "$src/utils";

const HomePage: FC = () => {
  const loaderData = useLoaderData({ from: "/" });

  const [text, setText] = useState("");
  const [debouncedText] = useDebounceValue(text, 500);

  const { data } = useQuery({
    queryKey: ["cocktails", debouncedText],
    queryFn: () => searchCocktailsByName(debouncedText),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const collectionToRender = data?.drinks.length
    ? data.drinks.map(convertCocktailDtoToCocktail)
    : loaderData || [];

  const cards: CarouselProps["collection"] = collectionToRender.map(
    (drink) => ({
      id: drink.id,
      node: (
        <CarouselCard
          id={drink.id}
          imageUrl={drink.thumbnail}
          key={drink.id}
          title={drink.name}
        />
      ),
    })
  );

  return (
    // <DrinksSearchResultsContext.Provider value={{ results, setResults }}>

    <div className="home-container">
      <h1>Browse Drinks</h1>
      {/* <Search /> */}
      <label htmlFor="serach-input">Search for coktails:</label>
      <input
        id="serach-input"
        onChange={handleInputChange}
        placeholder="Any cocktail name..."
      />
      <SwiperCardCarousel collection={cards} />
    </div>
    // </DrinksSearchResultsContext.Provider>
  );
};

export default HomePage;
