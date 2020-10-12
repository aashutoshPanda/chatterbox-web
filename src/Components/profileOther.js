import React, { Component } from "react";
import { connect } from "react-redux";

class profile extends Component {
    constructor(props) {
        super(props)

    }
    
  render() {
    const curUser = this.props.OtherProfile;
    console.log("current user", this.props.OtherProfile);
    return (
      <div className="">
        <br />
        <div className="columns is-centered is-vcentered is-offset-1">
          <div className="card column is-3 is-1by1">
            <div className="card-image ">
              <figure className="image">
                <img
                  className="is-rounded pl-3 pr-3"
                  src={curUser.profile_image_url}
                  alt="profile pic"
                ></img>
              </figure>
            </div>
            <div className="card-content">
              <div className="content">
                <h1 className="title is-1">
                  {curUser.first_name} {curUser.last_name}
                </h1>
                <h1 className="subtitle is-4 has-text-grey">{`@${curUser.username}`}</h1>
                <div>
                  <p className="post-except">{curUser.bio} </p>
                  <br></br>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  OtherProfile: state.OtherProfile.otherProfile
});

export default connect(mapStateToProps, null)(profile);
