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
    // console.log(this.props.otherUser);
  };

  createTask = (item) => {
    // console.log(item)
    return (
      <p
        className={`panel-block has-background-white ${
          this.props.otherUser && item.id === this.props.otherUser.id
            ? "has-background-grey-lighter"
            : ""
        }`}
        onClick={() => this.handleOtherUserClick(item)}
        key={item.id}
      >
        <figure className="image is-48x48">
          <img src={item.profile_image_url} alt="dp" />
        </figure>
        {`${item.first_name} ${item.last_name}`}
      </p>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="column ">
          <nav className="panel is-primary">
            <p className="panel-heading">Select A Friend To Chat With</p>
            <div>
              <div className="panel-block has-background-info-light">
                <p className="control has-icons-left">
                  <input
                    className="input "
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
                this.props.Friends.map(this.createTask)}
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
