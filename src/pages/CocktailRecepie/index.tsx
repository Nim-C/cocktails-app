import { FC } from "react";
import { useLoaderData } from "@tanstack/react-router";

import { Cocktail } from "$src/types";

import fallbackImage from "/cocktails.jpg";

import "./styles.css";
import { Box } from "@radix-ui/themes";

export const CocktailRecepie: FC = () => {
  const { name, thumbnail, ingredients, instructions }: Cocktail =
    useLoaderData({
      from: "/cocktail/$id",
    });

  return (
    <Box className="recepie-container">
      <h1 className="title">{name} Recipe</h1>
      <img
        className="cocktail-image"
        src={thumbnail || fallbackImage}
        alt={name}
      />
      <Box className="cocktail-details">
        <Box className="cocktail-ingredients-content">
          <h3>Ingredients:</h3>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.name} : {ingredient.measure}
              </li>
            ))}
          </ul>
        </Box>
        <Box className="cocktail-instructions-content">
          <h3>Instructions:</h3>
          <p>{instructions}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default CocktailRecepie;
