import React, { Component } from 'react';
import axios from "axios"//promise based HTTP client for browser and node.js...aijax
import './App.css';

class App extends Component {

    state= {
      title:"",
      body:""
    }

   

    handleInputChange = event =>{
      //const name = event.target.name; 
      //const value = event.target.value;
      // ^equivalent^
      const {name, value} = event.target;
      console.log(name)
      this.setState({[name]:value});
    }

    postBlog = event =>{
      event.preventDefault();
      const {title, body} = this.state;
      axios.post("/api/blog",{title, body}).then(res=> console.log(res));
    }

  saveBlog = event =>{
    event.preventDefault();
    console.log(this.state.title)
    console.log(this.state.body)
  }

  render() {
    return (
      <div>
        <form> 
          <input name = "title" onChange= {this.handleInputChange} value= {this.state.title}/> 
          
          <textArea name = "body" onChange= {this.handleInputChange} value = {this.state.body}></textArea> 
          <button onClick={this.postBlog}>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
