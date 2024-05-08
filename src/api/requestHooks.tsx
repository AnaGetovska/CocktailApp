import { Cocktails } from "./types";
import useFetch from "./useFetch";

export const useGetCocktails = () => {
  const { commonFetch, isLoading, data } = useFetch<Cocktails>();

  const getCocktailsByFirstLetter = (letter: string) => {
    const url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + letter;
    return commonFetch({ url, method: "GET" });
  };

  return { getCocktailsByFirstLetter, isLoading, data };
};
