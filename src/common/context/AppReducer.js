export default (state, action) => {
  switch (action.type) {
    case "SAVE_CREDENTIALS":
      return {
        ...state,
        credentials: action.payload.login,
      };
    case "MAKE_TRANSACTION":
      const { type, from, to, amountFrom, amountTo } = action.payload;
      state.transactions.push({ type, from, to, amountFrom, amountTo });
      return state;
    case "SET_COINS":
      let coin = action.payload.type;
      let buy = action.payload.buy;
      let sell = action.payload.sell;
      let amount = action.payload.amount;

      let attCoin = {
        [coin]: {
          buy,
          sell,
          amount,
        },
      };
      return {
        ...state,
        coins: Object.assign(state.coins, attCoin),
      };
    default:
      return state;
  }
};
