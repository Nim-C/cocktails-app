import { FC, useState } from "react";
import { useLoaderData } from "@tanstack/react-router";

import SwiperCardCarousel, {
  CarouselProps,
} from "$src/pages/HomePage/components/Carousel";
import CarouselCard from "$src/pages/HomePage/components/Carousel/Card";
import Search from "$src/pages/HomePage/components/Search";

import "./style.css";
import { DrinksSearchResultsContext } from "./contexts/DrinksCollectionContext";
import { Cocktail } from "$src/types";

const HomePage: FC = () => {
  const loaderData = useLoaderData({ from: "/" });
  const [results, setResults] = useState<Cocktail[]>([]);

  const collectionToRender = results.length ? results : loaderData || [];

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
      <Search />
      <SwiperCardCarousel collection={cards} />
    </div>
    // </DrinksSearchResultsContext.Provider>
  );
};

export default HomePage;
