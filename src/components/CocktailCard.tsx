import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CardActions,
  Chip,
  Collapse,
  styled,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import React, { useEffect } from "react";
import useFavourites from "../hooks/useFavourites";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type CocktailCard = {
  id: string;
  name: string;
  photo: string;
  instructions: string;
  isUpdated?: boolean;
};

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  fontSize: "1em",
  transition: theme.transitions.create("transform", {}),
}));

export default function CocktailCard(props: CocktailCard) {
  const { id, name, photo, instructions } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [toggleFavourites, setToggleFavourites] = React.useState(false);
  const [initial, setInitial] = React.useState(false);
  const { favourites, addCocktail, removeCocktail } = useFavourites();
  const [isFavourite, setIsFavourite] = React.useState<boolean>(
    _.findIndex(favourites, { id: id }) !== -1
  );
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleFavouritesClick() {
    setToggleFavourites(!toggleFavourites);
    setInitial(true);
  }

  useEffect(() => {
    if (toggleFavourites && initial) {
      addCocktail(id);
      setIsFavourite(true);
    } else if (!toggleFavourites && initial) {
      removeCocktail(id);
      setIsFavourite(false);
    }
  }, [handleFavouritesClick]);

  function handleOpenRecipe() {
    navigate("/recipe/" + id);
  }

  return (
    <Card
      sx={{
        width: {
          lg: 350,
        },
      }}
    >
      <CardActionArea onClick={handleOpenRecipe}>
        <CardMedia
          sx={{ height: 350, aspectRatio: 1 }}
          image={photo}
          title={name}
        />
        <CardContent>
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              justifyContent: "space-between",
              display: "flex",
            }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
            {props.isUpdated && <Chip label="Updated" />}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={handleFavouritesClick}
        >
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Box>see instructions</Box>
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>How to prepare:</Typography>
          <Typography paragraph>{instructions}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
