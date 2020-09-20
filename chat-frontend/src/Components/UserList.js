import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";
const axios = require('axios')

class UserList extends Component {
  handleClick = (item) => {
    axios({
      method: 'post',
      url: 'http://localhost:8000/profile/request/',
      headers : {
        "Authorization":"Token "+localStorage.token
      },
      data: {
        "receiver": item.username,
      }
    });
  };

  componentDidMount() {
    this.props.FetchAllUsers();
  }
  createTask = (item) => {
    let isFriend=false
    return (
      <div key={item.id}>
        <p>
          {item.first_name} {item.last_name}
        </p>{" "}

        {!isFriend && <button
          onClick={() => this.handleClick(item)}
        >
          Add Friend
        </button>}
        {isFriend && <button
          // onClick={() => this.handleClick(item)}
        >
          Friends
        </button>}

      </div>
    );
  };

  render() {

    const All = this.props.allUsers;
    const displayList = All.map(this.createTask);
    return (
      <div>
        <h2>userlist</h2>
        {displayList}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.allUsers.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  FetchAllUsers: () => dispatch(FetchAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
