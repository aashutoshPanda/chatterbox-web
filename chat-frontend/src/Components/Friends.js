import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFriends} from '../Redux'

class RequestReceived extends Component {

  componentDidMount(){
    this.props.getFriends()
  }
   
  createTask=(item)=>{
      return <div key={item.id}><p>{item.first_name} {item.last_name}</p> </div>
  }

  render() {
    let Friends=this.props.Friends
    // console.log("this is all",All)
    let displayList;
    if(this.props.Friends.length!==0){
      displayList=Friends.map(this.createTask)
    }
    
    return (
        <div>
            <h2>Friends</h2>
            {displayList}
        </div>
    )
  }
}

const mapStateToProps = state => ({
  Friends : state.Friends.Friends
})

const mapDispatchToProps = dispatch => ({
  getFriends: () => dispatch(getFriends())
})

export default connect(mapStateToProps, mapDispatchToProps)(RequestReceived);
