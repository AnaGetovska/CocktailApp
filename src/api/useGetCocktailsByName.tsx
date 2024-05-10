import { Cocktails } from "./types";
import useFetch from "./useFetch";

export const useGetCocktailsByName = () => {
  const { commonFetch, isLoading, data } = useFetch<Cocktails>();

  const getCocktailsByName = (wildcard: string) => {
    const url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + wildcard;
    return commonFetch({ url, method: "GET" });
  };

  return { getCocktailsByName, isLoading, collection: data };
};
