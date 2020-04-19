const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.user(bodyParser.json);
app.user(bodyParser.urlencoded({extends : false}));


app.use((req, resp, next)=>{
    resp.setHeader("Access-Control-Allow-Origin","*");
    resp.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.setHeader("Access-Control-Allow-Methods",
                   "GET, POST, PATCH, DELETE, OPTIONS"
                   );
  next();
});

app.post((req, resp, next)=>{
  const post = req.body;
  console.log(post);
  resp.status(201).json({
    message: 'Post add sucess finther'
  });
});

app.use("/api/posts",(req, resp, next)=>{
  const posts = [{
                  id:'asdfasd',
                  title: 'adsfs asdaf',
                  content:'asdfasd'
                 },
                {
                  id:'asd12345d',
                  title: 'seconut',
                  content:'asdfasd'
                }]
  return resp.status(200).json({message : 'testeadsfda',posts: posts});
  next();


})


module.exports = app;

