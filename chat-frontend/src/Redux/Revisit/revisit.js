export const getProfileFetch = () => {
    return dispatch => {
      const token = localStorage.token;
      if (token) {
        return fetch("http://localhost:3000/api/v1/profile", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(resp => resp.json())
          .then(data => {
              dispatch(loginUser(data))
          })
      }
    }
  }

  const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})