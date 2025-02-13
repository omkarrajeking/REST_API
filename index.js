const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());
const {route} = require("./routes/route");
const serverless = require('serverless-http')

const PORT = 8000;

app.use("/user",route);
app.get("/" , function(req,res){
    return res.status(200).json({"output" : "hi everything is fine"});
})

app.listen(PORT , console.log(`Servere is runnning on ${PORT}`));

module.exports.handler = serverless(app);
