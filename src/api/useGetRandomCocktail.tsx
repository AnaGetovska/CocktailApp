import { Cocktails } from "./types";
import useFetch from "./useFetch";

export const useGetRandomCocktail = () => {
  const { commonFetch, isLoading, data } = useFetch<Cocktails>();

  const getRandomCocktail = async () => {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
    return await commonFetch({ url, method: "GET" });
  };

  return { getRandomCocktail, isLoading, data };
};
