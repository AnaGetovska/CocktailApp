/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import AllCocktails from "../components/AllCocktails.tsx";
import Nav from "../components/Nav.tsx";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
export default function Home() {
  const [displayLoader, setDisplayLoader] = useState(false);
  const [finished, setFinished] = useState(false);
  function handleIsLoading(data: boolean) {
    setDisplayLoader(data);
  }

  function handleHasFinished(data: boolean) {
    setFinished(data);
  }
  return (
    <>
      <Nav />
      <Grid container>
        <Grid xs={2}></Grid>
        <Grid xs={8}>
          <Box flexDirection="column">
            <Box
              gap={4}
              mt="2em"
              justifyContent="center"
              display="flex"
              flexWrap="wrap"
            >
              <AllCocktails
                isLoading={handleIsLoading}
                hasFinished={handleHasFinished}
              />
            </Box>
            <Box mt="2em" justifyContent="center" display="flex">
              {displayLoader && !finished && (
                <CircularProgress color="inherit" />
              )}
              {finished && <Box>No more cocktails. ONOO *o* </Box>}
            </Box>
          </Box>
        </Grid>
        <Grid xs={2}></Grid>
      </Grid>
      <Button>Get Random Cocktail</Button>
    </>
  );
}
