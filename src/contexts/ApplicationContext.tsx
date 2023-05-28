import { ReactNode, createContext } from "react";
import useApplicationContext, {
  IApplicationContext,
} from "../hooks/useApplicationContext";

const ApplicationContext = createContext<IApplicationContext>({
  storage: undefined,
  setStorage: () => void 0,
});

const ApplicationContextProvider = ({ children }: { children: ReactNode }) => {
  const store = useApplicationContext();

  return (
    <ApplicationContext.Provider value={store}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationContextProvider };
