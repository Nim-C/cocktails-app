import { FC, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import * as Label from "@radix-ui/react-label";
import { Box, Heading } from "@radix-ui/themes";

import { useDebounceValue } from "usehooks-ts";

import SwiperCardCarousel, {
  CarouselProps,
} from "$src/pages/HomePage/components/Carousel";
import CarouselCard from "$src/pages/HomePage/components/Carousel/Card";

import { URL_HOME } from "$src/constants";
import { searchCocktailsByName } from "$src/api";
import { convertCocktailDtoToCocktail } from "$src/utils";

import "./style.css";

const HomePage: FC = () => {
  const loaderData = useLoaderData({ from: URL_HOME });

  const [text, setText] = useState("");
  const [debouncedText] = useDebounceValue(text, 500);

  const { data } = useQuery({
    queryKey: ["cocktails", debouncedText],
    queryFn: () => searchCocktailsByName(debouncedText),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const searchResultsFound = !!data?.drinks.length;

  const collectionToRender = searchResultsFound
    ? data.drinks.map(convertCocktailDtoToCocktail)
    : debouncedText
      ? []
      : loaderData;

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
    <div className="home-container">
      <Heading as="h1">Browse Drinks</Heading>
      <br />
      <Label.Root htmlFor="search-input">Search for cocktails</Label.Root>
      <input
        id="search-input"
        onChange={handleInputChange}
        placeholder="Any cocktail name..."
      />
      {cards.length ? null : (
        <Box className="search-failed">Sorry, no results found</Box>
      )}
      {!cards.length ? null : <SwiperCardCarousel collection={cards} />}
    </div>
  );
};

export default HomePage;
