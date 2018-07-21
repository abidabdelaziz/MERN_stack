import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Profile extends Component {

    componentWillMount(){
        this.setState({ profile: {} });
        const { userProfile, getProfile } = this.props.auth;
        console.log("this object",this.props.auth)
        if (!userProfile) {
          getProfile((err, profile) => {
            this.setState({ profile });
          });
        } else {
          this.setState({ profile: userProfile });
        }
        
    }
    render(){
        const { profile } = this.state;
        return(
            <div>Profile
                 <Link to="/">Home</Link>
                 <Link to="/edit">Add Post</Link>
            <img src={profile.picture} alt="profile" />
            <h1>{profile.name}</h1> 


            </div>
        )
    }
}