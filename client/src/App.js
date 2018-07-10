import React, { Component } from 'react';
import axios from "axios"//promise based HTTP client for browser and node.js...aijax
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getGetRequest(){
  axios.get("/api/test").then(res =>{
      console.log("get test")
  })    

  }

  getPostRequest(){
    axios.post("/api/test", {test:true}).then(res =>{
      console.log("post test");
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.getGetRequest}>GET</button>
        <button onClick={this.getPostRequest}>POST</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
