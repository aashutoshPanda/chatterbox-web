
  export const userLogout = user => {
    return dispatch => {
      dispatch(logoutUser())
    }
  }

  const logoutUser = () => ({
    type: 'LOGOUT_USER'
  })