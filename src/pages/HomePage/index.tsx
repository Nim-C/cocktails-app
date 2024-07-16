import { FC, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useDebounceValue } from "usehooks-ts";

import SwiperCardCarousel, {
  CarouselProps,
} from "$src/pages/HomePage/components/Carousel";
import CarouselCard from "$src/pages/HomePage/components/Carousel/Card";

import { searchCocktailsByName } from "$src/api";
import { convertCocktailDtoToCocktail } from "$src/utils";

import "./style.css";

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
    <div className="home-container">
      <h1>Browse Drinks</h1>
      <label htmlFor="serach-input">Search for coktails:</label>
      <input
        id="serach-input"
        onChange={handleInputChange}
        placeholder="Any cocktail name..."
      />
      <SwiperCardCarousel collection={cards} />
    </div>
  );
};

export default HomePage;
