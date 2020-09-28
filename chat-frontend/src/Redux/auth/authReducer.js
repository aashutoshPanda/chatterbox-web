const initialState = {
  currentUser: false,
  errors: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload };
    case "LOGOUT_USER":
      return { ...state, currentUser: false };
    case "ERROR":
      return { ...state, errors: action.payload };
    case "RESET":
      return { ...state, errors: [] };
    default:
      return state;
  }
}
