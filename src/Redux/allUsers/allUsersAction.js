const axios = require("axios");

export const FetchAllUsers = () => {
  return (dispatch) => {
    return axios
      .get("https://chatterbox-web.herokuapp.com/api/profile/friends/new/", {
        headers: {
          Authorization: "Token " + localStorage.token,
        },
      })
      .then((resp) => {
        console.log(resp.data);

        dispatch(getAllUsers(resp.data));
      })
      .catch((err) => {
        console.log("error message", err);
      });
  };
};

const getAllUsers = (allUsers) => ({
  type: "GET_ALL_USERS",
  payload: allUsers
});
