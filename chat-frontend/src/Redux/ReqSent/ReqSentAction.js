const axios = require('axios')

export const getSentReq = () => {
    return dispatch => {
      return axios.get("http://localhost:8000/profile/request/", {
        headers: {
          'Authorization': 'Token '+localStorage.token
        }
      })
      .then((resp) => {
        console.log("reqqq",resp.data["received"]);
        
        dispatch(getSentRequest(resp.data["received"]));
      })
      .catch(err => {
        console.log("ye wla err aa gya",err)
      })
    }
  }

  const getSentRequest = req => ({
    type: 'RECEIVED_REQUESTS',
    payload: req
})