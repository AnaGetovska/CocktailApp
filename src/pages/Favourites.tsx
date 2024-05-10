import { useEffect, useState } from "react";
import { useGetCocktailById } from "../api/useGetCocktailById";
import { Cocktail } from "../api/types";
import CocktailCard from "../components/CocktailCard";
import useFavourites from "../hooks/useFavourites";
import Nav from "../components/Nav";
import { Box, Grid, Typography } from "@mui/material";

export default function Favourites() {
  const { getCocktailsById } = useGetCocktailById();
  const favourites = useFavourites().favourites;
  const [favouritesData, setFavouritesData] = useState<Cocktail[]>([]);
  useEffect(() => {
    let results: Cocktail[] = [];
    const getAllFavourites = async () => {
      if (favourites) {
        for (const f of favourites) {
          const c = await getCocktailsById(f.id);
          results = results.concat(c?.drinks[0]);
        }
        setFavouritesData(results);
      }
      return results;
    };
    getAllFavourites();
  }, []);

  return (
    <>
      <Nav />
      <Grid container>
        <Grid xs={0} md={3}></Grid>
        <Grid xs={12} md={6}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", marginTop: "2em" }}
          >
            Favourites
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={4}
            mt="2em"
            mb="5em"
          >
            {favouritesData.map((cocktail) => (
              <Box>
                <CocktailCard
                  id={cocktail.idDrink}
                  name={cocktail.strDrink}
                  photo={cocktail.strDrinkThumb}
                  instructions={cocktail.strInstructions}
                  isUpdated={
                    new Date(cocktail?.dateModified) > new Date() ? true : false
                  }
                />
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid xs={0} md={3}></Grid>
      </Grid>
    </>
  );
}
