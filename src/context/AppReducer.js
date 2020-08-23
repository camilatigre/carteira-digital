export default (state, action) => {
  console.log(state);
  switch (action.type) {
    case "SAVE_CREDENTIALS":
      return {
        ...state,
        credentials: state.credentials,
      };
    default:
      return state;
  }
};
