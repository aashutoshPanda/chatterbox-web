const initialState = {
  Friends: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FRIENDS":
      return { ...state, Friends: action.payload };
    default:
      return state;
  }
}
