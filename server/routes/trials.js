const express = require("express");
const router = express.Router();
const yup = require("yup");
const { UserAccount, Store, TrialCar, TrialReceipt, Sequelize } = require("../models/");

router.post("/createTrialCar", async(req, res)=>{
let data =req.body;
let validationSchema=yup.object().shape({
    
})


})
module.exports=router