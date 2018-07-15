import React, {Component} from "react"
import axios from "axios"
import { Link } from "react-router-dom";

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
        ]
    };


    refreshBlogs(){
        console.log("working?")
        axios.get("/api/blog").then( (res)=>{
            console.log(res);
    
            this.setState({blogs: res.data}); // Changes state after successfull promise
            
        })
    }

    componentDidMount(){
        this.refreshBlogs();
    }
  render(){

    return (

        <div>
            <Link to="/edit">New Blog Post</Link>
            {this.state.blogs.map( post =>(
                    <div key={post._id}>
                    <h3>Created at {post.createdAt} </h3>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    </div>
            ))}
        </div>
    )
  }
}

export default ViewBlog;