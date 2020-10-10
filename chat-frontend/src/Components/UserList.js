import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";
import { history } from "../rootHome";
import { setOtherProfile } from "../Redux";
import { getReq } from "../Redux";

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

  acceptReq = async (item) => {
    const accepturl = `http://localhost:8000/profile/request/accept/${item["id"]}/`;
    console.log("useraccept",item["id"]);
    await axios({
      method: "post",
      url: accepturl,
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    })
    .then(()=> {console.log("successfully accepted")})
    .catch((err) => {
      console.log(err)
    })
    console.log("accept accept");
    await this.props.getReq();
    await this.props.FetchAllUsers();
  };

  rejectReq = async (item) => {
    const rejecturl = `http://localhost:8000/profile/request/${item["id"]}/`;
    await axios({
      method: "delete",
      url: rejecturl,
      headers: {
        Authorization: "Token " + localStorage.token,
      },
    });
    await this.props.getReq();
    await this.props.FetchAllUsers();
  };

  viewProfile = (item) => {
    // console.log("OtherUser from userlist", item, "end//");
    this.props.setOtherProfile(item);
    history.push("/profileOther");
  };

  sendReq = async (item) => {
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
    const itemData = item.data;
    const itemRelationship = item.relationship_data;
    const status = itemRelationship.status;

    if (status === null) {
      return (
        <div key={itemData.id} className="panel-block has-background-white">
          <p>{`${itemData.first_name} ${itemData.last_name}`}</p>
          <button
            className="button is-info "
            onClick={() => this.sendReq(itemData)}
          >
            <i className="fa fa-user-plus" aria-hidden="true"></i>
          </button>

          <button
            className="button is-info "
            onClick={() => this.viewProfile(itemData)}
          >
            View Profile
          </button>
        </div>
      );
    } else if (status === "send") {
        if (itemRelationship.sender.id === itemData.id) {
          return (
            <div key={itemData.id} className="panel-block has-background-white">
              <p>{`${itemData.first_name} ${itemData.last_name}`}</p>
              <button
                  className="button is-success"
                  onClick={() => this.acceptReq(itemData)}
                >
                  Accept
                </button>{" "}
                <button
                  className="button is-danger"
                  onClick={() => this.rejectReq(itemData)}
                >
                  Reject
                </button>
              <button
                className="button is-info "
                onClick={() => this.viewProfile(itemData)}
              >
                View Profile
              </button>
            </div>
          );
        } else {
          return (
            <div key={itemData.id} className="panel-block has-background-white">
              <p>{`${itemData.first_name} ${itemData.last_name}`}</p>
              <button className="button is-info " onClick={()=>this.rejectReq(itemData)}>Cancel Request</button>
              
              <button
                className="button is-info "
                onClick={() => this.viewProfile(itemData)}
              >
                View Profile
              </button>
              <div className="tag is-info">Request Sent</div>
            </div>
          );
      }
    } else if (status === "accepted") {
      return (
        <div key={itemData.id} className="panel-block has-background-white">
          <p>{`${itemData.first_name} ${itemData.last_name}`}</p>
          <button className="button is-info " onClick={()=>this.rejectReq(itemData)}>unfriend</button>
          <button
            className="button is-info "
            onClick={() => this.viewProfile(itemData)}
          >
            View Profile
          </button>
        </div>
      );
    }
  };

  handleChange = (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredItems = this.props.allUsers.filter((item) => {
      console.log(item)
      return (
        item.data.first_name.toLowerCase().includes(searchString) ||
        item.data.last_name.toLowerCase().includes(searchString)
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
  OtherProfile: state.OtherProfile.OtherProfile,
});

const mapDispatchToProps = (dispatch) => ({
  FetchAllUsers: () => dispatch(FetchAllUsers()),
  setOtherProfile: (OtherProfile) => dispatch(setOtherProfile(OtherProfile)),
  getReq: () => dispatch(getReq()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
