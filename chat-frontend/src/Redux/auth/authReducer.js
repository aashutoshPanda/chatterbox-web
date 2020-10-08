const initialState = {
  currentUser: false,
  errors: [],
  picLoading: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload };
    case "ERROR":
      return { ...state, errors: action.payload };
    case "RESET":
      return { ...state, errors: [] };
    case "LOADING_TRUE":
        return { ...state, picLoading: true };
    case "LOADING_FALSE":
      return { ...state, picLoading: false };
    default:
      return state;
  }
}
