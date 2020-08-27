export const saveCredentials = (dispatch, login) => {
  dispatch({
    type: "SAVE_CREDENTIALS",
    payload: login,
  });
};

export const makeTransaction = (
  dispatch,
  { type, from, to, amountFrom, amountTo }
) => {
  dispatch({
    type: "MAKE_TRANSACTION",
    payload: { type, from, to, amountFrom, amountTo },
  });
};

export const setCoins = (dispatch, { type, buy, sell, amount }) => {
  dispatch({
    type: "SET_COINS",
    payload: { type, buy, sell, amount },
  });
};
