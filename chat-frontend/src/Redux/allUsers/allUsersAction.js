const axios = require('axios')

export const FetchAllUsers = () => {
    return dispatch => {
      return axios.get("http://localhost:8000/profile/users")
      .then((resp) => {
        // console.log(resp.data);
        
        dispatch(getAllUsers(resp.data));
      })
      .catch(err => {
        console.log("ye wla err aa gya",err)
      })
    }
  }

  const getAllUsers = allUsers => ({
    type: 'GET_ALL_USERS',
    payload: allUsers
})