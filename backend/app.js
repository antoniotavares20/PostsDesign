const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const Post = require('./models/post');

const uri = "mongodb+srv://antonio:WKQZpraiaQ3YtEqr@cluster0-pryt3.mongodb.net/node-angular?retryWrites=true";
//const uri = "mongodb+srv://antonio:WKQZpraiaQ3YtEqr@cluster0-ntrwp.mongodb.net/node-angular?retryWrites=true";

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err)  => {
    console.log('err', err);
  });

//mongoose
//  .connect(uri)

  //.then(() => {
  //  console.log("Connected to database!");
 // })
 // .catch(() => {
  //  console.log("Connection failed!");
//  });


//  WKQZpraiaQ3YtEqr


  app.use(bodyParser.json);
  app.use(bodyParser.urlencoded({ extended: false }));


  app.use((req, res,
     next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

  app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
  });
     post.save();
    res.status(201).json({
      message: "Post added successfully"
    });
});


app.get("/api/posts", (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });


  /**const posts = [{
                  id:'asdfasd',
                  title: 'adsfs asdaf',
                  content:'asdfasd'
                 },
                {
                  id:'asd12345d',
                  title: 'seconut',
                  content:'asdfasd'
                }]**/

  });
})
app.delete("/api/posts/:id", (req, res, next)=>{
  console.log(req.params.find),
  res.status(200).jsom({message:"posts deleted"})

    })

module.exports = app;

