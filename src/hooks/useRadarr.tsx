import { useLayoutEffect, useState } from "react";

const useRadarr = <T,>(method: string, endpoint: string, body?: object) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState<T>();
  const [serverError, setServerError] = useState<unknown>(null);

  useLayoutEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        let requestInit: RequestInit = {
          method: method,
          headers: {
            "X-Api-Key": "f114aadeaafe45d5b06861d50686db16",
          },
        };
        if (body) requestInit.body = JSON.stringify(body);

        const response = await window.fetch(
          `http://192.168.50.104:7878${endpoint}`,
          requestInit
        );
        const data: T = await response?.json();

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [method, endpoint, body]);

  return { isLoading, apiData, serverError };
};

export default useRadarr;
