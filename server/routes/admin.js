const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, AdminAccount, Sequelize } = require("../models/"); // imports the model name from models, must match waht is defined in the model
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/auth");
require('dotenv').config();

// Views all Accounts Created
router.get("/adminPanel", validateToken, async (req, res) => {
    let user = req.user;
    let condition = {};

    if (!user.adminNo) {
        window.location.pathname === "/"
    }

    const allUsers = await UserAccount.findAll({
        where: condition,
        order: [['emailAccount', 'DESC']],
    })

    res.json(allUsers);
}) 

module.exports = router;