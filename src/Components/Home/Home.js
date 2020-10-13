import React, { Component } from "react";
import AshutoshProfile from "./AshutoshProfile";
import SwastikPofile from "./SwastikProfile"
import { withRouter } from "react-router-dom";

export class Home extends Component {
  componentDidMount() {
    if (localStorage.token) this.props.history.push("/dashboard");
  }

  render() {
    return (
      <div>
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">Welcome to Chatter-box!</h1>
              <h2 class="subtitle">A platform to connect with your friends</h2>
            </div>
          </div>
        </section>
        <section class="hero is-light">
          <div class="hero-body">
            <div class="container has-text-centered">
              <figure class="image">
                <img src="https://res.cloudinary.com/dmquemhgb/image/upload/v1602575359/sbk1lpans4x7drzyk4ff.jpg" />
              </figure>
            </div>
          </div>
        </section>
        <section class="hero is-info">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">Meet the Team</h1>
              <div className="columns is-centered">
                <div className="column is-9">
                  <div className="columns">
                    <div className="column">
                      <AshutoshProfile></AshutoshProfile>
                    </div>
                    <div className="column">
                      <SwastikPofile></SwastikPofile>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(Home);
