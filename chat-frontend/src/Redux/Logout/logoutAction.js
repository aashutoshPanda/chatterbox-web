
export const userLogout = () => {
  return dispatch => {
    return dispatch(logoutUser())
  }
}

 const logoutUser = () => ({
    type: 'LOGOUT_USER'
  })