const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userData: action.payload.userData,
        isAuth: action.payload.isAuth,
      };
    case "REGISTER":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        userData: action.payload.userData,
      };
    case "HOSPITAL_REGISTER":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        hospitalData: action.payload.hospitalData,
        isHospital: action.payload.isHospital,
      };
    case "HOSPITAL_LOGIN":
      return {
        ...state,
        isAuth: action.payload.isAuth,
        hospitalData: action.payload.hospitalData,
        isHospital: action.payload.isHospital,
      };
    case "VERIFY_AUTH":
      return {
        ...state,
        isAuth: true,
        userData: action.payload.userData,
        isHospital: action.payload.isHospital,
        hospitalData: action.payload.hospitalData
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
