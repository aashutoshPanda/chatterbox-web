const axios = require('axios')

export const userPostFetch = (user) => {
  return (dispatch) => {
    axios.post("http://localhost:8000/profile/auth/register",user)
      .then((resp) => {
        console.log(resp.data);
        localStorage.setItem("token", resp.data.auth_token);
        dispatch(loginUser(resp.data));
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
