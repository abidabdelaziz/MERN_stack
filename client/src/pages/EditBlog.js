// import React, {Component} from "react"
// import axios from "axios"//promise based HTTP client for browser and node.js...aijax
// import { Link, withRouter } from "react-router-dom";
// // history has two methods push, and replace
// // push navigating somewhere new, replace we are switching(url)

// class EditBlog extends Component{ 

//     state= {
//         title:"",
//         body:""
//       }
//     handleInputChange = event =>{
//         //const name = event.target.name; 
//         //const value = event.target.value;
//         // ^equivalent^
//         const {name, value} = event.target;
//         console.log(name);
//         this.setState({[name]:value});
//     }

//     postBlog = event =>{
//         event.preventDefault();
//         const { getAccessToken } = this.props.auth;
//         console.log("access token maybe?", this)
//         const headers = { 'authorization': `Bearer ${getAccessToken()}`};
//         console.log(headers)
//         const {title, body} = this.state;
//         axios.post("/api/blog",{title, body},{crossDomain: true,withCredentials:true,headers}).then(res=> console.log("Axios response:",res));
//         this.setState({ title: "",body:""});
//         this.props.history.push("/");
//     }

       
//     render(){
            
//         return (
//             <div>
//               <Link to="/">Home</Link>





              
//               <form>
//                 <input name="title" onChange={this.handleInputChange}  value={this.title} />
//                 <textarea name="body" onChange={this.handleInputChange} value={this.body} />
//                 <button onClick={this.postBlog}>Submit</button>
//               </form>
//             </div>
//         );
    
    
//     }
// }
// export default withRouter(EditBlog)