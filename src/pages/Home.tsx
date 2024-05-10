/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AllCocktails from "../components/AllCocktails.tsx";
import Nav from "../components/Nav.tsx";
import { Box, CircularProgress, Grid } from "@mui/material";
import { useGetCocktailsByName } from "../api/useGetCocktailsByName.tsx";
import Search from "../components/Search.tsx";
import CocktailCard from "../components/CocktailCard.tsx";
import { Cocktail } from "../api/types.tsx";
import _ from "lodash";

export default function Home() {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [finished, setFinished] = useState(false);
  const { getCocktailsByName, collection } = useGetCocktailsByName();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (searchQuery.length > 2) {
      getCocktailsByName(searchQuery);
    }
  }, [searchQuery]);

  function handleIsLoading(data: boolean) {
    setDisplayLoader(data);
  }

  function handleHasFinished(data: boolean) {
    setFinished(data);
  }

  return (
    <Box>
      <Nav />
      <Grid container>
        <Grid xs={0} md={2}></Grid>
        <Grid xs={12} md={8}>
          <Box flexDirection="column">
            <Box display="flex" justifyContent="center" marginTop="1em">
              <Search setSearchQuery={setSearchQuery} />
            </Box>
            <Box
              gap={4}
              mt="2em"
              mb="5em"
              justifyContent="center"
              display="flex"
              flexWrap="wrap"
            >
              {searchQuery.length <= 2 ? (
                <>
                  <AllCocktails
                    isLoading={handleIsLoading}
                    hasFinished={handleHasFinished}
                  />
                  <Box mt="2em" justifyContent="center" display="flex">
                    {displayLoader && !finished && (
                      <CircularProgress color="inherit" />
                    )}
                    {finished && <Box>No more cocktails. ONOO *o* </Box>}
                  </Box>
                </>
              ) : (
                <>
                  {_.flatten(collection?.drinks).map((d: Cocktail) => {
                    return (
                      <Box>
                        <CocktailCard
                          id={d.idDrink}
                          name={d.strDrink}
                          photo={d.strDrinkThumb}
                          instructions={d.strInstructions}
                        />
                      </Box>
                    );
                  })}
                </>
              )}
            </Box>
          </Box>
        </Grid>
        <Grid xs={0} md={2}></Grid>
      </Grid>
    </Box>
  );
}
