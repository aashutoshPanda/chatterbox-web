import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReq} from '../Redux'

class RequestReceived extends Component {

  componentDidMount(){
    this.props.getReq()
  }
   
  createTask=(item)=>{
    if(item["status"]==="sent")
      return <div><p>{item["receiver"].first_name} {item["receiver"].last_name}</p> </div>
  }

  render() {
    const All=this.props.Req["sent"]
    console.log("this is all",All)
    let displayList
    if(this.props.Req.length!==0){
      displayList=All.map(this.createTask)
    }
    
    return (
        <div>
            <h2>Request Sent (Pending)</h2>
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
