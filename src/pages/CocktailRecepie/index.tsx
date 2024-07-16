import { FC } from "react";
import { useLoaderData } from "@tanstack/react-router";
import { Box } from "@radix-ui/themes";

import { Cocktail } from "$src/types";

import fallbackImage from "/cocktails.jpg";

import { URL_COCKTAIL_BY_ID } from "$src/constants";
import "./styles.css";

export const CocktailRecepie: FC = () => {
  const { name, thumbnail, ingredients, instructions }: Cocktail =
    useLoaderData({
      from: URL_COCKTAIL_BY_ID,
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
