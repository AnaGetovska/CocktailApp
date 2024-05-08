import { useInfiniteQuery } from "@tanstack/react-query";
import { Cocktail, Cocktails } from "../api/types";
import CocktailCard from "./CocktailCard";
import _ from "lodash";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";

type CocktailCard = {
  strDrink: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
};

export default function AllCocktails({ isLoading, hasFinished }: any) {
  const { ref, inView } = useInView({});
  const [queryIndex, setQueryIndex] = useState<number>(0);
  const [buffer, setBuffer] = useState<Cocktail[]>([]);
  const [stopper, setStopper] = useState(false);

  const fetchCocktails = async ({ pageParam }: { pageParam: number }) => {
    const charset = "abcdefghijklmnopqrstuvwxyz";
    const chunkSize = 100;
    let currentBuffer = [...buffer];
    let currentIndex = queryIndex;

    const sliceChunk = () => {
      const chunk = currentBuffer.splice(0, chunkSize);
      setBuffer(currentBuffer);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return new Promise<any>((resolve) => resolve(chunk));
    };
    if (currentIndex > charset.length) {
      setStopper(true);
      return new Promise((resolve) => resolve(null));
    }
    if (currentBuffer.length >= chunkSize) {
      return sliceChunk();
    }

    const fetchChunk = async () => {
      const letter = charset[currentIndex];
      const res = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
      );

      const result = (await res.json())?.drinks as Cocktail[];

      if (result && result.length > 0 && result[0]) {
        currentBuffer = currentBuffer.concat(result);
        setBuffer(currentBuffer);
        return true;
      } else {
        return false;
      }
    };

    while (currentBuffer.length < chunkSize && currentIndex < charset.length) {
      await fetchChunk();
      currentIndex++;
      setQueryIndex(currentIndex);
    }

    if (currentIndex >= charset.length) {
      setStopper(true);
    }

    return sliceChunk();
  };

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["1"],
      queryFn: fetchCocktails,
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length : "undefined";
        return nextPage;
      },
    });

  useEffect(() => {
    if (inView && !stopper) {
      fetchNextPage();
    }
  }, [inView, stopper, fetchNextPage]);

  return (
    <>
      {_.flatten(data?.pages).map((d: Cocktail) => {
        return (
          <CocktailCard
            name={d.strDrink}
            photo={d.strDrinkThumb}
            instructions={d.strInstructions}
          />
        );
      })}
      <Box ref={ref}>
        {isFetchingNextPage && isLoading(true)}
        {stopper && hasFinished(true)}
      </Box>
    </>
  );
}
// const properyNames = Object.getOwnPropertyNames(d);
// const ingredientProps = _.filter(properyNames, (name) => {
//   return name.startsWith("strIngredient") && (d as any)[name];
// });
// const ingredients = forEach(ingredientProps as string[], (p) => {
//   return (d as any)[p];
// });
// console.log(ingredients);
