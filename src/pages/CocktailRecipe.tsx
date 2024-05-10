/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Chip, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Cocktail, Cocktails } from "../api/types";
import { useGetCocktailById } from "../api/useGetCocktailById";
import Nav from "../components/Nav";
import Image from "mui-image";
import { forEach } from "lodash";
import _ from "lodash";

export default function CocktailRecipe() {
  const { id } = useParams();
  const { getCocktailsById } = useGetCocktailById();
  const [cocktail, setCocktail] = useState<Cocktail>();

  let results: Cocktails = { drinks: undefined };
  const properyNames = Object.getOwnPropertyNames(cocktail || {});
  const ingredientProps = _.filter(properyNames, (name) => {
    return name.startsWith("strIngredient") && (cocktail as any)[name];
  });
  const ingredients = forEach(ingredientProps as string[], (p) => {
    return (cocktail as any)[p];
  });
  useEffect(() => {
    const getAllFavourites = async () => {
      if (id) {
        const c = await getCocktailsById(id);
        results = c;
        if (c.drinks[0]) {
          setCocktail(c.drinks[0]);
        }
      }
      return results;
    };
    getAllFavourites();
  }, []);

  return (
    <Box>
      <Nav />
      <Grid container marginTop="4em">
        <Grid xs={0} md={3}></Grid>
        <Grid xs={0} md={3}>
          <Image width="100%" src={cocktail?.strDrinkThumb || ""}></Image>
        </Grid>
        <Grid xs={0} md={3}>
          <Box padding="1em">
            <Typography marginBottom="1em" variant="h4">
              {cocktail?.strDrink}
            </Typography>
            {ingredients.map((i) => (
              <Chip
                sx={{ marginRight: "1em" }}
                label={(cocktail as any)[i]}
                variant="outlined"
              />
            ))}
            <Typography sx={{ marginTop: "1em" }} paragraph>
              {cocktail?.strInstructions}
            </Typography>
          </Box>
        </Grid>
        <Grid xs={0} md={3}></Grid>
      </Grid>
    </Box>
  );
}
