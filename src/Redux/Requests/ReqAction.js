const axios = require("axios");

export const getReq = () => {
  return (dispatch) => {
    return axios
      .get("https://chatterbox-web.herokuapp.com/profile/request/", {
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      })
      .then((resp) => {
        // console.log("reqqq",resp.data);

        dispatch(getRequest(resp.data));
      })
      .catch((err) => {
        console.log("error message", err);
      });
  };
};

const getRequest = (req) => ({
  type: "REQUESTS",
  payload: req,
});
