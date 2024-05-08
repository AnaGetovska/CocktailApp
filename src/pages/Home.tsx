/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useGetCocktails } from "../api/requestHooks.tsx";
import Nav from "../components/Nav.tsx";
import { Box, Button, Grid } from "@mui/material";
import CocktailCard from "../components/CocktailCard.tsx";
export default function Home() {
  const { getCocktailsByFirstLetter, data } = useGetCocktails();
  // const { cocktails, setCocktails } = useState(false);
  let letterIndex = 0;

  const letter = String.fromCharCode(97 + letterIndex);
  useEffect(() => {
    getCocktailsByFirstLetter(letter);
    letterIndex++;
  }, []);
  console.log(data);
  return (
    <>
      <Nav />
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <Box
            gap={4}
            mt="2em"
            justifyContent="center"
            display="flex"
            flexWrap="wrap"
          >
            {data?.drinks?.map((d) => {
              // const properyNames = Object.getOwnPropertyNames(d);
              // const ingredientProps = _.filter(properyNames, (name) => {
              //   return name.startsWith("strIngredient") && (d as any)[name];
              // });
              // const ingredients = forEach(ingredientProps as string[], (p) => {
              //   return (d as any)[p];
              // });
              // console.log(ingredients);

              return (
                <CocktailCard
                  name={d.strDrink}
                  photo={d.strDrinkThumb}
                  category={d.strCategory}
                  type={d.strAlcoholic}
                />
              );
            })}
            ;
          </Box>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
      <Button>Get Random Cocktail</Button>
    </>
  );
}
