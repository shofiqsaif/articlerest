//jshint esversion:6

const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/articleDB");
const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
.get((req,res)=>{
    Article.find({}).then((r)=>{
        res.send(r);
    })
})
.post(urlencodedParser,(req,res)=>{
    console.log(req.body);
    const article = new Article({
        title : req.body.title,
        content : req.body.content
    });
    article.save().then(()=>{
        res.send("Article Saved Successfully!");
    })
})
.delete((req,res)=>{
    Article.deleteMany().then(()=>res.send("Everything Deleted"));
});

app.listen(process.env.port || port, () => {
    console.log("Server is running on port " + port);
});
