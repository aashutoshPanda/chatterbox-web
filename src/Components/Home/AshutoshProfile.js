import React, { Component } from "react";
import "./style.scss";

export class profileCard extends Component {
  render() {
    return (
      <div className="section">
        <div className="columns">
          <div className="column">
            <div className="card">
              <div className="header">
                <div className="avatar">
                  <img
                    src="https://randomuser.me/api/portraits/women/67.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="user-meta has-text-centered">
                  <h3 className="username">Helen Miller</h3>
                  <h5 className="position">Accountant</h5>
                </div>
                <div className="user-bio has-text-centered">
                  <p>
                    Helen Miller is an accountant at the Acme Inc comany. She
                    works very hard.
                  </p>
                </div>
                <div className="action has-text-centered">
                  <a href="#" className="give-padding fa fa-instagram"></a>
                  <a href="#" className="give-padding fa fa-facebook"></a>
                  <a href="#" className="give-padding fa fa-linkedin"></a>
                  <a href="#" className="give-padding fa fa-github"></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default profileCard;
