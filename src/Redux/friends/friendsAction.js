const axios = require("axios");

export const getFriends = () => {
  return (dispatch) => {
    return axios
      .get("https://chatterbox-web.herokuapp.com/api/profile/friends/", {
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      })
      .then((resp) => {
        // console.log("reqqq",resp.data);
        dispatch(getFriendsAction(resp.data));
      })
      .catch((err) => {
        console.log("error message", err);
      });
  };
};

const getFriendsAction = (req) => ({
  type: "FRIENDS",
  payload: req,
});
