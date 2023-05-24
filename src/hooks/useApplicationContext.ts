import { useState } from "react";
import ILocalStorage from "../interfaces/ILocalStorage";

export interface IApplicationContext {
  storage: ILocalStorage | undefined;
  setStorage: (storage: ILocalStorage) => void;
}

const useApplicationContext = (): IApplicationContext => {
  const [storage, setStorage] = useState<ILocalStorage | undefined>({
    download: 0,
    upload: 0,
    movies: [],
  });

  return { storage, setStorage };
};

export default useApplicationContext;
