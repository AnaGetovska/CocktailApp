import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Logo from "./Logo.tsx";

function Nav() {
  return (
    <Box bgcolor="primary.light" padding="1em">
      <nav>
        <Grid container>
          <Grid xs={4} margin="auto">
            <Grid>
              <Button
                component={Link}
                to="/"
                variant="contained"
                color="primary"
              >
                Home
              </Button>
            </Grid>
            <Grid>
              <Button
                component={Link}
                to="/favourites"
                variant="contained"
                color="primary"
              >
                Favourites
              </Button>
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
