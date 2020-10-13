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
                    src="https://res.cloudinary.com/dmquemhgb/image/upload/v1602595626/fxwnyuwhjvg3vw57x1sh.png"
                    alt="ashutosh-panda-picture"
                  />
                </div>
              </div>
              <div className="card-body">
                <div className="user-meta has-text-centered">
                  <h3 className="username">Ashutosh Panda</h3>
                  <h5 className="position">IT Undergraduate NIT Raipur</h5>
                </div>
                <div className="user-bio has-text-centered">
                  <p>
                    Web/App Developer | Competitive Programmer
                  </p>
                </div>
                <div className="action has-text-centered">
                  <a target = "_blank" href="https://www.instagram.com/ashutoshpanda_/" className="give-padding fa fa-instagram"></a>
                  <a target = "_blank" href="https://www.facebook.com/AashutoshPandaa" className="give-padding fa fa-facebook"></a>
                  <a target = "_blank" href="https://www.linkedin.com/in/ashutosh-panda/" className="give-padding fa fa-linkedin"></a>
                  <a target = "_blank" href="https://github.com/aashutoshpanda" className="give-padding fa fa-github"></a>
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
