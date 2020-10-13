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
                    src="https://res.cloudinary.com/dmquemhgb/image/upload/v1602585067/zveicfpujztq0e3rcaha.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="user-meta has-text-centered">
                  <h3 className="username">Swastik Sahoo</h3>
                  <h5 className="position">IT Undergraduate</h5>
                </div>
                <div className="user-bio has-text-centered">
                  <p>
                    Student at NIT Raipur. Competitive Programmer and Web Developer.
                  </p>
                </div>
                <div className="action has-text-centered">
                  <a href="https://www.instagram.com/swastiksahooo/?hl=en" className="give-padding fa fa-instagram"></a>
                  <a href="https://www.facebook.com/swastik.sahoo.359?ref=bookmarks" className="give-padding fa fa-facebook"></a>
                  <a href="https://www.linkedin.com/in/swastik-sahoo/" className="give-padding fa fa-linkedin"></a>
                  <a href="https://github.com/swastiksahoo153" className="give-padding fa fa-github"></a>
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
