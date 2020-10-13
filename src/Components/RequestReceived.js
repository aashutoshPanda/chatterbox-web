import React, { Component } from "react";
import { connect } from "react-redux";
import { getReq } from "../Redux";
import { getFriends } from "../Redux";
const axios = require("axios");

class RequestReceived extends Component {
  componentDidMount() {
    this.props.getReq();
  }

  acceptReq = async (item) => {
    const accepturl = `https://chatterbox-web.herokuapp.com/api/profile/request/accept/${item["id"]}/`;
    console.log(item["id"]);
    await axios({
      method: "post",
      url: accepturl,
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    });
    console.log("accept accept");
    await this.props.getReq();
    await this.props.getFriends();
  };

  rejectReq = async (item) => {
    const rejecturl = `https://chatterbox-web.herokuapp.com/api/profile/request/${item["id"]}/`;
    await axios({
      method: "delete",
      url: rejecturl,
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    });
    await this.props.getReq();
  };

  createTask = (item) => {
    if (item["status"] === "send")
      return (
        <div className="column is-10">
          <div key={item.id} className="box">
            <article className="media">
              <div className="media-content ">
                <p>
                  {item["sender"].first_name} {item["sender"].last_name}
                </p>
              </div>
              <div className="media-right">
                <button
                  className="button is-success"
                  onClick={() => this.acceptReq(item)}
                >
                  Accept
                </button>{" "}
                <button
                  className="button is-danger"
                  onClick={() => this.rejectReq(item)}
                >
                  Reject
                </button>
              </div>
            </article>
          </div>
        </div>
      );
  };

  render() {
    const All = this.props.Req["received"];
    // console.log("this is all",All)
    let displayList;
    if (this.props.Req.length !== 0) {
      displayList = All.map(this.createTask);
    }

    return <div>{displayList}</div>;
  }
}

const mapStateToProps = (state) => ({
  Req: state.Req.Requests,
});

const mapDispatchToProps = (dispatch) => ({
  getReq: () => dispatch(getReq()),
  getFriends: () => dispatch(getFriends()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestReceived);
