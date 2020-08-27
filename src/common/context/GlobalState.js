import React, { createContext, useReducer, useContext } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  credentials: { login: "" },
  transactions: [],
  coins: {
    reais: {
      amount: 100000,
    },
    bitcoins: {
      buy: 0,
      sell: 0,
      amount: 0,
    },
    brita: {
      buy: 0,
      sell: 0,
      amount: 0,
    },
  },
};

export const GlobalContext = createContext();
export const GlobalDispatch = createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatch.Provider value={dispatch}>
        {children}
      </GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useDispatch = () => useContext(GlobalDispatch);
