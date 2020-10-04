import { history } from "../../rootHome";
const axios = require("axios");
export const UploadUserBio = (UserBio) => {
  return (dispatch) => {
    console.log("userbio colsole",UserBio)
    return axios({
      method: "post",
      url: "http://localhost:8000/profile/addbio/",
      headers: {
        Authorization: "Token " + localStorage.token,
      },
      data: {
        bio: UserBio,
      },
    })
      .then(async (resp) => {
        console.log(resp.data)
        await dispatch(loginUser(resp.data));
        history.push("/profile");
      })
      .catch(async (err) => {
        console.log("error message bioprob", err);
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
