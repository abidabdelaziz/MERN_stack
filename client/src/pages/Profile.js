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
            console.log(profile)
          });
        } else {
          this.setState({ profile: userProfile });
        }
        
    }
    render(){
        const { profile } = this.state;
        return(
            <div>
            <nav className="rowOne">
                 <Link to="/">Home</Link>
                 
            </nav>

            <div className="rowTwo">
                <div className="colPic">
                    <img src={profile.picture} alt="profile"/>
                </div>
                <div className="colProf">
                <h1>{profile.name}</h1>
                <h2> The idea of this application is to allow a Mom and Pop shop to recieve orders from customers online. The ultimate goal in incorporating this application is to ease the customer experience while at the same time increase the exposure the customer has to the brand.</h2>
                 
                </div>


            </div>
            </div>
        )
    }
}