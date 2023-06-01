const express = require("express");
const router = express.Router();
const yup = require("yup");
const { sequelize } = require("../models/");
const { DataTypes } = require("sequelize");
const { UserAccount, Sequelize } = require("../models/"); // imports the model name from models, must match waht is defined in the model
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/auth");
require('dotenv').config();

// Alan - Accont Creation
router.post("/createAccount", async (req, res) => {
  let data = req.body;
  let validationSchema = yup.object().shape({
    fullName: yup.string().trim().min(3).max(100).required(),
    userName: yup.string().trim().min(3).max(50).required(),
    phoneNo: yup.number().min(80000000).max(99999999).required(),
    emailAccount: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
  });
  try {
    await validationSchema.validate(data, { abortEarly: false });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errors: err.errors });
    return;
  }

  data.fullName = data.fullName.trim();
  data.userName = data.userName.trim();
  data.phoneNo = data.phoneNo;
  data.emailAccount = data.emailAccount.trim();
  data.password = await bcrypt.hash(data.password, 10);

  let user = await UserAccount.findOne({
    where: { emailAccount: data.emailAccount },
    where: { phoneNo: data.phoneNo },
  });
  if (user) {
    res.status(400).json({ message: "Email or Phone Number already exists." });
    return;
  }

  try {
    let result = await UserAccount.create(data);
    res.json(result);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

// Login function
router.post("/login", async (req, res) => {
  let data = req.body;

  data.emailAccount = data.emailAccount.trim().toLowerCase();
  data.password = data.password.trim();

  let errorMsg = "Email or password is incorrect.";
  let user = await UserAccount.findOne({
    where: { emailAccount: data.emailAccount },
  });
  if (!user) {
    res.status(400).json({ message: errorMsg});
    return;
  }

  let match = await bcrypt.compare(data.password, user.password);
  if (!match) {
    res.status(400).json({ message: errorMsg });
    return;
  }

  let userInfo = {
    id: user.id,
    fullName: user.fullName,
    userName: user.userName,
    emailAccount: user.emailAccount,
    phoneNo: user.phoneNo,
    };
    let accessToken = sign(userInfo, process.env.APP_SECRET);

    res.json({
        accessToken: accessToken,
        user: userInfo
  });
});

router.get("/auth", validateToken, (req, res) => {
  let userInfo = {
    id: req.user.id,
    fullName: req.user.fullName,
    userName: req.user.userName,
    emailAccount: req.user.emailAccount,
    phoneNo: req.user.phoneNo
  };
  res.json({
    user: userInfo
  });
});

// View Individual Account (User)
router.get("/user/:id", async (req, res) => {
  // Remember to put req then res
  let user = req.params.id;
  let data = req.body;

  let userAccount = await UserAccount.findByPk(user);
  res.json(userAccount);

  if (!userAccount) {
    res.sendStatus(404);
    return;
  }
});

// Edit Individual Account (User)
router.put("/editUser/:id", async (req, res) => {
  let user = req.params.id;
  let data = req.body;
  console.log(data);

  let validationSchema = yup.object().shape({
    fullName: yup.string().trim().min(3).max(100).required(),
    userName: yup.string().trim().min(3).max(50).required(),
    phoneNo: yup.number().min(80000000).max(99999999).required(),
    emailAccount: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
  });

  try {
    await validationSchema.validate(data, { abortEarly: false });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errors: err.errors });
    return;
  }

  let findAccount = UserAccount.findByPk(user);
  if (!findAccount) {
    res.sendStatus(404);
    return;
  }

  data.fullName = data.fullName.trim();
  data.userName = data.userName.trim();
  data.phoneNo = data.phoneNo;
  data.emailAccount = data.emailAccount.trim();
  data.password = data.password.trim();

  let userAccount = await UserAccount.update(data, {
    where: { id: user },
  });

  if (userAccount == 1) {
    res.json({
      message: "User has been successfully updated.",
    });
  } else {
    res.status(400).json({
      message: `Cannot update User with id ${user}`,
    });
  }
});

// Deleting Individual Account (Admin only or accessible bby user?)
router.delete("/deleteUser/:id", async (req, res) => {
  let user = req.params.id;

  let findUser = UserAccount.findByPk(user);
  if (!findUser) {
    console.log("User not found."); // Should not be happening if accessible by user.
    res.sendStatus(404);
  } else {
    let deleteUser = await UserAccount.destroy({
      where: { id: user },
    });

    if (deleteUser == 1) {
      res.json({
        message: "User was successfully deleted.",
      });
    } else {
      res.status(400).json({
        message: `Cannot delete user with id ${user}`,
      });
    }
  }
});

module.exports = router;
