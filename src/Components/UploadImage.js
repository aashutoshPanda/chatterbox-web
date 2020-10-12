import React, { Component } from "react";
import ImageUploader from "react-images-upload";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { UploadPicture } from "../Redux";
import {ClockLoader} from "react-spinners"

export class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = { picture:null };
  }

  onDrop = async (picture) => {
    await this.setState({
      picture: picture,
    });
    this.props.UploadPicture(picture);
  };

  render() {
    console.log("picLoading",this.props.picLoading)
    if(this.props.picLoading === true) return(
      <div className="centerall">
        <ClockLoader size={150} color="purple" />
      </div>
    );
    else return (
      <div>
        <ImageUploader
          withIcon={true}
          buttonText="Choose image"
          onChange={this.onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  picLoading: state.auth.picLoading
});

const mapDispatchToProps = (dispatch) => ({
  UploadPicture: (image) => dispatch(UploadPicture(image)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadImage)
);
