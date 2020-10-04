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
      <div key={item.id} className="column is-10">
        <div className="box">
          <article className="media">
            <div className="media-content ">
              <p>{`${item.first_name} ${item.last_name}`}</p>
            </div>
            <div className="media-right">
              <button
                className="button is-info"
                onClick={() => this.handleClick(item)}
              >
                Add Friend
              </button>
            </div>
          </article>
        </div>
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
      <section className="hero has-background-white-ter is-fullheight">
        <div className="">
          <div className="container">
            <div className="columns is-centered">
              <div className="column ">
                <div className="column is-8">
                  <h2 className="title is-2">Find New Friends</h2>
                  <div>
                    <div className="">
                      <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Search" />
                        <span className="icon is-left">
                          <i className="fa fa-search" aria-hidden="true"></i>
                        </span>
                      </p>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    {this.state.list.map(this.createTask)}
                  </div>
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
