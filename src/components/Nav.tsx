import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Logo from "./Logo.tsx";
import RandomCocktailButton from "./RandomCocktailButton.tsx";
import { ButtonGroup, Divider } from "@mui/material";

function Nav() {
  return (
    <Box bgcolor="primary.dark" padding="1em">
      <nav>
        <Grid container>
          <Grid xs={4} margin="auto">
            <ButtonGroup>
              <Box display="flex" flexWrap="wrap">
                <Button
                  component={Link}
                  to="/"
                  color="primary"
                  variant="text"
                  aria-label="text primary button group"
                >
                  Home
                </Button>
                <Divider
                  sx={{ display: { xs: "none", sm: "block" } }}
                  orientation="vertical"
                />
                <Button
                  component={Link}
                  to="/favourites"
                  color="primary"
                  variant="text"
                  aria-label="text primary button group"
                >
                  Favourites
                </Button>
              </Box>
            </ButtonGroup>
            <Grid>
              <RandomCocktailButton />
            </Grid>
          </Grid>
          <Grid xs={4}>
            <Box justifyContent="center" display="flex">
              <Link to="/">
                <Logo width="12em"></Logo>
              </Link>
            </Box>
          </Grid>
          <Grid xs={4}></Grid>
        </Grid>
      </nav>
    </Box>
  );
}

export default Nav;
