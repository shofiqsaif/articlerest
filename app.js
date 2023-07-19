//jshint esversion:6

const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.set("view engine", "ejs");

app.route("/articles")
.get((req,res)=>{
    console.log("Articles Incoming!");
}).post().delete();

app.listen(process.env.port || port, () => {
    console.log("Server is running on port " + port);
});
