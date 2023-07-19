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

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
.get((req,res)=>{
    console.log("Articles Incoming!");
}).post().delete();

app.listen(process.env.port || port, () => {
    console.log("Server is running on port " + port);
});
