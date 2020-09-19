import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FetchAllUsers} from '../Redux'

class Friends extends Component {

  getUsers = () => this.props.FetchAllUsers()

  handleClick=(item)=>{
    // this.props.sendUser(item);
  }

  createTask=(item)=>{
  return <div><p>{item.first_name} {item.last_name}</p> <button key={this.props.allUsers.username} onClick={()=>this.handleClick(item)}>Add Friend</button></div>
  }

  render() {
    this.getUsers(this.props.allUsers)
    // console.log("agagagahha",this.props.allUsers)
    const All=this.props.allUsers
    const displayList=All.map(this.createTask)
    return (
        <div>
            <h2>Friends</h2>
            {displayList}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  allUsers: state.allUsers.allUsers
})

const mapDispatchToProps = dispatch => ({
  FetchAllUsers: () => dispatch(FetchAllUsers())
})

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
