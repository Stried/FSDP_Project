const express = require("express");
const router = express.Router();
const yup = require("yup");
const { ecolifeData } = require('../models');

router.post("/createAccount", async (req, res) => {
    let data = req.body;
    let validationSchema = yup.object().shape({
        fullName: yup.string().trim().min(3).max(100).required(),
        userName: yup.string().trim().min(3).max(50).required(),
        phoneNo: yup.number().min(80000000).max(99999999).required(),
        emailAccount: yup.string().email().required(),
        password: yup.string().min(8).max(16).required()
    });
    try {
        await validationSchema.validate(data, { abortEarly: false });
    }
    catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }
    
    data.fullName = data.fullName.trim();
    data.userName = data.userName.trim();
    data.phoneNo = data.phoneNo;
    data.emailAccount = data.emailAccount.trim()
    data.password = data.password.trim();

    let result = await ecolifeData.create(data);
    res.json(result);
})

module.exports = router