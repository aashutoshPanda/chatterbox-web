import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getSentReq} from '../Redux'

class RequestSent extends Component {

  getUsers = () => this.props.getSentReq()

  createTask=(item)=>{
  return <div><p>{item["receiver"].first_name} {item["receiver"].last_name}</p> </div>
  }

  render() {
    this.getUsers()
    console.log("agagagahha")
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
    getSentReq: () => dispatch(getSentReq())
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestSent);
