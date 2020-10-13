import { history } from "../../rootHome";
const axios = require("axios");
export const userPostFetch = (user) => {
  return (dispatch) => {
    axios
      .post("https://chatterbox-web.herokuapp.com/api/profile/auth/register", user)
      .then(async (resp) => {
        // console.log(resp.data);
        localStorage.setItem("token", resp.data.auth_token);
        localStorage.setItem("chatToken", resp.data.chat_token);
        await dispatch(errorReset());
        await dispatch(loginUser(resp.data));
        history.push("/dashboard");
      })
      .then(() => {
        axios
          .get("https://chatterbox-web.herokuapp.com/api/profile/current_user_from_token/", {
            headers: {
              Authorization: "Token " + localStorage.token,
            },
          })
          .then((resp) => {
            console.log("response from signup",resp.data);
            
          })
          .catch((err) => {
            console.log("error message", err);
          });
      })
      .catch((err) => {
        console.log("error message signup", err.response.data.username);
        dispatch(errormessage(err.response.data.username));
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
