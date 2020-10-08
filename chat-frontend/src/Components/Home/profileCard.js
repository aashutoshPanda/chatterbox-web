import React, { Component } from "react";
import "./style.scss";

export class profileCard extends Component {
  render() {
    return (
      <div class="section">
        <div class="columns">
          <div class="column">
            <div class="card">
              <div class="header">
                <div class="avatar">
                  <img
                    src="https://randomuser.me/api/portraits/women/67.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div class="card-body">
                <div class="user-meta has-text-centered">
                  <h3 class="username">Helen Miller</h3>
                  <h5 class="position">Accountant</h5>
                </div>
                <div class="user-bio has-text-centered">
                  <p>
                    Helen Miller is an accountant at the Acme Inc comany. She
                    works very hard.
                  </p>
                </div>
                <div class="action has-text-centered">
                  <a href="#" class="give-padding fa fa-instagram"></a>
                  <a href="#" class="give-padding fa fa-facebook"></a>
                  <a href="#" class="give-padding fa fa-twitter"></a>
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
