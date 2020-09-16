export const userPostFetch = (user) => {
  return (dispatch) => {
    // console.log("req object", user);
    return fetch("http://localhost:8000/profile/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.auth_token);
        dispatch(loginUser(data));
      });
  };
};

const loginUser = (userObj) => ({
  type: "LOGIN_USER",
  payload: userObj,
});
