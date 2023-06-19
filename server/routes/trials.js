const express = require("express");
const router = express.Router();
const yup = require("yup");
const { UserAccount, Store, TrialCar, TrialReceipt, Sequelize } = require("../models/");

router.post("/createTrialCar", async(req, res)=>{
let data =req.body;
let validationSchema=yup.object().shape({
    modelName: yup.string().trim().max(8).required(),
});
try {
    await validationSchema.validate(data,
        { abortEarly: false, strict: true });
}
catch (err) {
    console.error(err);
    res.status(400).json({ errors: err.errors });
    return;
}
data.modelName=data.modelName.trim();

let result= await TrialCar.create(data);
res.json(data);

});



module.exports=router