import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";

const axios = require("axios");

class UserList extends Component {
  componentDidMount() {
    this.props.FetchAllUsers();
  }

  constructor(props) {
    super(props);

    this.state = {
      list: this.props.allUsers,
    };
  }

  handleClick = async (item) => {
    await axios({
      method: "post",
      url: "http://localhost:8000/profile/request/",
      headers: {
        Authorization: "Token " + localStorage.token,
      },
      data: {
        receiver: item.username,
      },
    });
    await this.props.FetchAllUsers();
    await this.setState({ list: this.props.allUsers });
  };

  createTask = (item) => {
    return (
      <div key={item.id} className="panel-block has-background-white">
        <p>{`${item.first_name} ${item.last_name}`}</p>
        <span
          className="button is-info "
          onClick={() => this.handleClick(item)}
        >
          <i className="fa fa-user-plus" aria-hidden="true"></i>
        </span>
      </div>
    );
  };

  handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = this.props.allUsers.filter((item) => {
      // console.log(user)
      return (
        item.first_name.toLowerCase().includes(searchString) ||
        item.last_name.toLowerCase().includes(searchString)
      );
    });
    // console.log(filteredItems)
    this.setState({ list: filteredItems });
  };
  render() {
    return (
      <div classNameName="container">
        <br></br>

        <div className="columns is-centered">
          <nav className="panel column is-7 is-primary">
            <p className="panel-heading">Find New Friends</p>
            <div className="panel-block has-background-info-light">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="text"
                  placeholder="Search"
                  onChange={this.handleChange}
                />
                <span className="icon is-left">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </p>
            </div>

            {this.state.list.length !== 0 &&
              this.state.list.map(this.createTask)}
            {this.state.list.length === 0 &&
              this.props.allUsers.map(this.createTask)}
          </nav>
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