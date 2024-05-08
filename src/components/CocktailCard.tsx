import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import _ from "lodash";

type CocktailCard = {
  name: string;
  photo: string;
  instructions: string;
};

export default function CocktailCard(props: CocktailCard) {
  const name = props.name;
  const photo = props.photo;
  const instructions = props.instructions;
  //TODO: Collect ingredients
  //const ingredients = props.find(item => item.key.startsWith("ingredient"));

  return (
    <Card sx={{ width: 345 }}>
      <CardActionArea>
        <CardMedia sx={{ height: 140 }} image={photo} title="green iguana" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {instructions}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
