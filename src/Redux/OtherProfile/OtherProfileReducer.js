const initialState = {
  otherProfile: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "OTHER_PROFILE":
      return { ...state, otherProfile: action.payload };
    case "RESET_OTHER_PROFILE":
      return initialState;
    default:
      return state;
  }
}
