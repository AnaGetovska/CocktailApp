import { Cocktails } from "./types";
import useFetch from "./useFetch";

export const useGetCocktailById = () => {
  const { commonFetch, isLoading, data } = useFetch<Cocktails>();

  const getCocktailsById = async (id: string) => {
    const url =
      "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id;
    return await commonFetch({ url, method: "GET" });
  };

  return { getCocktailsById, isLoading, data };
};
