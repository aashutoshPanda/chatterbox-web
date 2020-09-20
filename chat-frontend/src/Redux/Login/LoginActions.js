const axios = require('axios')

export const userLoginFetch = user => {
    return dispatch => {
      return axios.post("http://localhost:8000/profile/auth/login",user)
      .then((resp) => {
        // console.log(resp.data);
        localStorage.setItem("token", resp.data.auth_token);
        dispatch(loginUser(resp.data));
      })
      .catch(err => {
        console.log("error message",err)
      })
    }
  }

  const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})