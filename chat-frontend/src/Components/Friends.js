import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReq} from '../Redux'

class RequestReceived extends Component {

  componentDidMount(){
    this.props.getReq()
  }
   
  createTask1=(item)=>{
    if(item["status"]==="accepted")
      return <div><p>{item["receiver"].first_name} {item["receiver"].last_name}</p> </div>
  }
  createTask2=(item)=>{
    if(item["status"]==="accepted")
      return <div><p>{item["sender"].first_name} {item["sender"].last_name}</p> </div>
  }

  render() {
    let sentFriends=this.props.Req["sent"]
    let receivedFriends=this.props.Req["received"]
    // console.log("this is all",All)
    let displayList1,displayList2
    if(this.props.Req.length!==0){
      displayList1=sentFriends.map(this.createTask1)
    }
    if(this.props.Req.length!==0){
      displayList2=receivedFriends.map(this.createTask2)
    }
    
    return (
        <div>
            <h2>Friends</h2>
            {displayList1}
            {displayList2}
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
