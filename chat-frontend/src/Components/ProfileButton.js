import React from "react";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";

function ProfileButton(props) {
  const location = useLocation();
  const handleClick = async (event) => {
    console.log(location);
    await props.history.push("/profile");
  };

  return (
    <div>
      {props.currentUser && (
        <button
          className={`button is-primary ${
            location.pathname === "/profile" ? "is-active" : ""
          }`}
          onClick={handleClick}
        >
          Profile
        </button>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  // : () => dispatch(())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileButton)
);
