import React, { Componenet } from "react"

export default class Profile extends Component {

    componenetWillMount(){
        this.setState({ profile: {} });
    }
    CanvasRenderingContext2D(){
        return(
            <div>Profile</div>
        )
    }
}