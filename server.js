//Server with routes


const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser")
const path = require("path")
const mongoose = require("mongoose");

const Blog = require("./models/blog")

//this allows us to serve files out of build folder
app.use(express.static("client/build"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/my-blog"); // FOR HEROKU DEPLOYMENT

app.get("/", (req,res)=>{ res.send("hi")});


app.get("/api/blog", (req,res) => {

    // Model is how we interact with DB, mongoose queries
    Blog.find({}).then(results => res.json(results));
  
});

app.post("/api/blog", (req,res)=>{
    console.log(req.body);
    Blog.create(req.body).then( dbBlog=>res.json(dbBlog));//send data here)
    
});




// Catch all if routes dont work
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "client/buiold/index.html"))
});

app.listen(PORT, () =>{ console.log(`API server now listening on ${PORT}`)});