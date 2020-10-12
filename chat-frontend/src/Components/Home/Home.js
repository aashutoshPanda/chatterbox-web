import React, { Component } from 'react'
import ProfileCard from "./profileCard";
import { withRouter } from "react-router-dom";


export class Home extends Component {

  componentDidMount(){
    if(localStorage.token) this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div >
      <div className="centerall">
        <div className="title">Welcome to XYX-Chat</div>
      </div>
      <div className="centerall">
        <div className="title">Made By:</div>
      </div>
      <div className="columns is-centered">
        <div className="column is-9">
          <div className="columns">
            <div className="column">
              <ProfileCard></ProfileCard>
            </div>
            <div className="column">
              <ProfileCard></ProfileCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(Home)
