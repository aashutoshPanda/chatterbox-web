const initialState = {
    currentUser: null
  }
  
  export default function reducer(state = initialState, action) {
      switch (action.type) {
        case 'LOGOUT_USER':
          return {...state, currentUser: null }
        default:
          return state;
      }
    }