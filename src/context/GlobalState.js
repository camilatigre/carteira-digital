import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  credenditals: { login: "" },
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function saveCredentials(login) {
    dispatch({
      type: "SAVE_CREDENTIALS",
      payload: login,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        credenditals: state.credenditals,
        saveCredentials,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
