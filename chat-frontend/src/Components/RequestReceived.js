import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReq} from '../Redux'
const axios = require('axios')

class RequestReceived extends Component {

  componentDidMount(){
    this.props.getReq()
  }

  acceptReq=async (item)=>{
    const accepturl=`http://localhost:8000/profile/request/accept/${item["id"]}/`
    await axios({
      method: 'post',
      url: accepturl,
      headers : {
        "Authorization":"Token "+localStorage.token
      },
    });
    await this.props.getReq()
  }

  rejectReq=async (item)=>{
    
    const rejecturl=`http://localhost:8000/profile/request/${item["id"]}/`
    await axios({
      method: 'post',
      url: rejecturl,
      headers : {
        "Authorization":"Token "+localStorage.token
      },
    });
    await this.props.getReq()
  }
   
  createTask=(item)=>{
    if(item["status"]==="sent")
      return (
        <div key={item.id}>
          <p>{item["sender"].first_name} {item["sender"].last_name}</p>{" "} 
          <button onClick={()=>this.acceptReq(item)}>Accept</button> 
          <button onClick={()=>this.rejectReq(item)}>Reject</button>
        </div>
      )
  }

  render() {
    const All=this.props.Req["received"]
    // console.log("this is all",All)
    let displayList
    if(this.props.Req.length!==0){
      displayList=All.map(this.createTask)
    }
    
    return (
        <div>
            <h2>Request Received (Pending)</h2>
            {displayList}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  Req : state.Req.Requests
})

const mapDispatchToProps = dispatch => ({
  getReq: () => dispatch(getReq())
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestReceived);
