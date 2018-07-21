
import auth0 from 'auth0-js';
import history from '../history';//package for dealing with different browser history

const origin = window.location.origin;
export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'buddha.auth0.com',
    clientID: 'MdYqYOyz8rHwASNJu6BFbIpFU1JCLBVn',
    redirectUri: origin + '/callback',
    audience: 'my-mern',
    // audience: "https://buddha.auth0.com/userinfo",
    responseType: 'token id_token',
    scope: 'openid profile read:mern write:mern'
  });

  userProfile;

// If I pass these functions, whenever we run login, it will refer to these binded function
constructor() {
  this.login = this.login.bind(this);
  this.logout = this.logout.bind(this);
  this.handleAuthentication = this.handleAuthentication.bind(this);
  this.isAuthenticated = this.isAuthenticated.bind(this);
  this.getProfile = this.getProfile.bind(this);
  this.getAccessToken = this.getAccessToken.bind(this);
}

getAccessToken() {
  let accessToken = localStorage.getItem('access_token');
  console.log("accesstoken:",accessToken)
  if (!accessToken) {
    throw new Error('No Access Token found');
  }
  return accessToken;
}

//...
getProfile(cb) {
let accessToken = this.getAccessToken();
console.log("Accesstoken call",accessToken)
this.auth0.client.userInfo(accessToken, (err, profile) => {
  if (profile) {
    this.userProfile = profile;
  }
  cb(err, profile);
});
}
//parse the hash and gives us access and id tokens
//after hittingt those statements then go back to these routes
  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

//Handle these credentials in local storage
  setSession(authResult) {
// Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
// navigate to the home route
    history.replace('/');
  }

  login() {
    this.auth0.authorize();
  }

  logout() {
// Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
// navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
// Check whether the current time is past the 
// Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}


  
