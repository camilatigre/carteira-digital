import React, { createContext, useReducer, useContext } from 'react';
import appReducer from './appReducer';
import PropTypes from 'prop-types';

const initialState = {
  transactions: [],
  coins: {
    reais: {
      amount: 100000,
    },
    bitcoins: {
      buy: 64656.45,
      sell: 64656.45,
      amount: 0,
    },
    brita: {
      buy: 5.57,
      sell: 5.57,
      amount: 0,
    },
  },
};

export const GlobalContext = createContext();
export const GlobalDispatch = createContext();
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <GlobalContext.Provider value={state}>
      <GlobalDispatch.Provider value={dispatch}>{children}</GlobalDispatch.Provider>
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalState = () => useContext(GlobalContext);
export const useDispatch = () => useContext(GlobalDispatch);
