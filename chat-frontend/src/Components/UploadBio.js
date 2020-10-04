import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UploadUserBio } from "../Redux";

export class UploadBio extends Component {
  state = {
    UserBio: this.props.currentUser.bio,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.UploadUserBio(this.state.UserBio);
  };

  render() {
    return (
      <div className="container">
        <br></br>
        <div className="block">
          <form onSubmit={this.handleSubmit}>
            <div action="" className="box">
              <div className="field">
                <label className="label">Update Bio</label>
                <div className="control has-icons-left">
                  <textarea
                    type="text"
                    className="textarea"
                    name="UserBio"
                    placeholder="Write you new bio here"
                    value={this.state.username}
                    onChange={this.handleChange}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <button className="button is-success">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  UploadUserBio: (UserBio) => dispatch(UploadUserBio(UserBio)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadBio)
);
