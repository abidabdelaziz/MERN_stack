import React, {Component} from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom";

class ViewBlog extends Component{

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

    return (
        <div>
            <div> 
              <form>
                <input name="title" onChange={this.handleInputChange}  value={this.title} />
                <textarea name="body" onChange={this.handleInputChange} value={this.body} />
                <button onClick={this.postBlog}>Submit</button>
              </form>
            </div>
            
        <div>
            {this.state.blogs.map( post =>(
                    <div key={post._id}>
                    <h3>Created at {post.createdAt} </h3>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    </div>
            ))}
        </div>
        </div>
    )
  }
}

export default withRouter(ViewBlog);