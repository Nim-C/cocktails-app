import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { useRouteContext } from "@tanstack/react-router";
import { nanoid } from "nanoid";

import { CocktailDto } from "$src/types";
import FormMessage from "$pages/CocktailCreate/components/form-message";

import "./style.css";
import { Box, Button, Heading } from "@radix-ui/themes";

type SubmissionStatus = "idle" | "success" | "error";

type FormData = {
  strDrink: string;
  strDrinkThumb?: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  strGlass: string;
  strTags: string;
  strVideo: string;
  ingredients: { name: string; measure: string }[];
};

export function CocktailCreate() {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  const {
    cocktails: { saveNewCocktail },
  } = useRouteContext({ from: "/create" });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      ingredients: [{ name: "", measure: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "ingredients" && value !== undefined) {
        if (typeof value === "string") {
          formData.append(key, value);
        }
      }
    });

    data.ingredients.forEach((ing, index) => {
      formData.append(`strIngredient${index + 1}`, ing.name);
      formData.append(`strMeasure${index + 1}`, ing.measure);
    });

    const cocktailData = {
      ...Object.fromEntries(formData.entries()),
      idDrink: nanoid(),
    } as CocktailDto;

    try {
      // Randomly throw an error to simulate a failed submission
      if (Math.random() < 0.5) {
        throw new Error("Submission failed");
      }

      saveNewCocktail(cocktailData);
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

  if (submissionStatus === "success") {
    return (
      <FormMessage variant="submission-status">
        🥳 Successfully created cocktail! You are welcome to navigate to "Home"
        page and find it 😇
      </FormMessage>
    );
  }

  if (submissionStatus === "error") {
    return (
      <FormMessage variant="submission-status">
        🫣 Oh no, Cocktail submission didn't pass, let's try again 🙏! <br />
        <Button color="brown" onClick={() => setSubmissionStatus("idle")}>
          Try again
        </Button>
      </FormMessage>
    );
  }

  return (
    <form
      className="create-cocktail-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Heading as="h1">Create your own cocktail 🍹</Heading>

      <Box className="field">
        <label htmlFor="strDrink">Drink Name:</label>
        <input id="strDrink" {...register("strDrink", { required: true })} />
        {errors.strDrink && (
          <FormMessage variant="field-validation">
            ⬆️ Name is required
          </FormMessage>
        )}
      </Box>
      <Box className="field">
        <label htmlFor="strDrinkThumb">Drink Thumbnail URL:</label>
        <input id="strDrinkThumb" {...register("strDrinkThumb")} />
      </Box>
      <Box className="field">
        <label htmlFor="strVideo">Video URL:</label>
        <input id="strVideo" {...register("strVideo")} />
      </Box>
      <Box className="field">
        <label htmlFor="strGlass">Glass Type:</label>
        <input id="strGlass" {...register("strGlass")} />
      </Box>
      <Box className="field">
        <label htmlFor="strCategory">Category:</label>
        <select
          id="strCategory"
          {...register("strCategory", { required: true })}
        >
          <option value="">Select Category</option>
          <option value="Ordinary Drink">Ordinary Drink</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Shot">Shot</option>
        </select>
        {errors.strCategory && (
          <FormMessage variant="field-validation">
            ⬆️ Category is required
          </FormMessage>
        )}
      </Box>
      <Box className="field">
        <label htmlFor="strAlcoholic">Alcoholic:</label>
        <select
          id="strAlcoholic"
          {...register("strAlcoholic", { required: true })}
        >
          <option value="">Select Alcohol Content</option>
          <option value="Alcoholic">Alcoholic</option>
          <option value="Non alcoholic">Non-alcoholic</option>
          <option value="Optional alcohol">Optional alcohol</option>
        </select>
        {errors.strAlcoholic && (
          <FormMessage variant="field-validation">
            ⬆️ Alcoholic is required
          </FormMessage>
        )}
      </Box>
      {fields.map((field, index) => (
        <Box className="ingredient-field" key={field.id}>
          <label className="name-label" htmlFor={`ingredient${index}`}>
            Ingredient {index + 1}:
          </label>
          <input
            className="name-input"
            id={`ingredient${index}`}
            {...register(`ingredients.${index}.name` as const)}
          />
          <br />
          <label className="measure-label" htmlFor={`measure${index}`}>
            Measure {index + 1}:
          </label>
          <input
            className="measure-input"
            id={`measure${index}`}
            {...register(`ingredients.${index}.measure` as const)}
          />
          <Button
            color="red"
            className="button-remove-ingredient"
            type="button"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            ⛌
          </Button>
        </Box>
      ))}
      <Box className="field">
        <label htmlFor="strInstructions">Instructions:</label>
        <textarea
          id="strInstructions"
          {...register("strInstructions", { required: true })}
        />
        {errors.strInstructions && (
          <FormMessage variant="field-validation">
            ⬆️ Instructions are required
          </FormMessage>
        )}
      </Box>
      <Box className="form-buttons">
        <Button
          color="brown"
          type="button"
          onClick={() => append({ name: "", measure: "" })}
          disabled={fields.length >= 15}
        >
          Add Ingredient
        </Button>
        <button type="submit">Create Cocktail</button>
      </Box>
    </form>
  );
}

export default CocktailCreate;
