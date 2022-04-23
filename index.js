const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors')
const PostRoutes = require("./routes/PostRoutes.js");
const PORT=process.env.PORT||8001;

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//declaring routers
app.use("/posts", PostRoutes);


if(process.env.NODE_ENV=="production"){
  app.use(express.static("client/build"));
  const path=require("path");
}
//connect to mongodb
const connectionUrl = "mongodb+srv://cedesion:cedesion123@mernstack.0dqdx.mongodb.net/reactBlogApp?retryWrites=true&w=majority";
mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on port "+PORT);
    });
  })
  .catch((e) => {
    console.log("error", e.message);
  });

// const express=require("express");
// const app=express();

// app.use("/",(req,res)=>{
//     res.send("hello workinf");
// })

// app.listen(8001,()=>{
//     console.log("server run");
// })