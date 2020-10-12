import React, { Component } from "react";
import { connect } from "react-redux";
import { getReq } from "../Redux";

class RequestReceived extends Component {
  componentDidMount() {
    this.props.getReq();
  }

  createTask = (item) => {
    if (item["status"] === "send")
      return (
        <div key={item.id} className="column is-10">
          <div className="box">
            <article className="media">
              <div className="media-content ">
                <p>{`${item["receiver"].first_name} ${item["receiver"].last_name}`}</p>
              </div>
              <div className="media-right">
                {<span className="tag is-info is-light">request sent</span>}
              </div>
            </article>
          </div>
        </div>
      );
    //  <div key={item.id}><p>{item["receiver"].first_name} {item["receiver"].last_name}</p> </div>
  };

  render() {
    const All = this.props.Req["send"];
    // console.log("this is all",All)
    let displayList;
    if (this.props.Req.length !== 0) {
      displayList = All.map(this.createTask);
    }

    return <div>{displayList}</div>;
  }
}

const mapStateToProps = (state) => ({
  Req: state.Req.Requests,
});

const mapDispatchToProps = (dispatch) => ({
  getReq: () => dispatch(getReq()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestReceived);
