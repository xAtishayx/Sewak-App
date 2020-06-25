const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        email: action.payload.email,
        isAuth: action.payload.isAuth,
      };
    case "REGISTER":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        email: action.payload.email,
      };
    case "VERIFY_AUTH":
      return {
        ...state,
        isAuth: true,
        userData: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
