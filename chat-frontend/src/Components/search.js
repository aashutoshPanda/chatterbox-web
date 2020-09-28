import React, { Component } from "react";
const axios = require("axios");

class search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.allItems,
    };
  }

  handleClick = (item) => {
    axios({
      method: "post",
      url: "http://localhost:8000/profile/request/",
      headers: {
        Authorization: "Token " + localStorage.token,
      },
      data: {
        receiver: item.username,
      },
    });
  };

  createTask = (item) => {
    let isFriend = false;
    return (
      <div key={item.id} className="column is-10">
        <div className="box">
          <article className="media">
            <div className="media-content ">
              <p>{`${item.first_name} ${item.last_name}`}</p>
            </div>
            <div className="media-right">
              {!isFriend && (
                <button
                  className="button is-info"
                  onClick={() => this.handleClick(item)}
                >
                  Add Friend
                </button>
              )}
              {isFriend && (
                <button
                // onClick={() => this.handleClick(item)}
                >
                  Friends
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    );
  };

  handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = this.props.allItems.filter((item) => {
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
      <div>
        <input className="input" type="text" onChange={this.handleChange} />
        <br></br>
        <br></br>
        <br></br>
        {this.state.list.map(this.createTask)}
      </div>
    );
  }
}

export default search;
