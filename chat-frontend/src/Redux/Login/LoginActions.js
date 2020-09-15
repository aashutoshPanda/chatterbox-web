export const userLoginFetch = user => {
    return dispatch => {
      return fetch("http://localhost:8000/profile/auth/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(user)
      })
        .then(resp => resp.json())
        .then(data => {
            console.log("login data",data)
            localStorage.setItem("token", data.auth_token)
            dispatch(loginUser(data))
        })
    }
  }

  const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})