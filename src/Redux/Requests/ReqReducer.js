const initialState = {
  Requests: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "REQUESTS":
      return { ...state, Requests: action.payload };
    default:
      return state;
  }
}
