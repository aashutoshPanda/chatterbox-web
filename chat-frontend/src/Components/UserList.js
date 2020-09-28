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
      <section class="hero has-background-white-ter is-fullheight">
        <div class="">
          <div class="container">
            <div class="columns is-centered">
              <div class="column ">
                <div className="column is-8">
                  <h2 className="title is-2">Find Friends</h2>
                  <Search allItems={this.props.allUsers} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
