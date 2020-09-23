import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";
import Search from './search'

class UserList extends Component {

  componentDidMount() {
    this.props.FetchAllUsers();
  }

  render() {
    return (
      <div>
        <h2>userlist</h2>
        {/* <div  id="searchWrapper" onChange={this.handleChange}>
          <input 
            type="text"
            name="searchBar"
            id="searchBar"
            placeholder="search for a user"
          />
        </div>
        {displayList} */}
        <Search allItems={this.props.allUsers}/>
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
