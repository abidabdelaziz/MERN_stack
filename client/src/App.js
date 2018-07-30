import React, { Component } from 'react';
import './App.css';
import Auth from "./auth/Auth.js"
import Callback from "./CallBack/Callback.js"


import { Router, Route, Redirect} from 'react-router-dom'
import history from "./history.js"
import Profile from './pages/Profile';
import Nav from './Nav';
const auth = new Auth();


class App extends Component {


  // router below can only have one element in it
  // we add auth to each opf the props for a componenet below as well
  render() {
   // const { isAuthenticated } = this.auth; // destructuring
    return(
      
     <Router history ={history}> 
     <div className="appWrapper">

     

        <Route exact path="/" render={(props) => <Nav auth={auth} {...props} />}/>

        {/* <Route exact path="/edit" render={(props) => {
          console.log(auth.isAuthenticated())
          let userScopes= auth.userHasScopes();
          console.log( userScopes)
          return (auth.isAuthenticated() && userScopes.includes("write:mern"))? 
            (<EditBlog auth={auth} {...props}/>) 
            : (<Redirect to="/"/>);
        } }/> */}

        <Route exact path="/profile" render={(props) =>{
          return (auth.isAuthenticated()) ? (
            <Profile auth={auth} {...props}/>
        ) : (<Redirect to="/"/>)}}/>    

        <Route path="/callback" render={(props) => {
            auth.handleAuthentication(props);
            return <Callback {...props} />
        }}/>
      </div>  
      </Router>
)}
}

export default App;
