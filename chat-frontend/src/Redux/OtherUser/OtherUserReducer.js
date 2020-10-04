const initialState = {
    otherUser: false,
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case "OTHER_USER":
        return { ...state, otherUser: action.payload };
      default:
        return state;
    }
  }
  