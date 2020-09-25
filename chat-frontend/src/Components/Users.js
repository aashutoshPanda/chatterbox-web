import React, { Component } from "react";
import { connect } from "react-redux";
import { FetchAllUsers } from "../Redux";

class UserList extends Component {

    constructor(props) {
        super(props);
        
        this.state={
            list:this.props.allUsers
        }
      }

  componentDidMount() {
    this.props.FetchAllUsers();
  }

  handleChange = (e) =>{
    const searchString = e.target.value.toLowerCase();
    const filteredItems = this.props.allUsers.filter(item => {
      // console.log(user)
      return (
        item.first_name.toLowerCase().includes(searchString) ||
        item.last_name.toLowerCase().includes(searchString) 
      );
    });
    // console.log(filteredItems)
    this.setState({list:filteredItems})
    
  }

  createTask = (item) => {
    let isFriend=false
    return (
      <div key={item.id} className="column ">
        <div className="box">
          <article className="media">
            <div className="media-content ">
                <p>{`${item.first_name} ${item.last_name}`}</p>
            </div>
          </article>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        
          <div className="column ">
            <h2 className="title is-2">Find Users</h2>
            <div>
                <input className="input" type="text" onChange={this.handleChange}/>
                <br></br><br></br><br></br>
                {/* {console.log(this.state.list)} */}
                {this.state.list.map(this.createTask)}
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.allUsers.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  FetchAllUsers: () => dispatch(FetchAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
