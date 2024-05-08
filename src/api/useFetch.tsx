import { useState } from "react";

type FetchProps = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
};

export default function useFetch<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const commonFetch = async ({ url, method }: FetchProps) => {
    setIsLoading(true);

    const response = await fetch(url, {
      mode: "cors",
      method,
      headers: {
        Accept: "text/html",
      },
    });

    const data = await response.json();

    setIsLoading(false);
    setData(data);
  };

  return { isLoading, commonFetch, data };
}
