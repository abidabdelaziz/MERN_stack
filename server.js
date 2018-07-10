//Server with routes


const express = require("express")
const app = express();
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser")

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

app.listen(PORT, () =>{ console.log(`API server now listening on ${PORT}`)});