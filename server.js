//Server with routes


const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser")
const path = require("path")


//this allows us to serve files out of build folder
app.use(express.static("client/build"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.get("/", (req,res)=>{ res.send("hi")});


app.get("/api/test", (req,res) => {
    console.log(req.body)
    res.json(true);
})

app.post("/api/test", (req,res)=>{
    console.log(req.body);
    res.json(req.body)
})

// Catch all if routes dont work
app.use((req,res)=>{
    res.sendFile(path.join(__dirname, "client/buiold/index.html"))
});

app.listen(PORT, () =>{ console.log(`API server now listening on ${PORT}`)});