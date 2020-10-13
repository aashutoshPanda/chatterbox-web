const axios = require("axios");

export const getProfileFetch = () => {
  if (localStorage.token) {
    return (dispatch) => {
      return axios
        .get("https://chatterbox-web.herokuapp.com/api/profile/current_user_from_token", {
          headers: {
            Authorization: "Token " + localStorage.token,
          },
        })
        .then((resp) => {
          // console.log("reqqqvbvb",resp.data);
          dispatch(getInfo(resp.data));
        })
        .catch((err) => {
          console.log("error message", err);
        });
    };
  }
};

const getInfo = (user) => ({
  type: "LOGIN_USER",
  payload: user,
});
