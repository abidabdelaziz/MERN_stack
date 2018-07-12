import React, {Component} from "react"
import axios from "axios"
class ViewBlog extends Component{

    state= {
        blogs : [
            {
                id :1,
                title: "Zebra",
                body:"Cake"
            },
            { id : 2,
            title: "Little",
            body : "Debby"}
        ]
    };


    refreshBlogs(){
        console.log("working?")
        axios.get("/api/blog").then( (res)=> console.log(res));
    
        //this.setState({blogs: res.data}); // Changes state after successfull promise
        
    }

    componentDidMount(){
        this.refreshBlogs();
    }
  render(){

    return (

        <div>
            {this.state.blogs.map( post =>(
                    <div key={post.id}>
                    <h1>{post.title}</h1>
                    <p>{post.body}</p>
                    </div>
            ))}
        </div>
    )
  }
}

export default ViewBlog;