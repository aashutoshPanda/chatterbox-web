import React, {Component} from 'react';
const axios = require('axios')

class search extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            list:this.props.allItems
        }
      }

      handleClick = (item) => {
        axios({
          method: 'post',
          url: 'http://localhost:8000/profile/request/',
          headers : {
            "Authorization":"Token "+localStorage.token
          },
          data: {
            "receiver": item.username,
          }
        });
      };

      createTask = (item) => {
        let isFriend=false
        return (
            <div key={item.id}>
              <p>
                {item.first_name} {item.last_name}
              </p>{" "}
    
              {!isFriend && <button
                onClick={() => this.handleClick(item)}
              >
                Add Friend
              </button>}
              {isFriend && <button
                // onClick={() => this.handleClick(item)}
              >
                Friends
              </button>}
    
            </div>
        );
      };

      handleChange = (e) =>{
        const searchString = e.target.value.toLowerCase();
        const filteredItems = this.props.allItems.filter(item => {
          // console.log(user)
          return (
            item.first_name.toLowerCase().includes(searchString) ||
            item.last_name.toLowerCase().includes(searchString) 
          );
        });
        console.log(filteredItems)
        this.setState({list:filteredItems})
        
      }
    
  render() {
    return(
    <div>
        <input type="text" onChange={this.handleChange}/>
        {this.state.list.map(this.createTask)}
    </div>
        
    )
  }
}


export default search;
