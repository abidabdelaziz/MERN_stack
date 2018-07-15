import React, { Component } from 'react';
import './App.css';
import Auth from "./auth/Auth.js"
import Callback from "./CallBack/Callback.js"


import { Router, Route} from "react-router-dom"
import history from "./history.js"
import ViewBlog from './pages/ViewBlog';
import EditBlog from './pages/EditBlog';

const auth = new Auth();
const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

class App extends Component {

    
  // router below can only have one element in it
  render() {
    const { isAuthenticated } = auth; // destructuring
    return(
      
     <Router history ={history}> 
     <div>
       <div>

        {isAuthenticated() ? 
        (<div> <button onClick={()=>auth.logout()}>Log Out</button>Logged In</div>) : 
        
        (<div><button onClick={()=>auth.login()}>Log In</button>Logged Out</div>)};

      </div>

      <Route exact path="/" render={(props) => <ViewBlog auth={auth} {...props} />} />
      <Route path="/edit" render={(props) => <EditBlog auth={auth} {...props} />} />
       
      <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
      }}/>
      </div>
      </Router>
)}
}

export default App;
