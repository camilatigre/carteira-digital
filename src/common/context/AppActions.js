export const makeTransaction = (dispatch, { type, from, to, amountFrom, amountTo }) => {
  dispatch({
    type: 'MAKE_TRANSACTION',
    payload: { type, from, to, amountFrom, amountTo },
  });
};

export const setCoins = (dispatch, { type, buy, sell, amount }) => {
  dispatch({
    type: 'SET_COINS',
    payload: { type, buy, sell, amount },
  });
};

export const updateCoinsAmount = (dispatch, objAmountFrom, objAmountTo) => {
  dispatch({
    type: 'UPDATE_COINS',
    payload: { objAmountFrom, objAmountTo },
  });
};
