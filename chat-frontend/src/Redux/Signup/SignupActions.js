const axios = require("axios");

export const userPostFetch = (user) => {
  return (dispatch) => {
    axios
      .post("http://localhost:8000/profile/auth/register", user)
      .then( async (resp) => {
        // console.log(resp.data);
        localStorage.setItem("token", resp.data.auth_token);
        await dispatch(errormessage([]))
        await dispatch(loginUser(resp.data));
      })
      .catch((err) => {
        console.log("error message signup", err.response.data.username);
        dispatch(errormessage(err.response.data.username))
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});

const errormessage = (err) => ({
  type: "ERROR",
  payload: err
});
