const initialState = {
    allUsers:[]
  }
  
  export default function reducer(state = initialState, action) {
      switch (action.type) {
        case 'GET_ALL_USERS':
          return {...state, allUsers: action.payload}
        default:
          return state;
      }
    }