import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route} from "react-router-dom"

import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';
class App extends Component {

    
  // router below can only have one element in it
  render() {
    return (
     <Router> 
     <div>
       <Route exact path="/" component ={ViewBlog}/>
       <Route path = "/edit" component = {EditBlog}/>
        {/* <EditBlog handleInputChange={this.handleInputChange} 
        title= {this.state.title} 
        body={this.state.body} 
        postBlog={this.postBlog}/> */}
      </div>
      </Router>
    );
  }
}

export default App;
