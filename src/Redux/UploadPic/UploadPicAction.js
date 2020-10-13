import { history } from "../../rootHome";
const axios = require("axios");
export const UploadPicture = (img) => {
  return (dispatch) => {
    console.log("img in UploadPicAction", img[0]);
    const data = new FormData();
    data.append("picture", img[0]);
    dispatch(startLoading());
    return axios({
      method: "post",
      url: "https://chatterbox-web.herokuapp.com/api/profile/uploadprofileimage/",
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Token " + localStorage.token,
      },
      data
      
    })
      .then(async (resp) => {
        console.log(resp.data);
        await dispatch(loginUser(resp.data));
        dispatch(endLoading());
        history.push("/profile");
      })
      .catch(async (err) => {
        console.log("error message imageprob", err);
      });
  };
};

const startLoading = () => ({
  type: "LOADING_TRUE"
})

const endLoading=()=>({
  type: "LOADING_FALSE"
})

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
