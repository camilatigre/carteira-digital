export default (state, action) => {
  switch (action.type) {
    case "SAVE_CREDENTIALS":
      return {
        ...state,
        credentials: action.payload.login,
      };
    default:
      return state;
  }
};
