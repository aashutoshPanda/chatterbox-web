import React, { Component } from "react";
import { connect } from "react-redux";
import { getFriends } from "../Redux";

class RequestReceived extends Component {
  componentDidMount() {
    this.props.getFriends();
  }

  createTask = (item) => {
    return (
      <div key={item.id} className="column is-10">
        <div className="box">
          <article className="media">
            <div className="media-content ">
              <p>
                {item.first_name} {item.last_name}
              </p>
            </div>
            <div className="media-right">
              <span className="tag is-success is-light">accepted</span>
            </div>
          </article>
        </div>
      </div>
    );
  };

  render() {
    let Friends = this.props.Friends;
    // console.log("this is all",All)
    let displayList;
    if (this.props.Friends.length !== 0) {
      displayList = Friends.map(this.createTask);
    }

    return <div className="block">{displayList}</div>;
  }
}

const mapStateToProps = (state) => ({
  Friends: state.Friends.Friends,
});

const mapDispatchToProps = (dispatch) => ({
  getFriends: () => dispatch(getFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestReceived);
