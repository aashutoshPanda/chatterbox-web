const initialState = {
    Requests:[]
  }
  
  export default function reducer(state = initialState, action) {
      switch (action.type) {
        case 'SENT_REQUESTS':
          return {...state, Requests: action.payload}
        default:
          return state;
      }
    }