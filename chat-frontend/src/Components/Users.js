import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriends } from "../Redux";

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

  createTask = (item) => {
    let isFriend = false;
    return (
      <div key={item.id} className="column ">
        <div className="box">
          <article className="media">
            <div className="media-content ">
              <p>{`${item.first_name} ${item.last_name}`}</p>
            </div>
          </article>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <div className="column ">
          <h2 className="title is-5">Select A Friend To Chat With</h2>
          <div>
            <input className="input" type="text" onChange={this.handleChange} />
            <br></br>
            <br></br>
            <br></br>
            {/* {console.log(this.state.list)} */}
            {this.state.list.map(this.createTask)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  Friends: state.Friends.Friends
});

const mapDispatchToProps = (dispatch) => ({
  getFriends: () => dispatch(getFriends())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
