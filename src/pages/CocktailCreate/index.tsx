import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import { CocktailDto } from "$src/types";
import { useRouteContext } from "@tanstack/react-router";

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

    saveNewCocktail(cocktailData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="strDrink">Drink Name:</label>
        <input id="strDrink" {...register("strDrink", { required: true })} />
        {errors.strDrink && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="strDrinkThumb">Drink Thumbnail URL:</label>
        <input id="strDrinkThumb" {...register("strDrinkThumb")} />
      </div>

      <div>
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
        {errors.strCategory && <span>This field is required</span>}
      </div>

      <div>
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
        {errors.strAlcoholic && <span>This field is required</span>}
      </div>

      {fields.map((field, index) => (
        <div key={field.id}>
          <label htmlFor={`ingredient${index}`}>Ingredient {index + 1}:</label>
          <input
            id={`ingredient${index}`}
            {...register(`ingredients.${index}.name` as const)}
          />
          <label htmlFor={`measure${index}`}>Measure {index + 1}:</label>
          <input
            id={`measure${index}`}
            {...register(`ingredients.${index}.measure` as const)}
          />
          <button type="button" onClick={() => remove(index)}>
            Remove
          </button>
        </div>
      ))}

      <div>
        <label htmlFor="strInstructions">Instructions:</label>
        <textarea
          id="strInstructions"
          {...register("strInstructions", { required: true })}
        />
        {errors.strInstructions && <span>This field is required</span>}
      </div>

      <div>
        <label htmlFor="strGlass">Glass Type:</label>
        <input id="strGlass" {...register("strGlass")} />
      </div>

      <div>
        <label htmlFor="strTags">Tags:</label>
        <input id="strTags" {...register("strTags")} />
      </div>

      <div>
        <label htmlFor="strVideo">Video URL:</label>
        <input id="strVideo" {...register("strVideo")} />
      </div>

      <button
        type="button"
        onClick={() => append({ name: "", measure: "" })}
        disabled={fields.length >= 15}
      >
        Add Ingredient
      </button>
      <button type="submit">Create Cocktail</button>
    </form>
  );
}

export default CocktailCreate;
