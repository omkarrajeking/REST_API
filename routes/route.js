const express = require("express");
const route = express();
const {User} = require("../Model/user");

route.get('/info' , async function(req,res) {
    return res.status(200).json(await User.find());
})


route.post('/add' , async function(req,res) {
    let a1 = req.body;
    console.log(req);
    const newuser = await User.create({firstname : a1.firstname , lastname : a1.lastname , city : a1.city , number : a1.number});
    console.log(newuser);
    return res.status(200).json({"output" : "hi everything is fine"});
})


route.delete('/delete' ,async function(req,res) {
    let a1 = req.body;
    console.log("delete a1==>",a1);
    const news = await User.find({firstname : a1.firstname});
    const n1 = await User.findByIdAndDelete(news); 
    console.log(n1);
    return res.status(200).json({"output" : "hi everything is fine"});
})

route.patch('/patch' ,async function(req,res) {
    let a1 = req.query;
    const n1 = await User.find({firstname : a1.firstname});
    const news = await User.findByIdAndUpdate(n1,{lastname : a1.lastname});
    console.log(news);
    return res.status(200).json({"output" : "hi everything is fine"});
})

route.put('/put' ,async function(req,res) {
    let a1 = req.query;
    const n1 = await User.find({firstname : a1.firstname});
    const news = await User.findByIdAndUpdate(n1,{lastname : a1.lastname});
    console.log(news);
    return res.status(200).json({"output" : "hi everything is fine"});
})


module.exports = { route  };