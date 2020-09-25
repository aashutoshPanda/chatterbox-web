import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";
import Search from "./search";

class UserList extends Component {
  componentDidMount() {
    this.props.FetchAllUsers();
  }

  render() {
    return (
      <div className="container">
        <div className="block">
          <div className="column is-8">
            <h2 className="title is-2">Find Friends</h2>
            <Search allItems={this.props.allUsers} />
          </div>
        </div>
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
