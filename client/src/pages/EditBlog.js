import React, {Component} from "react"
import axios from "axios"//promise based HTTP client for browser and node.js...aijax
import { Link, withRouter } from "react-router-dom";
// histor yhas two methods push, and replace
// puhs navigating somewhere new, replace we are switching(url)

//import Auth from '../auth/Auth.js';


class EditBlog extends Component{ 

    state= {
        title:"",
        body:""
      }
      handleInputChange = event =>{
        //const name = event.target.name; 
        //const value = event.target.value;
        // ^equivalent^
        const {name, value} = event.target;
        console.log(name);
        this.setState({[name]:value});
      }
  
      postBlog = event =>{
        event.preventDefault();
        const {title, body} = this.state;
        axios.post("/api/blog",{title, body}).then(res=> console.log(res));
        this.setState({ title: "",body:""});
        this.props.history.push("/");
      }

       
    render(){
            if(!this.props.auth.isAuthenticated()){
                this.props.history.push("/");
                return (
                    <div> nope ... </div>
                );
            } 

        return( 
    <div>
    <form>
        <Link to="/">Home</Link>
    <input name="title" onChange={this.handleInputChange} value={this.title}/>
    <textarea name="body" onChange={this.handleInputChange} balue ={this.body}/>
    <button onClick={this.postBlog}>Submit</button>
   
    </form>
    </div>

)}}

export default withRouter(EditBlog)