import _ from "lodash";
import { createContext, useState } from "react";

interface FavouritesContext {
  favourites: FavouritesEntry[];
  addCocktail: (id: string) => void;
  removeCocktail: (id: string) => void;
}

interface FavouritesEntry {
  id: string;
  date: string;
}

const FavouritesContext = createContext<FavouritesContext>({
  favourites: [],
  addCocktail: () => {},
  removeCocktail: () => {},
});

const FavouritesProvider = ({ children }: { children?: React.ReactNode }) => {
  const getFavourites = (): FavouritesEntry[] => {
    const favouritesString = localStorage.getItem("favourites");
    if (!favouritesString || favouritesString === "undefined") {
      return [];
    }
    return favouritesString ? JSON.parse(favouritesString) : [];
  };
  const [favourites, setFavourites] = useState<FavouritesEntry[]>(
    getFavourites()
  );

  const saveFavourites = (newCollection: FavouritesEntry[]) => {
    localStorage.setItem("favourites", JSON.stringify(newCollection));
    setFavourites(newCollection);
  };

  const addCocktail = (id: string) => {
    const index = _.findIndex(favourites, { id: id });
    if (index !== -1) {
      return;
    }
    const favouritesCopy = getFavourites();
    const newFavourite = { id: id, date: new Date().toString() };
    favouritesCopy.push(newFavourite);
    saveFavourites(favouritesCopy);
  };

  const removeCocktail = (id: string) => {
    const index = _.findIndex(favourites, { id: id });
    if (index === -1) {
      return;
    }
    const newFavourites = getFavourites();
    newFavourites.splice(index, 1);
    saveFavourites(newFavourites);
  };
  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addCocktail,
        removeCocktail,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export { FavouritesContext, FavouritesProvider };
