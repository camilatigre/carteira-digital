import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  credentials: { login: "" },
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
        credentials: state.credentials,
        saveCredentials,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
