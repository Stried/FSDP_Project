const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, Sequelize } = require('../models/') // imports the model name from models

// Alan - Accont Creation
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

    // TODO: Fix this create() is not defined 
    try {
        let result = await UserAccount.create(data);
        res.json(result);
    } catch (err) {
        console.error(err);
        throw err;
    }
})

// View Individual Account (User)
router.get("/user/:id", async (req, res) => { // Remember to put req then res
    let user = req.params.id;
    let data = req.body;

    let userAccount = await UserAccount.findByPk(user);
    res.json(userAccount)

    if (!userAccount) {
        res.sendStatus(404);
        return;
    }
})

// Edit Individual Account (User)
router.put("/editUser/:id", async (req, res) => {
    let user = req.params.id;
    let data = req.body;
    console.log(data)

    let findAccount = UserAccount.findByPk(user);
    if (!findAccount) {
        res.sendStatus(404);
        return;
    }

    let userAccount = await UserAccount.update(data, {
        where: { id: user }
    });

    if (userAccount == 1) {
        res.json({
            message: "Tutorial has been successfully updated."
        })
    } else {
        res.status(400).json({
            message: `Cannot update tutorial with id ${user}`
        })
    }
})

module.exports = router