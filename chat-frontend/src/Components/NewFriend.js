import React from "react";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function NewFriend(props) {
  const location = useLocation();

  const handleClick = async (event) => {
    await props.history.push("/userlist");
  };

  return (
    <div>
      {props.currentUser && (
        <Link onClick={handleClick}>
        <strong>New Friend</strong>
        </Link>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // userLogout: userInfo => dispatch(userLogout(userInfo))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(NewFriend)
);