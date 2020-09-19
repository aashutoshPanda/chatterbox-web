import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReceivedReq} from '../Redux'

class RequestSent extends Component {

  getUsers = () => this.props.getReceivedReq()

  createTask=(item)=>{
  return <div><p>{item["sender"].first_name} {item["sender"].last_name}</p> </div>
  }

  render() {
    this.getUsers()
    // console.log("agagagahha")
    const All=this.props.sentReq 
    const displayList=All.map(this.createTask)
    return (
        <div>
            <h2>RequestSent</h2>
            {displayList}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  sentReq : state.sentReq.Requests
})

const mapDispatchToProps = dispatch => ({
    getReceivedReq: () => dispatch(getReceivedReq())
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestSent);
