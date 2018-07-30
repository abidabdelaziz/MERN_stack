//Server with routes
const express = require("express")
const app = express();
const bodyParser = require("body-parser")
const path = require("path")

const cors = require('cors')
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'https://localhost:3000'
};
app.use(cors(corsOptions));

const mongoose = require("mongoose");
const Blog = require("./models/blog")

const jwt = require("express-jwt");
const jwtAuthz= require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");

const dotenv= require("dotenv")
dotenv.config()

if(!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE){
    throw 'Make sure you have an AUTH0_DOMAIN and AUTH0_AUDIENCE confiigured:)';
}
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
});

const checkWriteBlog = jwtAuthz([ 'read:mern'])
//this allows us to serve files out of build folder
app.use(express.static("client/build"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/my-blog"); // FOR HEROKU DEPLOYMENT

app.get("/", (req,res)=>{ res.send("hi")});


app.get("/api/blog", (req,res) => {

    console.log("trying to fetch posts")
    // Model is how we interact with DB, mongoose queries
    Blog.find({}).sort({createdAt: -1}).then(results => res.json(results));
  
});
// checkWriteBlog
app.post("/api/blog", checkJwt, checkWriteBlog,(req,res)=>{ //checkJwt is for log in checkScopes is for privelage

    Blog.create(req.body).then( dbBlog=>res.json(dbBlog));//send data here for db
    
});

// Catch all if routes dont work
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "client/build/index.html"))
});

app.listen(PORT, () =>{ console.log(`API server now listening on ${PORT}`)});