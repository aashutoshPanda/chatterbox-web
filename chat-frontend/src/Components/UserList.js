import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FetchAllUsers} from '../Redux'

class UserList extends Component {

  getUsers = () => this.props.FetchAllUsers()

  handleClick=(item)=>{
    // this.props.sendUser(item);
  }

  createTask=(item)=>{
    return <li><button key={this.props.allUsers.username} onClick={()=>this.handleClick(item)}>{item.first_name} {item.last_name}</button></li>
  }

  render() {
    this.getUsers(this.props.allUsers)
    // console.log("agagagahha",this.props.allUsers)
    const All=this.props.allUsers
    const displayList=All.map(this.createTask)
    return (
        <div>
            <h2>userlist</h2>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
