import React, { Component} from 'react';
import { Link, withRouter  } from "react-router-dom";
import axios from "axios"
class Nav extends Component{
    state= {
        blogs : [
            {
                _id :1,
                title: "Zebra",
                body:"Cake"
            },
            { _id : 2,
            title: "Little",
            body : "Debby"}
        ],
        title:"",
        body:""
    };

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
        const { getAccessToken } = this.props.auth;
        console.log("access token maybe?", this)
        const headers = { 'authorization': `Bearer ${getAccessToken()}`};
        console.log(headers)
        const {title, body} = this.state;
        axios.post("/api/blog",{title, body},{crossDomain: true,withCredentials:true,headers}).then(res=> console.log("Axios response:",res));
        this.setState({ title: "",body:""});
        this.props.history.push("/");
        this.refreshBlogs()
    }


    refreshBlogs(){
        console.log("componentDidMount")
        axios.get("/api/blog").then( (res)=>{
            console.log("get request to mongo")
            this.setState({blogs: res.data}); // Changes state after successfull promise
            
        })
    }

    componentDidMount(){
        this.refreshBlogs();
    }


    render(){
        const loggedIn = this.props.auth.isAuthenticated();
        const canWrite = this.props.auth.userHasScopes(["read:mern"]);
    
        return(
            <div id="viewWrapper">
                <nav className="rowOne">
                   

                    <Link className="link" to="/">Home&nbsp;</Link>
                    <Link className="link" to="/profile">Profile&nbsp;</Link>
                </nav>
                <div className="rowTwo">
                    <div className="colOne">
                        {(loggedIn && canWrite) ? (this.state.blogs.map( post =>(
                            <div key={post._id}>
                            <h3>Created at {post.createdAt} </h3>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            </div>
                        ))) :("") }
                    </div>
                    <div className="colTwo"> 

                         {(!loggedIn) ? (
                        <button className="formButton"
                    onClick={this.props.auth.login}>Log In</button>
                    ) : (
                        <button className="formButton"
                        onClick={this.props.auth.logout}>Log Off</button>
                    )}

                        <form className="formContainer">
                            <input className="formInput" name="title" onChange={this.handleInputChange}  value={this.title} />
                            <textarea className="formText"  name="body" onChange={this.handleInputChange} value={this.body} />
                            <button className="formButton"  onClick={this.postBlog}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Nav);