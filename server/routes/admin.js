const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, Sequelize } = require("../models/"); // imports the model name from models, must match waht is defined in the model
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/auth");
const AdminAccount = require("../models/AdminAccount");
require("dotenv").config();

router.post("/createAdmin/:uniqueID", async (req, res) => {
    let data = req.data;
    let uid = req.data.uniqueID
    let validationSchema = yup.object().shape({
        adminNo: yup.string().trim().min(5).max(5).required(),
    });
    try {
        await validateSchema.validate(data, { abortEarly: false });
    } catch (err) {
        console.error(err);
        res.status(400).json({ errors: err.errors });
        return;
    }

    let errorMsg = "Account does not exist."
    let user = await AdminAccount.findOne({
        where: {uniqueID: uniqueID}
    })
    if (!user) {
        res.status(400).json({message: errorMsg})
    }
})