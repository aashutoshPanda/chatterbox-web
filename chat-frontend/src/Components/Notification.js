import React from "react";
import { connect } from "react-redux";
import { withRouter, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Notification(props) {
  const location = useLocation();
  const handleClick = async (event) => {
    console.log(location);
    await props.history.push("/bothreq");
  };

  return (
    <div>
      {props.currentUser && (
        <Link
          className="has-text-link-dark fa fa-bell"
          onClick={handleClick}
        ></Link>
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
  connect(mapStateToProps, mapDispatchToProps)(Notification)
);