import { history } from "../../rootHome";
const axios = require("axios");
export const userLoginFetch = (user) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:8000/profile/auth/login", user)
      .then(async (resp) => {
        // console.log(resp.data);
        localStorage.setItem("token", resp.data.auth_token);
        await dispatch(errormessage([]));
        await dispatch(loginUser(resp.data));
        history.push("/dashboard");
      })
      .then(() => {
        axios
          .get("http://localhost:8000/profile/current_user_from_token", {
            headers: {
              Authorization: "Token " + localStorage.token,
            },
          })
          .then((resp) => {
            // console.log("reqqqvbvb",resp.data);
            dispatch(loginUser(resp.data));
          })
          .catch((err) => {
            console.log("error message", err);
          });
      })
      .catch(async (err) => {
        console.log("error message login", err.response.data);
        await dispatch(errormessage(err.response.data));
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});

const errormessage = (err) => ({
  type: "ERROR",
  payload: err,
});
export const errorReset = () => ({
  type: "RESET",
});
