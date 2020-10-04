import { history } from "../../rootHome";
const axios = require("axios");
export const UploadPicture = (img) => {
  return (dispatch) => {
    console.log("img in UploadPicAction", img[0]);
    const data = new FormData();
    data.append("picture", img[0]);
    return axios({
      method: "post",
      url: "http://localhost:8000/profile/uploadprofileimage/",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Token " + localStorage.token,
      },
      data
      
    })
      .then(async (resp) => {
        console.log(resp.data);
        await dispatch(loginUser(resp.data));
        history.push("/profile");
      })
      .catch(async (err) => {
        console.log("error message imageprob", err);
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
