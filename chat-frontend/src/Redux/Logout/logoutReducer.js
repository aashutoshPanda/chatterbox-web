const initialState = {
    currentUser: {}
  }
  
  export default function reducer(state = initialState, action) {
      switch (action.type) {
        case 'LOGOUT_USER':
          return {...state, currentUser: {} }
        default:
          return state;
      }
    }