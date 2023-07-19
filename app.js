//jshint esversion:6

const ejs = require("ejs");
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/articleDB");
const articleSchema = new mongoose.Schema({
    title: String,
    content: String,
});

const Article = mongoose.model("article", articleSchema);

app.route("/articles")
    .get((req, res) => {
        Article.find({}).then((r) => {
            res.send(r);
        });
    })
    .post(urlencodedParser, (req, res) => {
        console.log(req.body);
        const article = new Article({
            title: req.body.title,
            content: req.body.content,
        });
        article.save().then(() => {
            res.send("Article Saved Successfully!");
        });
    })
    .delete((req, res) => {
        Article.deleteMany().then(() => res.send("Everything Deleted"));
    });

app.route("/articles/:article")
    .get((req, res) => {
        const article = req.params.article;
        console.log(article);

        Article.findOne({ title: new RegExp("^" + article + "$", "i") })
            .then((r) => {
                res.send(r);
            })
            .catch((e) => {
                res.send(e);
            });
    })
    .put(urlencodedParser, (req, res) => {
        const article = req.params.article;
        Article.findOneAndReplace(
            { title: new RegExp("^" + article + "$", "i") },
            {
                title: req.body.title,
                content: req.body.content,
            }
        )
            .then((r) => {
                res.send("Replaced Successfully!");
            })
            .catch((e) => {
                res.send(e);
            });
    })
    .patch(urlencodedParser, (req, res) => {
        const article = req.params.article;
        console.log(req.body);
        Article.findOneAndUpdate(
            {title: new RegExp("^" + article + "$", "i") },
            {$set: req.body}
        ).then((r)=>{
            res.send("Patched Successfully!");
        }).catch((e)=>res.send(e));
    })
    .delete((req,res)=>{
        Article.deleteOne({title: new RegExp("^" + req.params.article + "$", "i") })
        .then((r)=>{res.send("Article Deleted Successfully")})
        .catch((e)=>res.send(e));
    })

app.listen(process.env.port || port, () => {
    console.log("Server is running on port " + port);
});
