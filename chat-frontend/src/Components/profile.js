import React, { Component } from "react";
import { connect } from "react-redux";


class profile extends Component {
  editbio = () => {
    this.props.history.push("/updatebio");
  };

  editPic = () => {
    this.props.history.push("/uploadImage")
  }
  render() {
    const curUser = this.props.currentUser;
    console.log("current user", curUser);
    return (
      <div className="container">
        <br></br>
        <div className="columns">
          <div className="column is-10 is-offset-1 ">
            <div className="columns featured-post is-multiline">
              <div className="column is-12 post">
                <article className="columns featured">
                  <div className="column is-5 post-img ">
                    <div>
                      <figure className="image image is-1by1">
                        <img
                          className="is-rounded"
                          src={this.props.currentUser.profile_image_url}
                          alt="profile pic"
                        ></img>
                      </figure>

                      <button className="button is-primary is-small" onClick={this.editPic}>
                        upload/change profile picture
                      </button>
                    </div>
                  </div>

                  <div className="column is-7 featured-content va align-text-center">
                    <div>
                      <h1 className="title is-1">
                        {curUser.first_name} {curUser.last_name}
                      </h1>
                      <h1 className="subtitle is-4">{curUser.username}</h1>
                      <div>
                        <p className="post-except">{curUser.bio} </p>
                        <br></br>
                        <button
                          className="button is-primary is-small"
                          onClick={this.editbio}
                        >
                          edit bio
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

export default connect(mapStateToProps, null)(profile);
