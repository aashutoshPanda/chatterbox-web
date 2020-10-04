import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriends } from "../Redux";
import { setOtherUser } from "../Redux";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: this.props.Friends,
    };
  }

  componentDidMount() {
    this.props.getFriends();
  }

  handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredItems = this.props.Friends.filter((item) => {
      // console.log(user)
      return (
        item.first_name.toLowerCase().includes(searchString) ||
        item.last_name.toLowerCase().includes(searchString)
      );
    });
    // console.log(filteredItems)
    this.setState({ list: filteredItems });
  };

  handleOtherUserClick = (item) => {
    this.props.setOtherUser(item);
    console.log(this.props.otherUser);
  };

  createTask = (item) => {
    return (
        <p
          className={`panel-block ${
            this.props.otherUser && item.id === this.props.otherUser.id
              ? "has-background-grey-lighter"
              : ""
          }`}
          onClick={() => this.handleOtherUserClick(item)}
          key={item.id}
        >
            {`${item.first_name} ${item.last_name}`}
        </p>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="column ">
          <nav class="panel is-primary">
            <p className="panel-heading">Select A Friend To Chat With</p>
            <div>
              <div class="panel-block">
                <p class="control has-icons-left">
                  <input
                    class="input"
                    type="text"
                    placeholder="Search"
                    onChange={this.handleChange}
                  />
                  <span class="icon is-left">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div>
              {/* {console.log(this.state.list)} */}
              {this.state.list.map(this.createTask)}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Friends: state.Friends.Friends,
  otherUser: state.OtherUser.otherUser,
});

const mapDispatchToProps = (dispatch) => ({
  getFriends: () => dispatch(getFriends()),
  setOtherUser: (otherUser) => dispatch(setOtherUser(otherUser)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
