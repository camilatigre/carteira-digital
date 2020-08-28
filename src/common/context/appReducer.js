const reducer = (state, action) => {
  switch (action.type) {
    case 'MAKE_TRANSACTION': {
      const { type, from, to, amountFrom, amountTo } = action.payload;
      let transactions = state.transactions;

      transactions = transactions.concat({ type, from, to, amountFrom, amountTo });

      return {
        ...state,
        transactions,
      };
    }

    case 'SET_COINS': {
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
    }

    case 'UPDATE_COINS': {
      const { typeFrom, amountFrom } = action.payload.objAmountFrom;
      const { typeTo, amountTo } = action.payload.objAmountTo;

      const coins = state.coins;
      coins[typeFrom]['amount'] = amountFrom <= 0 ? 0 : amountFrom;
      coins[typeTo]['amount'] = amountTo <= 0 ? 0 : amountTo;

      return {
        ...state,
        coins,
      };
    }
    default:
      return state;
  }
};

export default reducer;
