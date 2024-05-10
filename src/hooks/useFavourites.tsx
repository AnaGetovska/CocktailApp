import { FavouritesContext } from "../context/FavouritesProvider";
import { useContext } from "react";

export default function useFavourites() {
  const context = useContext(FavouritesContext);

  if (!context) {
    throw new Error("useFavourites must be used within an FavouritesProvider");
  }

  return context;
}
