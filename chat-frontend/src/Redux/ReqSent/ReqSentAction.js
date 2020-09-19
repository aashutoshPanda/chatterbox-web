const axios = require('axios')

export const getSentReq = () => {
    return dispatch => {
      return axios.get("http://localhost:8000/profile/request/", {
        headers: {
          'Authorization': 'Token '+localStorage.token
        }
      })
      .then((resp) => {
        console.log("reqqq",resp.data["sent"]);
        
        dispatch(getSentRequest(resp.data["sent"]));
      })
      .catch(err => {
        console.log("ye wla err aa gya",err)
      })
    }
  }

  const getSentRequest = req => ({
    type: 'SENT_REQUESTS',
    payload: req
})