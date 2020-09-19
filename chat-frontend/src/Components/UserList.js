import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";

class UserList extends Component {
  handleClick = (item) => {
    // this.props.sendUser(item);
  };
  componentDidMount() {
    this.props.FetchAllUsers();
  }
  createTask = (item) => {
    return (
      <div>
        <p>
          {item.first_name} {item.last_name}
        </p>{" "}
        <button
          key={this.props.allUsers.username}
          onClick={() => this.handleClick(item)}
        >
          Add Friend
        </button>
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
