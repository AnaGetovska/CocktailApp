import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useGetRandomCocktail } from "../api/useGetRandomCocktail";
import CocktailCard from "./CocktailCard";
import { Cocktail } from "../api/types";
import _ from "lodash";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RandomCocktailButton() {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = React.useState(false);
  const [cocktail, setCocktail] = React.useState<Cocktail>();
  const { getRandomCocktail } = useGetRandomCocktail();

  useEffect(() => {
    const getRandom = async () => {
      const c = await getRandomCocktail();
      setCocktail(c.drinks[0]);
    };
    if (open) {
      getRandom();
    }
  }, [open]);
  return (
    <Box
      sx={{ textAlign: { sm: "left" }, marginTop: { xs: "0.5em", md: "1em" } }}
    >
      <Button variant="outlined" onClick={handleOpen}>
        Get random cocktail
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Fade in={open}>
          <Box
            sx={style}
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
          >
            <Typography
              marginBottom="2em"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              This is your special cocktail!
            </Typography>
            {cocktail && (
              <CocktailCard
                id={cocktail.strDrink}
                name={cocktail.strDrink}
                photo={cocktail.strDrinkThumb}
                instructions={cocktail.strInstructions}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
